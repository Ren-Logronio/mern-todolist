import mongoose, { Schema } from "mongoose";
import { ITodoList } from ".";

const todoListSchema = new Schema<ITodoList>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    name: String,
    order: Number,
    description: String,
    todos: [{
        type: Schema.Types.ObjectId,
        ref: "todo"
    }]
}, { timestamps: true });

const todoListModel = mongoose.model("list", todoListSchema);

export { todoListSchema, todoListModel };