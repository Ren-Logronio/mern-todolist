"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const userModel_1 = require("../models/userModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const salt = bcryptjs_1.default.genSaltSync(7);
const secret = process.env.JWT_SECRET || "secret";
const verifyJWT = (req, res, next) => {
    var _a;
    const verification = jsonwebtoken_1.default.verify(((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "", process.env.SECRET_KEY || "secret");
    const { _id } = verification;
    userModel_1.userModel.findById(_id).then((user) => {
        if (user) {
            next();
        }
        else {
            res.status(200).json({ status: "error", message: "Invalid Token" });
        }
    }).catch(() => { res.status(200).json({ status: "error", message: "Invalid Token" }); });
    // next();
};
exports.verifyJWT = verifyJWT;
