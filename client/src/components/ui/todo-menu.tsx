import { useAuthStore, useGeneralStore, useTodoStore } from "@/app/stores";
import { useEffect, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { TailSpin } from "react-loader-spinner";
import TodoItem from "./todo-item";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { Container, Draggable } from "react-smooth-dnd";
import { arrayMoveImmutable } from "array-move";

export default function TodoMenu(){
    const todosStore = useTodoStore();
    const { setErrorDialog } = useGeneralStore();
    const [ todoForm, setTodoForm ] = useState({description: "", loading: false, error: ""});
    // const [ remainingChar, setRemainingChar ] = useState(150);
    const { token } = useAuthStore();

    const handleAddTodo = () => {
        setTodoForm({...todoForm, loading: true, error: ""});
        if(todoForm.description == "") {
            setTodoForm({description: "", loading: false, error: "Todo description cannot be empty"});
            return;
        }
        if(/^[\s\W]+/g.test(todoForm.description)) {
            setTodoForm({description: "", loading: false, error: "Todo description cannot start with a space or special character"});
            return;
        }
        if(!todosStore.selectedList) {
            setTodoForm({description: "", loading: false, error: "Cannot add todo without a list selected"});
            return;
        }
        todosStore.addTodo(
            { description: todoForm.description, completion: false, order: todosStore.currentOrder + 1 },
            todosStore.selectedList?._id,
            token,
            () => {
                setTodoForm({description: "", loading: false, error: ""});
            }
        );
    }

    const handleOnDropTodos = ({ removedIndex, addedIndex }: { removedIndex: number, addedIndex: number}) => {
        const newTodoOrder = arrayMoveImmutable(todosStore.todos, removedIndex, addedIndex).reverse().map((todo: any, index: number) => { todo.order = index + 1; return todo; }).reverse();
        console.log(newTodoOrder);
        todosStore.reorder(newTodoOrder, token);
    }

    useEffect(() => {
        setTodoForm({description: "", loading: false, error: ""});
    }, [todosStore.selectedList])

    useEffect(() => {
        if (todosStore.selectedList) {
            todosStore.setLoading();
            todosStore.getTodos(todosStore.selectedList._id, token);
        } else {
            return;
        }
    }, [todosStore.selectedList]);

    return (
        <div className="flex flex-col h-full min-w-[350px] p-6">
            <p className="font-semibold">My Todos</p>
            <div className="mt-8">
                { !todosStore.selectedList && <p className="text-center text-gray-400">No List Selected</p> }
                { todosStore.selectedList && <p>{ todosStore.selectedList.name }</p> }
                { todosStore.status == "success" && 
                    <div className="flex flex-row mt-4">
                        <Input value={todoForm.description} onKeyDown={(e) => { e.key == "Enter" ? handleAddTodo() : null }} onChange={(e) => { setTodoForm({...todoForm, description: e.target.value}) }} placeholder="Enter Todos" className=""/>
                        <Button onClick={handleAddTodo} disabled={todoForm.loading} className="ml-1">
                            { todoForm.loading ? <><TailSpin visible={true} height="20" width="20" color="#000000" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass=" mr-2"/>Todo'ing...</> : "Add Todo" }
                        </Button>
                    </div>
                }
                {
                    todoForm.error && 
                    <div className="">
                        <p className="text-start text-red-500 text-sm">{ todoForm.error }</p>
                    </div>
                }
                {
                    todosStore.status == "error" && 
                    <div className="my-2">
                        <p className="text-center text-red-500">{ todosStore.message }</p>
                    </div>
                }
                <div className="mt-8">
                    {
                        todosStore.status == "loading" && 
                        <div className="flex flex-row justify-center">
                            <TailSpin visible={true} height="20" width="20" color="#000000" ariaLabel="tail-spin-loading" radius="0.2" wrapperStyle={{}} wrapperClass="ml-4 mr-2"/>
                            <p className="text-center">Loading Todos...</p>
                        </div>
                    }
                    { todosStore.status == "success" && todosStore.todos.length == 0 && <p className="text-center text-gray-400">No Todos</p> }
                    {
                        todosStore.status == "success" && 
                        <>
                            <ScrollArea className="max-h-[440px] mt-4 overflow-y-auto">
                                <ScrollBar orientation="vertical" />
                            { /* @ts-ignore */}
                                <Container dragHandleSelector=".dnd-drag-handle" lockAxis="y" onDrop={handleOnDropTodos}>
                                    {todosStore.todos.map((todo, index) => (
                                        /* @ts-ignore */
                                        <Draggable key={todo._id}>
                                                <TodoItem key={todo._id} todo={todo} />
                                        </Draggable>
                                    ))}
                                </Container>
                            </ScrollArea>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}