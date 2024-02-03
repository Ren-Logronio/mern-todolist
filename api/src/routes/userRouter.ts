import express, { Request, Response } from "express";
import { userModel as User } from "../models/userModel";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login/", (req: Request, res: Response) => {
    User.findOne({ email: req.body.email }, (err: any, user: any) => {});
});

router.post("register/", (req: Request, res: Response) => {
});

export default router;