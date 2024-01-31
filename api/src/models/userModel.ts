import mongoose, { Schema } from "mongoose";
import { user } from "../models";
import bcrypt from "bcryptjs";

const userSchema = new Schema<user> ({
    email: String,
    password: String,
    username: String,
}, { 
    methods: {
        verifyPassword(password) {
            return bcrypt.compareSync(password, this?.password );
        }
    },
    timestamps: true 
});

const userModel = mongoose.model('user', userSchema);

export { userSchema, userModel };