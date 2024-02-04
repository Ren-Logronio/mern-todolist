import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import todoRouter from "./src/routes/todoRouter"
import listRouter from "./src/routes/listRouter"
import authRouter from "./src/routes/authRouter"

const port = process.env.PORT || 3000;
const mongodb_host = process.env.MONGODB_HOST || 'localhost'
const mongodb_port = process.env.MONGODB_PORT || 27017
const mongodb_db = process.env.MONGODB_DB || 'mern-todolist-db'

// mongoose.connect(`mongodb://${mongodb_host}:${mongodb_port}/${mongodb_db}`).then(() => { 
//   console.log(`Mongoose connected @ mongodb://${mongodb_host}:${mongodb_port}/${mongodb_db}`);
// }).catch((err: Error) => {
//   console.log(`Mongoose connection error: ${err.message}`);
// });

mongoose.connect(`mongodb+srv://Ren-logronio:QJcy2TU1Udi9z9oN@cluster0.46h8obk.mongodb.net/mern-todolist-db`).then(() => { 
  console.log(`Mongoose connected`);
}).catch((err: Error) => {
  console.log(`Mongoose connection`);
});

express()
  .use(cors({ origin: true }))
  .use(express.json())
  .use('/', (req, res) => res.send('Welcome to the MERN-TodoList API'))
  .use('/todo', todoRouter)
  .use('/list', listRouter)
  .use('/auth', authRouter)
  .listen( port, () =>
    console.log(`App listening on PORT ${port}`)
  );