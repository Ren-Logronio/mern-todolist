import { todoList, todo } from "./models";
import { Model, Schema } from "mongoose";

const todoSchema = new Schema<todo>({
    title: String,
    completion: Boolean,
    deadline: Date,
}, { timestamps: true });

const todoModel = new Model('todo', todoSchema);

export { todoSchema, todoModel, };