import { Model, Models, Schema } from "mongoose";
import { user } from "./models";

const userSchema = new Schema<user, Model<user>> ({
    email: String,
    password: String,
}, { timestamps: true });

const userModel: Model<user> = new Model('user', userSchema);

export { userSchema, userModel };