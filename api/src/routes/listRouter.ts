import express, { Request, Response } from "express";
import { todoListModel as TodoList } from "../models/todoListModel";
import { todoModel as Todo } from "../models/todoModel";

const router = express.Router();

// Place routes
router.get('/', (req: Request, res: Response,) => {
    TodoList.find({}).then(
        (todoList: any) => { res.status(200).json(todoList) },
    ).catch(
        (err: any) => { res.status(500).json(err) },
    )
})

router.get('/:id', (req: Request, res: Response,) => {
    const todoListId = req.params.id;
    TodoList.findById(req.params.id).then(
        (todoList: any) => res.status(200).json(todoList),
    ).catch(
        (err: any) => res.status(500).json(err),
    )
})

router.post('/', (req: Request, res: Response,) => {
    const newTodoList = new TodoList({ ...req.body });
    newTodoList.save().then(
        (todoList: any) => res.status(200).json(todoList),
    ).catch(
        (err: any) => res.status(500).json(err),
    )
});

router.post('/:id/todo/', (req: Request, res: Response,) => {
    TodoList.findById(req.params.id).then(
        (todoList: any) => {
            const newTodo = new Todo({ ...req.body });
            newTodo.save().then(
                (todo: any) => {
                    todoList.todos.push({ _id: todo._id });
                    todoList.save().then(
                        (todoList: any) => res.status(200).json(todoList),
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

router.put('/:id', (req: Request, res: Response,) => {
    const todoListId = req.params.id;
    TodoList.findByIdAndUpdate(todoListId, { ...req.body }, { new: true }).then(
        (todoList: any) => res.status(200).json(todoList),
    ).catch(
        (err: any) => res.status(500).json(err),
    )
});

router.put('/reorder', (req: Request, res: Response,) => {
    const reOrderedList = req.body;
    const newlyOrderedList = reOrderedList.map((listObject: any) => {
        const { _id, order } = listObject;
        TodoList.findByIdAndUpdate(_id, { order }, { new: true }).then(
            (todoList: any) => todoList,
        ).catch(
            (err: any) => false,
        )
    });
    if (newlyOrderedList.includes(false)) {
        res.status(500).json("Error reordering list");
    } else {
        res.status(200).json(newlyOrderedList);
    }
});

router.delete('/:id', (req: Request, res: Response,) => {
    const todoListId = req.params.id;
    TodoList.findByIdAndDelete(todoListId).then(
        (todoList: any) => res.status(200).json(todoList),
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