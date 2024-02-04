import { useAuthStore, useGeneralStore, useListStore } from "@/app/stores";
import axios from "axios";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Button } from "./button";
import { Input } from "./input";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Textarea } from "./textarea";
import { Label } from "./label";
import { ScrollBar, ScrollArea } from "./scroll-area";
import ListItem from "./list-item";
import { Container, Draggable } from "react-smooth-dnd";
import { arrayMoveImmutable } from "array-move"

export default function ListMenu(){
    const [ newList, setNewList ] = useState({name: "", description: "", loading: false, new: false});
    const { setErrorDialog } = useGeneralStore();
    const listStore = useListStore();
    const { user, token } = useAuthStore();

    const handleNewList = () => {
        setNewList({name: "", description: "", loading: false, new: true});
    };

    const handleOnDropList = ({ removedIndex, addedIndex }: { removedIndex: any, addedIndex: any}) => {
        const newListOrder = arrayMoveImmutable(listStore.lists, removedIndex, addedIndex).map((list, index) => { list.order = index + 1; return list; });
        listStore.reorder(newListOrder, token);
    }

    const handleNewListSubmit = () => {
        setNewList({...newList, loading: true});
        if(newList.name == "") {
            setErrorDialog("List name cannot be empty");
            setNewList({name: "", description: "", loading: false, new: false});
            return;
        }
        if(/^[\s\W]+/g.test(newList.name)) {
            setErrorDialog("List name cannot start with a space or special character");
            setNewList({name: "", description: "", loading: false, new: false});
            return;
        }
        axios.post(`/api/list/?user=${user?._id}`, {name: newList.name, description: newList.description, order: (listStore.currentOrder + 1), user: user?._id}, { headers: { authorization: `local ${token}` } }).then((res) => {
            listStore.addList(res.data);
            setNewList({name: "", description: "", loading: false, new: false});
        }).catch((err: Error) => {
            listStore.setError(err.stack?.toString() || "An error occurred");
            setNewList({name: "", description: "", loading: false, new: false});
        });
    };

    useEffect(() => {
        listStore.setLoading();
        axios.get(`/api/list/?user=${user?._id}`, { headers: { authorization: `local ${token}` } }).then((res) => {
            listStore.setLists(res.data.todoList);
        }).catch((err: Error) => {
            listStore.setError(err.message);
        });
    }, [])

    return (
        <div className="flex flex-col h-full min-w-[350px] p-6">
            <div className="flex flex-row justify-between">
                <p className="font-semibold">My List</p>
                {
                    newList.loading && 
                    <div className="flex flex-row">
                        <TailSpin visible={true} height="20" width="20" color="#000000" ariaLabel="tail-spin-loading" radius="0.2" wrapperStyle={{}} wrapperClass="ml-4 mr-2"/>
                        <p className="text-center">Creating List...</p>
                    </div>
                }
                <Dialog>
                    {
                        listStore.status != "loading" && !newList.loading &&
                        <DialogTrigger asChild>
                            <Button onClick={handleNewList}  variant="ghost">
                                Add New List
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-1">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" />
                                </svg>
                            </Button>
                        </DialogTrigger>
                    }
                    <DialogContent className="p-4 sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>New List</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Input disabled={newList.loading} onChange={(e) => { setNewList({...newList, name: e.target.value}) }} placeholder="Enter List Name" className="col-span-4" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Textarea disabled={newList.loading} id="description" onChange={(e) => { setNewList({...newList, description: e.target.value}) }} placeholder="No Description" className="resize-none min-h-[100px] col-span-4" />
                            </div>
                        </div>
                        <DialogClose className="flex flex-row justify-end">
                            <Button onClick={handleNewListSubmit} type="submit">Add List</Button>
                        </DialogClose>
                    </DialogContent>
                </Dialog>
                {
                    // <button onClick={handleNewList} className="flex flex-row justify-center items-center">
                    //     <p className="text-center ml-4">Add New List</p>
                    //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-1">
                    //         <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" />
                    //     </svg>
                    // </button>
                }
            </div>
            {listStore.status == "loading" && 
                <>
                    <TailSpin visible={true} height="20" width="20" color="#000000" ariaLabel="tail-spin-loading" radius="0.2" wrapperStyle={{}} wrapperClass="mx-auto"/>
                    <p className="text-center">Loading Lists...</p>
                </>
            }
            {
                listStore.status == "error" && 
                <p className="text-center text-red-500">{listStore.message}</p>
            }
            {
                listStore.status == "success" && listStore.lists.length > 0 && 
                    <>
                        {/* <div className=" max-h-[420px] overflow-y-scroll overflow-hidden"> */}
                        <ScrollArea className="max-h-[550px] mt-4 overflow-y-auto">
                            <ScrollBar orientation="vertical" />
                            {/* @ts-ignore */}
                            <Container  lockAxis="y" onDrop={handleOnDropList}>
                                {listStore.lists.map((list) => { return (
                                    /* @ts-ignore */
                                    <Draggable key={list._id}>
                                        <ListItem list={list}/>
                                    </Draggable>
                                )})}
                            </Container>
                        </ScrollArea>
                        {/* </div> */}
                    </> 
            }
            {
                listStore.status == "success" && listStore.lists.length == 0 && !newList.new && 
                <p className="text-center text-gray-400 mt-5">No lists found</p>
            }
        </div>
    );
}