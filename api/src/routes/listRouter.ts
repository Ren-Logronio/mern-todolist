import express, { Request, Response } from "express";
import { userModel as User } from "../models/userModel";
import { ObjectId } from "mongodb";

/*

GET
/user/ => all user
/user/{id} => get user with id

POST
/user/ => post new user

PUT
/user/{id} => put user with id

DELETE
/user/{id} => delete user with id

*/

const router = express.Router();

// Place routes

export default router;