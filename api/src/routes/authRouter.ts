import express, { Request, Response } from "express";
import { userModel as User } from "../models/userModel";
import { ObjectId } from "mongodb";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/signin/", (req: Request, res: Response) => {
    const { username, password } = req.body;
    User.findOne({ username: username }).then(
        (user) => {
            if (!user) {
                res.status(200).json({ status: "error", message: "Incorrect Username or Password" });
            } else {
                if (bcrypt.compareSync(password, user.password)) {
                    const token = jwt.sign(
                        { _id: user._id },
                        process.env.SECRET_KEY || "secret",
                        {
                            expiresIn: "30m",
                        }
                    );
                    const { _id, username } = user;
                    res.status(200).json({ status: "success", message: "User found", token: token, user: {_id, username}});
                } else {
                    res.status(200).json({ status: "error", message: "Incorrect Username or Password" });
                }
            }
        }
    ).catch((err) => {
        res.status(404).json({ status: "error", message: "Internal Server Error" });
    })
});

router.post('/verify/', (req: Request, res: Response) => {
    const { user, token } = req.body;
    const verification = jwt.verify(token, process.env.SECRET_KEY || "secret");
    const { _id } = verification as { _id: string };
    if (user._id !== _id) {
        res.status(200).json(false);
    }
    User.findById(_id).then(
        (user) => {
            if (user) {
                res.status(200).json(true);
            } else {
                res.status(200).json(false); 
            }
        }
    ).catch(
        () => { res.status(200).json(false); }
    )
});

router.post("/register/", (req: Request, res: Response) => {
});

export default router;