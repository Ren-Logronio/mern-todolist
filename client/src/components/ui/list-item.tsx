import { ListType } from "@/app/types";
import { useAuthStore, useGeneralStore, useListStore, useTodoStore } from "@/app/stores";
import { Button } from "./button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Textarea } from "./textarea";

export default function ListItem({ list }: { list: ListType}) {
    const listStore = useListStore();
    const { token } = useAuthStore();
    const { setErrorDialog } = useGeneralStore();
    const { selectedList, select, unselect } = useTodoStore();
    const [ deleteAction, setDeleteAction ] = useState(false);
    const [ isdeleting, setIsDeleting ] = useState(false);
    const [ editAction, setEditAction ] = useState(false);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ editForm, setEditForm ] = useState({name: list.name, description: list.description});

    const toggleDeleteAction = () => {
        setDeleteAction(!deleteAction);
    }

    const toggleEditAction = () => {
        setEditAction(!editAction);
    }

    const handleItemPress = () => {
        if( selectedList?._id == list._id ) {
            unselect();
        } else {
            select(list);
        }
    }
 
    const handleEdit = () => {
        setIsEditing(true);
        if(editForm.name == list.name && editForm.description == list.description) {
            setIsEditing(false);
            toggleEditAction();
            return;
        }
        if(editForm.name == "") {
            setIsEditing(false);
            toggleEditAction();
            setErrorDialog("List name cannot be empty.");
            return;
        }
        if(/^[\s\W]+/g.test(editForm.name)) {
            setIsEditing(false);
            toggleEditAction();
            setErrorDialog("List name cannot start with a space or special character.");
            return;
        }
        listStore.editList(list._id, {...list, ...editForm}, token, () => {
            select({...list, ...editForm});
            setIsEditing(false);
            toggleEditAction();
        });
    }

    const handleDelete = () => {
        setIsDeleting(true);
        if( selectedList?._id == list._id ) {
            unselect();
        }
        listStore.deleteList(list._id, token, () => {
            setIsDeleting(false);
            toggleDeleteAction();
        });
        // listStore.deleteList(list._id);
    }

    useEffect(() => {
        console.log(list?.description);
    },)

    return (
        <>
            <div onClick={handleItemPress} className={`relative shadow-md drag-handle relative flex flex-col my-1 mr-3 items-start bg-white justify-between border ${ list._id == selectedList?._id ? "border-orange-500 p-2 hover:border-orange-300" : "border-gray-300 p-2 hover:border-orange-400"} cursor-pointer z-[0]`}>
                <div className="flex w-full flex-row justify-between">
                    <p className="text-start text-nowrap max-w-[450px] text-ellipsis align-start font-semibold pr-12 overflow-hidden pb-4">{list.name}</p>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="border border-gray-200 rounded-md outline-none px-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className=" m-0 size-3">
                                <path d="M10 3.75a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM17.25 4.5a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM5 3.75a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75ZM4.25 17a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM17.25 17a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM9 10a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1 0-1.5h5.5A.75.75 0 0 1 9 10ZM17.25 10.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM14 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM10 16.25a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
                            </svg>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent onClick={(e) => { e.preventDefault() }} className="z-[1]">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => { setEditAction(true) }}className=" cursor-pointer">
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setDeleteAction(true) }} className=" cursor-pointer">
                                Remove
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <p className="text-start text-sm whitespace-pre-line">{list.description}</p>
            </div>
            <Dialog open={deleteAction} onOpenChange={ !isdeleting ? toggleDeleteAction : () => {}}>
                <DialogContent className="sm:max-w-[425px] z-[100]">
                    <DialogHeader>
                        <DialogTitle className="flex flex-row">Remove "<p className="text-ellipsis text-nowrap overflow-hidden max-w-[256px]">{list.name}</p>"</DialogTitle>
                        <DialogDescription>
                            By removing this list, you will also lose your todo's.<br/><br/>
                            <p className=" text-red-600">This action cannot be undone.</p>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className=" flex flex-row justify-end">
                        <Button disabled={isdeleting} onClick={toggleDeleteAction} variant="ghost">Cancel</Button>
                        <Button disabled={isdeleting} onClick={ !isdeleting ? handleDelete : () => {}} type="submit" className="ml-2">
                            {isdeleting ? <><TailSpin visible={true} height="20" width="20" color="#ffffff" ariaLabel="tail-spin-loading" radius="0.5" wrapperStyle={{}} wrapperClass="mr-2"/><p className="text-sm">Removing...</p></> : "Remove"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={editAction} onOpenChange={ !isEditing ? toggleEditAction : () => {}}>
                <DialogContent className="sm:max-w-[425px] z-[100]">
                    <DialogHeader>
                        <DialogTitle className="flex flex-row">Edit</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Input disabled={isEditing} value={editForm.name} onChange={(e) => { setEditForm({...editForm, name: e.target.value}) }} placeholder="Enter List Name" className="col-span-4" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Textarea disabled={isEditing} value={editForm.description} id="description" onChange={(e) => { setEditForm({...editForm, description: e.target.value}) }} placeholder="No Description" className="resize-none min-h-[100px] col-span-4" />
                        </div>
                    </div>
                    <DialogFooter className=" flex flex-row justify-end">
                        <Button disabled={isEditing} onClick={toggleEditAction} variant="ghost">Cancel</Button>
                        <Button disabled={isEditing} onClick={ !isEditing ? handleEdit : () => {}} type="submit" className="ml-2">
                            {isEditing ? <><TailSpin visible={true} height="20" width="20" color="#ffffff" ariaLabel="tail-spin-loading" radius="0.5" wrapperStyle={{}} wrapperClass="mr-2"/><p className="text-sm">Editing...</p></> : "Edit"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}