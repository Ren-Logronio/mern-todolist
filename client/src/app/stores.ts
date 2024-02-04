import { create } from "Zustand";
import { ListStateType, ListType, TodoStateType, TodoType, UserStateType, UserType } from "./types";
import axios from "axios";

type AuthStoreActions = {
    setUserAndToken: (user: UserType, token: string) => void,
    signout: () => void,
    signin: (user: UserType, token: string) => void,
    timeout: () => void,
    setFailed: (message: string) => void,
}

const useAuthStore = create<UserStateType & AuthStoreActions>(
    (set) => ({
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}") : null,
        token: localStorage.getItem("userToken"),
        status: "loading",
        message: null,
        setUserAndToken: (user: UserType, token: string) => { 
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("userToken", token);
            set((state) => ({ user: user, token: token, status: "success", message: null,})); 
        },
        timeout: () => {
            localStorage.removeItem("user");
            localStorage.removeItem("userToken");
            set((state) => ({ user: null, token: null, status: "timeout", message: "User Timed out",})); 
        },
        signin: (user: UserType, token: string) => {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("userToken", token);
            set((state) => ({ user: user, token: token, status: "success", message: "User Logged in",}));
        },
        signout: () => { 
            localStorage.removeItem("user");
            localStorage.removeItem("userToken");
            set((state) => ({ user: null, token: null, status: "idle", message: "User Logged out",}));
        },
        setFailed: (message: string) => { set((state) => ({ status: "error", message: message,})); },
    }),
);

type ListStoreActions = {
    setLists: (newLists: any[]) => void,
    addList: (newList: ListType) => void,
    reorder: (newLists: ListType[], token: string | null) => void,
    editList: (listId: string, newList: ListType, token: string | null, callback: ()=>void) => void,
    deleteList: (listId: string, token: string | null, callback: ()=>void) => void
    setLoading: () => void,
    setError: (message: string) => void,
    reset: () => void,
}

const useListStore = create<ListStateType & {currentOrder: number} & ListStoreActions>(
    (set) => ({
        lists: [],
        status: "loading",
        message: null,
        currentOrder: 0,
        addList: (newList: ListType) => {
            set((state) => ({ lists: [...state.lists, newList], currentOrder: newList.order, status: "success", message: null }));
        },
        setLists: (newLists: any[]) => { 
            const orderedNewList = newLists.sort((a, b) => a.order - b.order);
            const highestOrder = newLists.length > 0 ? orderedNewList[orderedNewList.length - 1].order : 0;
            set((state) => ({ lists: orderedNewList, currentOrder: highestOrder, status: "success", message: null })); 
        },
        editList: (listId: string, newList: ListType, token: string | null, callback: ()=>void) => {
            axios.put(`/api/list/${listId}`, newList, { headers: { authorization: `local ${token}` }}).then(
                (res) => { 
                    callback();
                    set((state) => ({lists: state.lists.map((i) => i._id == listId ? {...i, ...newList} : i), status: "success", message: null })); 
                }
            ).catch(
                (err) => { set((state) => ({ status: "error", message: err.message })); }
            )
        },
        deleteList: (listId: string, token: string | null, callback: ()=>void) => {
            axios.delete(`/api/list/${listId}`, { headers: { authorization: `local ${token}` }}).then(
                (res) => { 
                    callback();
                    set((state) => ({lists: state.lists.filter((item) => item._id != listId), status: "success", message: null }));
                }
            ).catch(
                (err) => { set((state) => ({ status: "error", message: err.message })); }
            )
        },
        reorder: (newLists: ListType[], token: string | null) => { 
            set((state) => ({ lists: newLists }));
            axios.post("/api/list/reorder/", { lists: newLists }, { headers: { authorization: `local ${token}` } }).then(
                (res) => { set((state) => ({ status: "success", message: null })); }
            ).catch(
                (err) => { set((state) => ({ status: "error", message: err.message })); }
            );
        },
        setLoading: () => { set((state) => ({ status: "loading", message: null })); },
        setError: (message: string) => { set((state) => ({ status: "error", message: message })); },
        reset: () => { set((state) => ({ lists: [], status: "loading", message: null })); },
    }),
);

type TodoStoreActions = {
    select: (list: ListType) => void,
    unselect: () => void,
    setLoading: () => void,
    setError: (message: string) => void,
    addTodo: (todo: Omit<TodoType, "_id">, listId: string, token: string | null, callback: ()=>void) => void,
    getTodos: (listId: string, token: string | null) => void,
    deleteTodo: (todoId: string, token: string | null, callback: () => void) => void,
    editTodo: (todoId: string, newTodo: Omit<TodoType, "_id">, token: string | null, callback: ()=>void) => void,
    reorder: (newTodos: TodoType[], token: string | null) => void,
    setCompletion: (todoId: string, completion: boolean, token: string | null) => void,
    reset: () => void,
}

const useTodoStore = create<{selectedList: ListType | null, currentOrder: number} & TodoStateType & TodoStoreActions>(
    (set) => ({
        selectedList: null,
        todos: [],
        status: "loading",
        currentOrder: 0,
        message: null,
        select: (list: ListType) => { set((state) => ({ selectedList: list, todos: [], status: "loading", message: null })); },
        unselect: () => { set((state) => ({ selectedList: null, todos: [], status: "idle", message: null })); },
        setLoading: () => { set((state) => ({ status: "loading", message: null })); },
        setError: (message: string) => { set((state) => ({ status: "error", message: message })); },
        addTodo: (todo: Omit<TodoType, "_id">, listId: string, token: string | null, callback: ()=>void) => {
            axios.post(`/api/list/${listId}/todo/`, { todo }, { headers: { authorization: `local ${token}` }}).then(
                (res) => { 
                    callback();
                    set((state) => ({ todos: [res.data, ...state.todos ], currentOrder: state.currentOrder + 1,status: "success", message: null })); 
                }
            ).catch(
                (err) => { set((state) => ({ status: "error", message: err.message })); }
            )
        },
        editTodo: (todoId: string, newTodo: Omit<TodoType, "_id">, token: string | null, callback: ()=>void) => {
            axios.put(`/api/todo/${todoId}`, newTodo, { headers: { authorization: `local ${token}` }}).then(
                (res) => { 
                    set((state) => ({ todos: state.todos.map((i) => i._id == todoId ? {...i, ...newTodo} : i), status: "success", message: null })); 
                    callback();
                }
            ).catch(
                (err) => { set((state) => ({ status: "error", message: err.message })); }
            )
        },
        deleteTodo: (todoId: string, token: string | null, callback: () => void) => {
            axios.delete(`/api/todo/${todoId}`, { headers: { authorization: `local ${token}` }}).then(
                (res) => {
                    callback();
                    set((state) => ({ todos: state.todos.filter((item) => item._id != todoId), status: "success", message: null })); 
                }
            ).catch(
                (err) => { set((state) => ({ status: "error", message: err.message })); }
            )
        },
        getTodos: (listId: string, token: string | null) => {
            axios.get(`/api/list/${listId}/todo/`, { headers: { authorization: `local ${token}` }}).then(
                (res) => { 
                    const orderedTodos = res.data.sort((a: any, b: any) => b.order - a.order);
                    set((state) => ({ todos: orderedTodos, currentOrder: orderedTodos.length > 0 ? orderedTodos[orderedTodos.length - 1].order : 0, status: "success", message: null })); 
                }
            ).catch(
                (err) => { set((state) => ({ status: "error", message: err.message })); }
            )
        },
        reorder: (newTodos: TodoType[], token: string | null) => {
            set((state) => ({ todos: newTodos }));
            axios.post("/api/todo/reorder/", { todos: newTodos }, { headers: { authorization: `local ${token}` } }).then(
                (res) => { set((state) => ({ status: "success", message: null })); }
            ).catch(
                (err) => { set((state) => ({ status: "error", message: err.message })); }
            );
        },
        setCompletion: (todoId: string, completion: boolean, token: string | null) => {
            axios.put(`/api/todo/${todoId}`, { completion }, { headers: { authorization: `local ${token}` }}).then(
                (res) => { set((state) => ({ todos: state.todos.map((i) => i._id == todoId ? {...i, completion: completion} : i), status: "success", message: null })); }
            ).catch(
                (err) => { set((state) => ({ status: "error", message: err.message })); }
            )
        },
        reset: () => { set((state) => ({ todos: [], selectedList: null, status: "idle", message: null })); },
    }),
);

type TestStoreType = {
    count: number,
    increment: () => void,
}

const useTestStore = create<TestStoreType>(
    (set) => ({
        count: 0,
        increment: () => set((state: TestStoreType) => ({ count: state.count + 1 })),
    }),
);

type GeneralStoreType = {
    errorDialog: boolean,
    errorDialogMessage: string,
    setErrorDialog: (message: string) => void,
    clearErrorDialog: () => void,
}

const useGeneralStore = create<GeneralStoreType>((set) => ({
    errorDialog: false,
    errorDialogMessage: "",
    setErrorDialog: (message: string) => { set((state) => ({ errorDialog: true, errorDialogMessage: message })); },
    clearErrorDialog: () => { set((state) => ({ errorDialog: false, errorDialogMessage: "" })); },
}))

export { useAuthStore, useListStore, useTodoStore, useTestStore, useGeneralStore };