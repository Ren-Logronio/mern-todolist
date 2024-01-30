import express from "express";
import cors from "cors";
import helmet from "helmet";
import { database } from "./src/app/database";

const port = process.env.PORT || 3000;
const appOrigin = process.env.authConfig || `http://localhost:${port}`;


express()
  .use(cors({ origin: true }))
  .use(express.json())
  .listen(process.env.PORT, () =>
    console.log(`App listening on PORT ${process.env.PORT}`)
  );