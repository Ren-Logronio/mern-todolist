import { Document } from "mongoose";

export interface ITodo {
    description: string;
    completion: boolean;
    deadline: Date;
    order: number;
};

export interface ITodoList {
    user: IUser;
    name: string;
    description: string;
    todos: [];
};

export interface IUser {
    email: string,
    password: string,
    tektok?: string,
    username?: string;
}