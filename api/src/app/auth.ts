import { IUser } from "../models";
import { userModel as User } from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express, {Request, Response, NextFunction} from 'express';

const salt = bcrypt.genSaltSync(7);
const secret: string = process.env.JWT_SECRET || "secret";

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const verification = jwt.verify(req.headers.authorization?.split(" ")[1] || "", process.env.SECRET_KEY || "secret");
    const { _id } = verification as { _id: string };
    User.findById(_id).then(
        (user) => {
            if (user) {
                next();
            } else {
                res.status(200).json({status: "error", message: "Invalid Token"}); 
            }
        }
    ).catch(
        () => { res.status(200).json({status: "error", message: "Invalid Token"}); }
    )
    // next();
};

export { verifyJWT }