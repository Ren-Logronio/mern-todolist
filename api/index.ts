import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.listen(process.env.PORT, () =>
  console.log(`App listening on PORT ${process.env.PORT}`)
);
