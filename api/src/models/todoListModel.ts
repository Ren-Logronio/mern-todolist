import { Model, Schema } from "mongoose";
import { todoList } from "./models";

const todoListSchema = new Schema<todoList>({
    name: String,
    description: String,
    todos: [{
        type: Schema.Types.ObjectId,
        ref: "todo"
    }]
}, { timestamps: true });

const todoListModel = new Model("todoList", todoListSchema);

export { todoListSchema, todoListModel };