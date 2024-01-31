import express, { Request, Response } from "express";
import { todoModel as Todo } from "../models/todoModel";
import { ObjectId } from "mongodb";
import { Error } from "mongoose";

/*

GET
/todo/ => all todo
/todo/{id} => get todo with id

POST
/todo/ => post new todo

PUT
/todo/{id} => put todo with id

DELETE
/todo/{id} => delete todo with id

*/

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    Todo.find({}).then(
        (todo: any) => { 
            res.sendStatus(200);
            res.send(todo);
        }
    ).catch(
        (err: Error) => {
            res.sendStatus(500);
            res.send(err);
        }
    );
});

router.get("/:id", (req: Request, res: Response) => {
    const todoId = req.params.id;
    Todo.find({ _id: new ObjectId(todoId) }).then(
        (todo: any) => {
            res.sendStatus(200);
            res.send(todo);
        }
    ).catch(
        (err: Error) => {
            res.sendStatus(500);
            res.send(err)
        }
    )
});

export default router;