"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoModel_1 = require("../models/todoModel");
const artificiallyDelay_1 = __importDefault(require("../middlewares/artificiallyDelay"));
const auth_1 = require("../app/auth");
const router = express_1.default.Router();
// router.get("/", artificiallyDelay, verifyJWT, (req: Request, res: Response) => {
//     Todo.find({}).then(
//         (todo: any) => { 
//             res.status(200).json(todo);
//         }
//     ).catch(
//         (err: any) => {
//             res.status(500).json(err);
//         }
//     );
// });
// router.get("/:id", artificiallyDelay, verifyJWT, (req: Request, res: Response) => {
//     const todoId = req.params.id;
//     Todo.findById(todoId).then(
//         (todo: any) => {
//             res.status(200).json(todo);
//         }
//     ).catch(
//         (err: any) => {
//             res.status(500).json(err)
//         }
//     )
// });
// router.post("/", artificiallyDelay, verifyJWT, (req: Request, res: Response) => {
//     const newTodo = new Todo({ ...req.body, completion: false });
//     newTodo.save().then(
//         (todo: any) => {
//             res.status(200).json(newTodo);
//         }
//     ).catch(
//         (err: any) => {
//             res.status(500).json(err)
//         }
//     )
// });
router.put("/:id", artificiallyDelay_1.default, auth_1.verifyJWT, (req, res) => {
    const todoId = req.params.id;
    todoModel_1.todoModel.findByIdAndUpdate(todoId, Object.assign({}, req.body), { new: true }).then((todo) => {
        res.status(200).json(todo);
    }).catch((err) => {
        res.status(500).json(err);
    });
});
router.delete("/:id", artificiallyDelay_1.default, auth_1.verifyJWT, (req, res) => {
    const todoId = req.params.id;
    todoModel_1.todoModel.findByIdAndDelete(todoId).then((todo) => res.status(200).json(todo)).catch((err) => res.status(500).json(err));
});
router.post('/reorder/', artificiallyDelay_1.default, auth_1.verifyJWT, (req, res) => {
    const reorderedTodos = req.body.todos;
    const newlyOrderedTodos = reorderedTodos.map((todoItem) => {
        const { _id, order } = todoItem;
        todoModel_1.todoModel.findByIdAndUpdate(todoItem._id, { order }, { new: true }).then((todo) => todo).catch((err) => false);
    });
    if (newlyOrderedTodos.includes(false)) {
        res.status(500).json("Error updating order");
    }
    else {
        res.status(200).json(newlyOrderedTodos);
    }
});
exports.default = router;
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
