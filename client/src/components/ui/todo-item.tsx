import { TodoType } from "@/app/types";
import { Checkbox } from "./checkbox";
import { Button } from "./button";
import { useState } from "react";
import { useAuthStore, useTodoStore } from "@/app/stores";
import { TailSpin } from "react-loader-spinner";
import { Input } from "./input";

interface TodoItemProps {
    todo: TodoType;
}

export default function TodoItem({ todo }: TodoItemProps){
    const { token } = useAuthStore();
    const todoStore = useTodoStore();
    const [ inFocus, setInFocus ] = useState(false);
    const [ editForm, setEditForm ] = useState({description: todo.description, editing: false, loading: false, error: ""});
    const [ isDeleting, setIsDeleting ] = useState(false);

    const handleCompletionTodo = (newValue: boolean) => {
        todoStore.setCompletion(todo._id, newValue, token);
    }

    const handleDelete = () => {
        setIsDeleting(true);
        todoStore.deleteTodo(todo._id, token, ()=>{
            setIsDeleting(false);
        });
    }

    const handleStartEdit = () => {
        setEditForm({...editForm, editing: true});
    }

    const handleEdit = () => {
        setEditForm({...editForm, loading: true, error: ""});
        if(editForm.description == todo.description) {
            setEditForm({description: todo.description, editing: false, loading: false, error: ""});
            return;
        }
        if(editForm.description == "") {
            setEditForm({description: todo.description, editing: false, loading: false, error: "Todo description cannot be empty"});
            return;
        }
        if(/^[\s\W]+/g.test(editForm.description)) {
            setEditForm({description: todo.description, editing: false, loading: false, error: "Todo description cannot start with a space or special character"});
            return;
        }
        todoStore.editTodo(
            todo._id,
            { description: editForm.description, completion: todo.completion, order: todo.order },
            token,
            () => {
                setEditForm({description: editForm.description, editing: false, loading: false, error: ""});
            }
        );
    }

    return (
        <div onMouseOver={() => {setInFocus(true)}} onMouseOut={()=>{setInFocus(false)}} className="flex flex-row items-center">
            <div className={`dnd-drag-handle mr-2 cursor-grab text-gray-400 ${inFocus && !editForm.editing ? "visible": "invisible"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                    <path fillRule="evenodd" d="M2 2.75A.75.75 0 0 1 2.75 2h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 2.75Zm0 10.5a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75ZM2 6.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 6.25Zm0 3.5A.75.75 0 0 1 2.75 9h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 9.75Z" clipRule="evenodd" />
                </svg>
            </div>
            <Checkbox disabled={editForm.editing} defaultChecked={todo.completion} onCheckedChange={handleCompletionTodo}/>
            {
                editForm.editing ?
                <Input
                    value={editForm.description}
                    onChange={(e) => {setEditForm({...editForm, description: e.target.value})}}
                    className="flex-grow mx-2"
                />
                :
                <p className="m-0 ml-4 flex-grow text-start">{todo.description}</p>
            }
            <div className={`flex flex-row ${inFocus || editForm.editing ? "visible": "invisible"}`}>
                {
                    !editForm.editing && <>
                    <Button disabled={isDeleting} onClick={handleStartEdit} className="p-2 hover:text-indigo-400" variant="ghost">
                    {
                        
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                            <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
                            <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
                        </svg>
                    }
                    </Button>
                    <Button disabled={isDeleting || editForm.editing} onClick={handleDelete} className="p-2 mr-2 hover:text-red-400" variant="ghost">
                        {
                            isDeleting ?
                            <TailSpin visible={true} height="12" width="12" color="#000000" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass=""/>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clipRule="evenodd" />
                            </svg>
                        }
                    </Button>
                    </>
                }
                {
                    editForm.editing &&
                    <Button disabled={editForm.loading} onClick={handleEdit}>
                        {
                            editForm.loading ? 
                            <>
                                <TailSpin visible={true} height="12" width="12" color="#ffffff" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass="mr-2"/><p className="text-sm">Saving...</p>
                            </> :
                            <>
                                Save
                            </>
                        }
                    </Button>
                }
            </div>
        </div>
    )
}