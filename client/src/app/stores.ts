import { create } from "Zustand";
import { ListStateType, TodoStateType, UserStateType } from "./types";

const useAuthStore = create<UserStateType>(
    (set) => ({
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}") : null,
        token: localStorage.getItem("userToken"),
        status: "loading",
        message: null,
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

export { useAuthStore, useListStore, useTodoStore };