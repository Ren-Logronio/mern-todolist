import express, { Request, Response } from "express";
import { todoListModel as TodoList } from "../models/todoListModel";
import { todoModel as Todo } from "../models/todoModel";
import artificiallyDelay from "../middlewares/artificiallyDelay";
import { verifyJWT } from "../app/auth";
import { ObjectId } from "mongodb";

const router = express.Router();

// Place routes
router.get('/', artificiallyDelay, (req: Request, res: Response,) => {
    const { user } = req.query;
    const queryObject = req.query.user ? { user: new ObjectId(String(user)) } : {};
    TodoList.find(queryObject).then(
        (todoList: any) => { res.status(200).json({todoList}) },
    ).catch(
        (err: any) => { res.status(500).json(err) },
    )
});

router.get('/:id/todo/', artificiallyDelay, verifyJWT, (req: Request, res: Response,) => {
    const todoListId = req.params.id;
    TodoList.findById(todoListId).populate("todos").then(
        (todoList: any) => {
            res.status(200).json(todoList.todos);
        },
    ).catch(
        (err: any) => res.status(500).json(err),
    )
});

router.post('/', artificiallyDelay, verifyJWT, (req: Request, res: Response,) => {
    const newTodoList = new TodoList({ name: req.body.name, order: req.body.order, description: req.body.description, user: req.body.user });
    newTodoList.save().then(
        (todoList: any) => res.status(200).json(todoList),
    ).catch(
        (err: any) => res.status(500).json(err),
    )
});

router.post('/:id/todo/', artificiallyDelay, verifyJWT, (req: Request, res: Response,) => {
    TodoList.findById(req.params.id).then(
        (todoList: any) => {
            const newTodo = new Todo({ ...req.body.todo });
            newTodo.save().then(
                (todo: any) => {
                    todoList.todos.push({ _id: todo._id });
                    todoList.save().then(
                        (todoList: any) => res.status(200).json(todo),
                    ).catch(
                        (err:any) => { throw err },
                    );
                },
            ).catch(
                (err:any) => { throw err },
            );
        },
    ).catch(
        (err: any) => {
            res.status(500).json(err);
        },
    );
});

router.post('/reorder/', artificiallyDelay, verifyJWT, (req: Request, res: Response,) => {
    const reOrderedList = req.body.lists;
    const newlyOrderedList = reOrderedList.map((listObject: any) => {
        const { _id: id, order } = listObject;
        TodoList.findByIdAndUpdate(id, { order }, { new: true }).then(
            (todoList: any) => {
                return todoList;
            },
        ).catch(
            (err: any) => {
                return false;
            },
        )
    });
    if (newlyOrderedList.includes(false)) {
        res.status(500).json("Error reordering list");
    } else {
        res.status(200).json(newlyOrderedList);
    }
});

router.put('/:id', artificiallyDelay, verifyJWT, (req: Request, res: Response,) => {
    const todoListId = req.params.id;
    TodoList.findByIdAndUpdate(todoListId, { ...req.body }, { new: true }).then(
        (todoList: any) => res.status(200).json(todoList),
    ).catch(
        (err: any) => res.status(500).json(err),
    )
});

router.delete('/:id', artificiallyDelay, verifyJWT, (req: Request, res: Response,) => {
    const todoListId = req.params.id;
    TodoList.findByIdAndDelete(todoListId).populate("todos").then(
        (todoList: any) => {
            todoList.todos.forEach((todo: any) => {
                Todo.findByIdAndDelete(todo._id).catch((err) => res.status(500).json(err));
            });
            res.status(200).json(todoList);
        },
    ).catch(
        (err: any) => res.status(500).json(err),
    )
})

export default router;

/*
7 routes

GET *
/list/ => all list *
/list/{id} => get list with id *

POST *
/list/ => post new list *
/list/{listId}/todo/ => post new todo to list *

PUT *
/list/{id} => put list with id *

DELETE *
/list/{id} => delete list with id *

*/