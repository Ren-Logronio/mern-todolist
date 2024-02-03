import { create } from "Zustand";
import { ListStateType, TodoStateType, UserStateType, UserType } from "./types";

type authStoreActions = {
    setUserAndToken: (user: UserType, token: string) => void,
    signout: () => void,
    signin: (user: UserType, token: string) => void,
    timeout: () => void,
    setFailed: (message: string) => void,
}

const useAuthStore = create<UserStateType & authStoreActions>(
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
        setFailed: (message: string) => { set((state) => ({ status: "failed", message: message,})); },
    }),
);

const useListStore = create<ListStateType>(
    (set) => ({
        lists: [],
        status: "loading",
        message: null,
    }),
);

const useTodoStore = create<TodoStateType>(
    (set) => ({
        todos: [],
        status: "loading",
        message: null,
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