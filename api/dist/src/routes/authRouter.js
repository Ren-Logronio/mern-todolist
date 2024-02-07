"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const artificiallyDelay_1 = __importDefault(require("../middlewares/artificiallyDelay"));
const router = express_1.default.Router();
router.post("/signin/", artificiallyDelay_1.default, (req, res) => {
    const { username, password } = req.body;
    userModel_1.userModel.findOne({ username: username }).then((user) => {
        if (!user) {
            res.status(200).json({ status: "error", message: "Incorrect Username or Password" });
        }
        else {
            if (bcryptjs_1.default.compareSync(password, user.password)) {
                const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.SECRET_KEY || "secret", {
                    expiresIn: "2h",
                });
                const { _id, username } = user;
                res.status(200).json({ status: "success", message: "User found", token: token, user: { _id, username } });
            }
            else {
                res.status(200).json({ status: "error", message: "Incorrect Username or Password" });
            }
        }
    }).catch((err) => {
        res.status(404).json({ status: "error", message: "Internal Server Error" });
    });
});
router.post('/verify/', (req, res) => {
    var _a;
    const verification = jsonwebtoken_1.default.verify(((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "", process.env.SECRET_KEY || "secret");
    const { _id } = verification;
    userModel_1.userModel.findById(_id).then((user) => {
        if (user) {
            res.status(200).json(true);
        }
        else {
            res.status(200).json(false);
        }
    }).catch(() => { res.status(200).json(false); });
});
router.post("/register/", (req, res) => {
});
exports.default = router;
