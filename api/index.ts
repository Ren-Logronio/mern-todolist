import dotenv from 'dotenv';

dotenv.config();

import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import todoRouter from "./src/routes/todoRouter"
import listRouter from "./src/routes/listRouter"
import authRouter from "./src/routes/authRouter"
const port = process.env.PORT || 3000;


// const mongodb_host = process.env.MONGODB_HOST || 'localhost'
// const mongodb_port = process.env.MONGODB_PORT || 27017
// const mongodb_db = process.env.MONGODB_DB || 'mern-todolist-db'
// mongoose.connect(`mongodb://${mongodb_host}:${mongodb_port}/${mongodb_db}`).then(() => { 
//   console.log(`Mongoose connected @ mongodb://${mongodb_host}:${mongodb_port}/${mongodb_db}`);
// }).catch((err: Error) => {
//   console.log(`Mongoose connection error: ${err.message}`);
// });

mongoose.connect(`mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASS}@${process.env.ATLAS_CLUSTER}/${process.env.ATLAS_DB}`).then(() => { 
  console.log(`Mongoose connected @ mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASS}@${process.env.ATLAS_CLUSTER}/${process.env.ATLAS_DB}`);
}).catch((err: Error) => {
  console.log(`Mongoose connection error: ${err.message}`);
});

express()
  .use(cors({ origin: true }))
  .use(express.json())
  .use('/test', (res: any, req: any) => req.end('test works'))
  .use('/todo', todoRouter)
  .use('/list', listRouter)
  .use('/auth', authRouter)
  .listen( port, () =>
    console.log(`App listening on PORT ${port}`)
  );