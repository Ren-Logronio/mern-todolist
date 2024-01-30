import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import TodoItem from "../components/TodoItem";

export type Todo = {
    _id: string,
    title: string,
    completed: boolean,
}

export default function Dash() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputText, setInputText] = useState<string>("");
    
    useEffect(() => {
        console.log(todos);
    }, [todos])

    useEffect(() => {
        console.log(inputText);
    }, [inputText])

    const addTodo = () => {
        const newTodo: Todo = {
            _id: uuidv4(),
            title: inputText,
            completed: false,
        }
        setTodos([...todos, newTodo]);
        setInputText("");
    }

    const toggleCompletion = (id: string) => {
        const newTodos = todos.map(todo => {
            if (todo._id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setTodos(newTodos);
    };

    const removeTodo = (id: string) => {
        const newTodos = todos.filter(todo => todo._id !== id);
        setTodos(newTodos);
    }

    const todoList = todos.map(todo => {
        return (
            <TodoItem key={todo._id} oid={todo._id} title={todo.title} completed={todo.completed} callbackToggleCompletion={toggleCompletion} callbackRemoveTodo={removeTodo} />
        );
    });

    return (
        <div className="flex flex-col justify-center h-screen text-center">
            <h1>Todo List</h1>
            <div className="flex flex-row justify-center">
                <input className="border border-solid border-slate-200" onChange={(e) => setInputText(e.target.value)} value={inputText} type="text" />
                <button className="p-2 border border-slate-200 rounded-sm px-8" onClick={addTodo}>Add</button>
            </div>
            <h1 className=" mt-5">List</h1>
            { todoList }
        </div>
    )
}