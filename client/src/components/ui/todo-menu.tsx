import { UserStateType } from "@/app/types";
import { useTodoStore } from "@/app/stores";

export default function TodoMenu(){
    const todosStore = useTodoStore();

    return (
        <div className="flex flex-col h-full min-w-[448px] p-6">
            <p className="font-semibold">My Todos</p>
            { !todosStore.selectedList && <p className="text-center text-gray-400">No List Selected</p> }
            { todosStore.selectedList && <p>{ todosStore.selectedList.name }</p>}
        </div>
    );
}