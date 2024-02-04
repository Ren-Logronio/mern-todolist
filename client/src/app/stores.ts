import { create } from "Zustand";
import { ListStateType, ListType, TodoStateType, UserStateType, UserType } from "./types";
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
            set((state) => ({ user: null, token: null, status: "timeout", message: "Session Timed Out",})); 
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
    setLoading: () => void,
    setError: (message: string) => void,
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
    }),
);

type TodoStoreActions = {
    select: (list: ListType) => void,
    unselect: () => void,
}

const useTodoStore = create<{selectedList: ListType | null} & TodoStateType & TodoStoreActions>(
    (set) => ({
        selectedList: null,
        todos: [],
        status: "loading",
        message: null,
        select: (list: ListType) => { set((state) => ({ selectedList: list, todos: [], status: "loading", message: null })); },
        unselect: () => { set((state) => ({ selectedList: null, todos: [], status: "idle", message: null })); },
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

export { useAuthStore, useListStore, useTodoStore, useTestStore };