import { Document } from "mongoose";

export type ITodo = {
    description: string;
    completion: boolean;
    deadline: Date;
    order: number;
};

export type ITodoList = {
    user: IUser;
    name: string;
    description: string;
    order: number;
    todos: [];
};

export type IUser = {
    email: string,
    password: string,
    tektok?: string,
    username?: string;
}