"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const todoRouter_1 = __importDefault(require("./src/routes/todoRouter"));
const listRouter_1 = __importDefault(require("./src/routes/listRouter"));
const authRouter_1 = __importDefault(require("./src/routes/authRouter"));
const port = process.env.PORT || 3000;
// const mongodb_host = process.env.MONGODB_HOST || 'localhost'
// const mongodb_port = process.env.MONGODB_PORT || 27017
// const mongodb_db = process.env.MONGODB_DB || 'mern-todolist-db'
// mongoose.connect(`mongodb://${mongodb_host}:${mongodb_port}/${mongodb_db}`).then(() => { 
//   console.log(`Mongoose connected @ mongodb://${mongodb_host}:${mongodb_port}/${mongodb_db}`);
// }).catch((err: Error) => {
//   console.log(`Mongoose connection error: ${err.message}`);
// });
mongoose_1.default.connect(`mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASS}@${process.env.ATLAS_CLUSTER}/${process.env.ATLAS_DB}`).then(() => {
    console.log(`Mongoose connected @ mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASS}@${process.env.ATLAS_CLUSTER}/${process.env.ATLAS_DB}`);
}).catch((err) => {
    console.log(`Mongoose connection error: ${err.message}`);
});
(0, express_1.default)()
    .use((0, cors_1.default)({ origin: true }))
    .use(express_1.default.json())
    .use('/test', (res, req) => req.end('test works'))
    .use('/todo', todoRouter_1.default)
    .use('/list', listRouter_1.default)
    .use('/auth', authRouter_1.default)
    .listen(port, () => console.log(`App listening on PORT ${port}`));
