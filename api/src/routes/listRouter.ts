import express, { Request, Response } from "express";
import { todoListModel as TodoList } from "../models/todoListModel";
import { todoModel as Todo } from "../models/todoModel";

const router = express.Router();

// Place routes
router.get('/', (res: Response, req: Request) => {
    TodoList.find({}).then(
        (todoList: any) => res.status(200).json(todoList),
    ).catch(
        (err: any) => res.status(500).json(err),
    )
})

router.get('/:id', (res: Response, req: Request) => {
    const todoListId = req.params.id;
    TodoList.findById(req.params.id).then(
        (todoList: any) => res.status(200).json(todoList),
    ).catch(
        (err: any) => res.status(500).json(err),
    )
})

router.post('/', (res: Response, req: Request) => {
    const newTodoList = new TodoList({ ...req.body });
    newTodoList.save().then(
        (todoList: any) => res.status(200).json(todoList),
    ).catch(
        (err: any) => res.status(500).json(err),
    )
});

router.post('/:id/todo/', (res: Response, req: Request) => {
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

router.put('/:id', (res: Response, req: Request) => {
    const todoListId = req.params.id;
    TodoList.findByIdAndUpdate(todoListId, { ...req.body }, { new: true }).then(
        (todoList: any) => res.status(200).json(todoList),
    ).catch(
        (err: any) => res.status(500).json(err),
    )
});

router.delete('/:id', (res: Response, req: Request) => {
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