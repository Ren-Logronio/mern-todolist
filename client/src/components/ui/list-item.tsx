import { ListType } from "@/app/types";
import { useListStore, useTodoStore } from "@/app/stores";
import { Button } from "./button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ListItem({ list }: { list: ListType}) {
    const listStore = useListStore();
    const { selectedList, select, unselect } = useTodoStore();

    const handleItemPress = () => {
        if( selectedList?._id == list._id ) {
            unselect();
        } else {
            select(list);
        }
    }

    const handleDelete = () => {
        if( selectedList?._id == list._id ) {
            unselect();
        }
        // listStore.deleteList(list._id);
    }

    return (
        <div onClick={handleItemPress} className={`drag-handle relative flex flex-col my-1 mr-3 items-start bg-white justify-between border ${ list._id == selectedList?._id ? "border-orange-500 p-2 hover:border-orange-600" : "border-gray-300 p-2 hover:border-orange-400"} cursor-pointer z-[0]`}>
            <Button onClick={() => {console.log("button")}}  variant="outline" className="absolute top-2 right-2 z-[1000] select-text">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className=" m-0 size-3">
                    <path d="M10 3.75a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM17.25 4.5a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM5 3.75a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75ZM4.25 17a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM17.25 17a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM9 10a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1 0-1.5h5.5A.75.75 0 0 1 9 10ZM17.25 10.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM14 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM10 16.25a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
                </svg>
            </Button>
            {/* <p className="mr-2">{list.order}</p> */}
            <p className="text-start align-start font-semibold pb-4">{list.name}</p>
            <p className="text-start text-sm">{list.description}</p>
        </div>
    )
}