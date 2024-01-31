import express from "express";
import cors from "cors";
import helmet from "helmet";
import { database } from "./src/app/database";
import { auth } from "./src/app/auth"; 

const port = process.env.PORT || 3000;

express()
  .use(cors({ origin: true }))
  .use(express.json())
  .listen( port, () =>
    console.log(`App listening on PORT ${port}`)
  );