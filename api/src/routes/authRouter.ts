import express, { Request, Response } from "express";
import { userModel as User } from "../models/userModel";
import { verificationModel as Verification } from "src/models/verificationModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import artificiallyDelay from "../middlewares/artificiallyDelay";

const router = express.Router();

router.post("/signin/", artificiallyDelay, (req: Request, res: Response) => {
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
                            expiresIn: "2h",
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
    const verification = jwt.verify(req.headers.authorization?.split(" ")[1] || "", process.env.SECRET_KEY || "secret");
    const { _id } = verification as { _id: string };
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

router.post("/username", (req: Request, res: Response) => {
    const { username } = req.body;
    User.find({ username }).then((users: any) => {
        if (users.length <= 0) {
            res.status(200).json({ status: "success", message: "Username is available" });
        } else {
            res.status(200).json({ status: "error", message: "Username is taken" });
        }
    }).catch(() => {
        res.status(200).json({ status: "error", message: "Internal Server Error" });
    })
});

router.post("/signup/", (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    // generate 6 digit char
    const code = Math.random().toString(36).substring(2, 8);
    

    // send email
    /*n

    Thank you for signing up for our service. To finally confirm your account, please enter the following code into the app:
    [6 digit code here]

    */
    const verification = new Verification({ email, username, password, code });
    verification.save().then(() => {
        res.status(200).json({ status: "success", message: "Verification code sent" });
    }).catch(() => {
        res.status(200).json({ status: "error", message: "Internal Server Error" });
    });
});

router.post("/confirm", (req: Request, res: Response) => {
    const { code } = req.query;
    // token is the signed code sent from the email, verifies that the user the code is being sent to is the same user that requested the code
    Verification.findOne({ code })
})

export default router;