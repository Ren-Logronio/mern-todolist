import mongoose, { Schema } from "mongoose";
import { todoList } from ".";

const todoListSchema = new Schema<todoList>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    name: String,
    description: String,
    todos: [{
        type: Schema.Types.ObjectId,
        ref: "todo"
    }]
}, { timestamps: true });

const todoListModel = mongoose.model("todoList", todoListSchema);

export { todoListSchema, todoListModel };