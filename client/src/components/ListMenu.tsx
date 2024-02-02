import React, { ReactNode } from "react"
import ListItem, { IList } from "./ListItem"

interface IListMenuProps {
    lists: IList[],
    selected: IList | null,
    selectListCallback: (list: IList | null) => void,
}

const ListMenu: React.FC<IListMenuProps> = ({ lists, selected, selectListCallback }) => {
    return (
        <div className="h-full min-w-[400px] max-w-[512px] py-4 px-6 bg-white">
            <p className=" font-semibold text-start">My List</p>
            <ul className="mt-8">
                { lists.length > 0 && lists.map((item) => (
                    <ListItem list={item} {...{selected, selectListCallback}} ></ListItem>
                    // <li key={item.id} onClick={() => { selected && item.id == selected.id ? selectListCallback(null) : selectListCallback(item)}} 
                    //     className={`flex flex-col py-4 px-6 mb-2 rounded-md border-solid ${ selected && item.id == selected.id ? `border-2 border-indigo-200 hover:border-teal-200` : `border border-slate-200 hover:border-indigo-200`}`}>
                    //     <div className="flex flex-row justify-between">
                    //         <p className=" text-lg font-medium text-start">{item.title}</p>
                    //         <button className="border p-1 border-slate-200 hover:border-slate-500 rounded-md">
                    //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    //                 <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    //             </svg>
                    //         </button>
                    //     </div>
                    //     { item.description.length > 0 && <p className="text-start">{item.description}</p>}
                    // </li>
                ))}
                { lists.length <= 0 && 
                    <li>
                        <p className=" text-slate-500">You have no list..</p>
                    </li>
                }
            </ul>
            <div className="mt-8">
                <button className="flex flex-row justify-center mx-auto">
                    <p>Add New List</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default ListMenu;