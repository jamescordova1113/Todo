import { Router } from "express";
import * as TodoController from "../controller/todo";
export const todoRouter = Router();

todoRouter.get("/", TodoController.getTodos);
