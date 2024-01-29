export default function TodoItem(props: any) {
    return (
        <div className="p-3 border border-solid border-slate-200 mx-auto flex flex-row" key={props.oid}>
            <h1 className=" me-5 min-w-[200px]">{props.title}</h1>
            <button className="p-2 border border-slate-200 rounded-sm" onClick={() => props.callbackToggleCompletion(props.oid)}>
                { props.completed ? 'Completed' : 'Not Completed' }
            </button>
            <button className="ms-2 p-2 border border-slate-200 rounded-sm" onClick={() => props.callbackRemoveTodo(props.oid)}>
                Remove
            </button>
        </div>
    )
}