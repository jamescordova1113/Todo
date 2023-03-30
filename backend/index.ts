import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { initializeDb } from "./src/db";
import { todoRouter } from "./src/router/todo";
import { PORT } from "./src/utils/constants";

const app = express();
app.use(cors());
app.use(json());
app.use("/todo", todoRouter);

const initializeServer = () => {
  initializeDb();
  app.listen(PORT, () => {
    console.log(`connected on port ${PORT}`);
  });
};

initializeServer();
