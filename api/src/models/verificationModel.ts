import mongoose, { Model, Schema } from "mongoose";
import { IVerification } from ".";

const verificationSchema = new Schema<IVerification>({
    email: String,
    username: String,
    password: String,
    code: String,
}, { timestamps: true }); 

const verificationModel = mongoose.model("Verification", verificationSchema);

export { verificationSchema, verificationModel };