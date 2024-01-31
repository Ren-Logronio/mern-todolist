import { todoList, todo } from ".";
import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema<todo>({
    title: String,
    completion: Boolean,
    deadline: Date,
}, { timestamps: true });

const todoModel = mongoose.model('todo', todoSchema);

export { todoSchema, todoModel, };