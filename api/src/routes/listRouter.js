"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoListModel_1 = require("../models/todoListModel");
const todoModel_1 = require("../models/todoModel");
const artificiallyDelay_1 = __importDefault(require("../middlewares/artificiallyDelay"));
const auth_1 = require("../app/auth");
const mongodb_1 = require("mongodb");
const router = express_1.default.Router();
// Place routes
router.get('/', artificiallyDelay_1.default, (req, res) => {
    const { user } = req.query;
    const queryObject = req.query.user ? { user: new mongodb_1.ObjectId(String(user)) } : {};
    todoListModel_1.todoListModel.find(queryObject).then((todoList) => { res.status(200).json({ todoList }); }).catch((err) => { res.status(500).json(err); });
});
router.get('/:id/todo/', artificiallyDelay_1.default, auth_1.verifyJWT, (req, res) => {
    const todoListId = req.params.id;
    todoListModel_1.todoListModel.findById(todoListId).populate("todos").then((todoList) => {
        res.status(200).json(todoList.todos);
    }).catch((err) => res.status(500).json(err));
});
router.post('/', artificiallyDelay_1.default, auth_1.verifyJWT, (req, res) => {
    const newTodoList = new todoListModel_1.todoListModel({ name: req.body.name, order: req.body.order, description: req.body.description, user: req.body.user });
    newTodoList.save().then((todoList) => res.status(200).json(todoList)).catch((err) => res.status(500).json(err));
});
router.post('/:id/todo/', artificiallyDelay_1.default, auth_1.verifyJWT, (req, res) => {
    todoListModel_1.todoListModel.findById(req.params.id).then((todoList) => {
        const newTodo = new todoModel_1.todoModel(Object.assign({}, req.body.todo));
        newTodo.save().then((todo) => {
            todoList.todos.push({ _id: todo._id });
            todoList.save().then((todoList) => res.status(200).json(todo)).catch((err) => { throw err; });
        }).catch((err) => { throw err; });
    }).catch((err) => {
        res.status(500).json(err);
    });
});
router.post('/reorder/', artificiallyDelay_1.default, auth_1.verifyJWT, (req, res) => {
    const reOrderedList = req.body.lists;
    const newlyOrderedList = reOrderedList.map((listObject) => {
        const { _id: id, order } = listObject;
        todoListModel_1.todoListModel.findByIdAndUpdate(id, { order }, { new: true }).then((todoList) => {
            return todoList;
        }).catch((err) => {
            return false;
        });
    });
    if (newlyOrderedList.includes(false)) {
        res.status(500).json("Error reordering list");
    }
    else {
        res.status(200).json(newlyOrderedList);
    }
});
router.put('/:id', artificiallyDelay_1.default, auth_1.verifyJWT, (req, res) => {
    const todoListId = req.params.id;
    todoListModel_1.todoListModel.findByIdAndUpdate(todoListId, Object.assign({}, req.body), { new: true }).then((todoList) => res.status(200).json(todoList)).catch((err) => res.status(500).json(err));
});
router.delete('/:id', artificiallyDelay_1.default, auth_1.verifyJWT, (req, res) => {
    const todoListId = req.params.id;
    todoListModel_1.todoListModel.findByIdAndDelete(todoListId).then((todoList) => res.status(200).json(todoList)).catch((err) => res.status(500).json(err));
});
exports.default = router;
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
