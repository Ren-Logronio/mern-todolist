"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const todoRouter_1 = __importDefault(require("./src/routes/todoRouter"));
const listRouter_1 = __importDefault(require("./src/routes/listRouter"));
const authRouter_1 = __importDefault(require("./src/routes/authRouter"));
const port = process.env.PORT || 3000;
const mongodb_host = process.env.MONGODB_HOST || 'localhost';
const mongodb_port = process.env.MONGODB_PORT || 27017;
const mongodb_db = process.env.MONGODB_DB || 'mern-todolist-db';
// mongoose.connect(`mongodb://${mongodb_host}:${mongodb_port}/${mongodb_db}`).then(() => { 
//   console.log(`Mongoose connected @ mongodb://${mongodb_host}:${mongodb_port}/${mongodb_db}`);
// }).catch((err: Error) => {
//   console.log(`Mongoose connection error: ${err.message}`);
// });
mongoose_1.default.connect(`mongodb+srv://Ren-logronio:QJcy2TU1Udi9z9oN@cluster0.46h8obk.mongodb.net/mern-todolist-db`).then(() => {
    console.log(`Mongoose connected`);
}).catch((err) => {
    console.log(`Mongoose connection`);
});
(0, express_1.default)()
    .use((0, cors_1.default)({ origin: true }))
    .use(express_1.default.json())
    .use('/', (req, res) => res.send('Welcome to the MERN-TodoList API'))
    .use('/todo', todoRouter_1.default)
    .use('/list', listRouter_1.default)
    .use('/auth', authRouter_1.default)
    .listen(port, () => console.log(`App listening on PORT ${port}`));
