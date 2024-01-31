import { ITodoList, ITodo } from ".";
import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema<ITodo>({
    description: String,
    completion: Boolean,
    deadline: Date,
    order: Number,
}, { timestamps: true });

const todoModel = mongoose.model('todo', todoSchema);

export { todoSchema, todoModel, };