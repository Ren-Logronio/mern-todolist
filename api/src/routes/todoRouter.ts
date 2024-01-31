import express, { Request, Response } from "express";
import { todoModel as Todo } from "../models/todoModel";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    Todo.find({}).then(
        (todo: any) => { 
            res.status(200).json(todo);
        }
    ).catch(
        (err: any) => {
            res.status(500).json(err);
        }
    );
});

router.get("/:id", (req: Request, res: Response) => {
    const todoId = req.params.id;
    Todo.findById(todoId).then(
        (todo: any) => {
            res.status(200).json(todo);
        }
    ).catch(
        (err: any) => {
            res.status(500).json(err)
        }
    )
});

router.post("/", (req: Request, res: Response) => {
    const newTodo = new Todo({ ...req.body, completion: false });
    newTodo.save().then(
        (todo: any) => {
            res.status(200).json(newTodo);
        }
    ).catch(
        (err: any) => {
            res.status(500).json(err)
        }
    )
});

router.put("/:id", (req: Request, res: Response) => {
    const todoId = req.params.id;
    Todo.findByIdAndUpdate(todoId, { ...req.body }, { new: true }).then(
        (todo: any) => {
            res.status(200).json(todo);
        }
    ).catch(
        (err: any) => {
            res.status(500).json(err);
        }
    )
});

router.delete("/:id", (req: Request, res: Response) => {
    const todoId = req.params.id;
    Todo.findByIdAndDelete(todoId).then(
        (todo: any) => res.status(200).json(todo)
    ).catch(
        (err: any) => res.status(500).json(err)
    )
});

export default router;

/*
5 routes

GET *
/todo/ => all todo *
/todo/{id} => get todo with id *

POST *
/todo/ => post new todo *

PUT *
/todo/{id} => put todo with id *

DELETE *
/todo/{id} => delete todo with id *

*/