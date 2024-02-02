import React, { ReactNode } from "react"
import { IList } from "./ListItem"

interface ITodosMenu {
    selected: IList | null,
}

const TodosMenu: React.FC<ITodosMenu> = ({ selected }) => {

    return (
        <div className=" h-full min-w-[812px] max-w-[820-px] py-4 px-6 border-l border-solid border-slate-200 bg-white">
            <p className=" font-semibold text-start">My Todos</p>
            {
                selected && Object.keys(selected).length > 0 &&
                <div key={selected!.id} className="mt-8">
                    <p className=" font-semibold text-start">{selected!.title}</p>
                </div>
            }
            {
                !selected &&
                <div className="mt-8">
                    <p className=" text-slate-500">No List Selected..</p>
                </div>
            }
            
        </div>
    )
}

export default TodosMenu;