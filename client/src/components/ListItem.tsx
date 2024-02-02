
export interface IList {
    id: string,
    title: string,
    description: string,
}

interface IListItemProps {
    list: IList,
    selected: IList | null,
    selectListCallback: (list: IList | null) => void,
}

const ListItem: React.FC<IListItemProps> = ({ list, selected, selectListCallback }) => {
    return (
        <li key={list.id} onClick={() => { selected && list.id == selected.id ? selectListCallback(null) : selectListCallback(list)}} 
            className={`flex flex-col py-4 px-6 mb-2 rounded-md border-solid ${ selected && list.id == selected.id ? `border-2 border-indigo-200 hover:border-teal-200` : `border border-slate-200 hover:border-indigo-200`}`}>
            <div className="flex flex-row justify-between">
                <p className=" text-lg font-medium text-start">{list.title}</p>
                <button className="border p-1 border-slate-200 hover:border-slate-500 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>
                </button>
            </div>
            { list.description.length > 0 && <p className="text-start">{list.description}</p>}
        </li>
    )
};

export default ListItem;