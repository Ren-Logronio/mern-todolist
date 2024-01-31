import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

const port = process.env.PORT || 3000;
const mongodb_host = process.env.MONGODB_HOST || 'localhost'
const mongodb_port = process.env.MONGODB_PORT || 27017
const mongodb_db = process.env.MONGODB_DB || 'mern-todolist-db'

mongoose.connect(`mongodb://${mongodb_host}:${mongodb_port}/${mongodb_db}`).then(() => {
  console.log(`Mongoose connected @ mongodb://${mongodb_host}:${mongodb_port}/${mongodb_db}`);
}).catch((err: Error) => {
  console.log(`Mongoose connection error: ${err.message}`);
});

express()
  .use(cors({ origin: true }))
  .use(express.json())
  .listen( port, () =>
    console.log(`App listening on PORT ${port}`)
  );