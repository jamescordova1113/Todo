import { db } from "../db";
import { Todo } from "../types";
import * as TodoService from "../services/todo";
import { Request, Response } from "express";

interface TodoRequestQuery {
  page?: number;
  limit?: number;
  description?: string;
  priority?: number;
}

interface IGetTodosResponse {
  todos: Todo[];
  count: number;
}

export const getTodos = async (
  req: Request,
  res: Response<IGetTodosResponse>
) => {
  const todoService = new TodoService.SqliteTodoService(db);
  const { description, priority, limit, page } = req.query as TodoRequestQuery;
  const todosResponse = await todoService.getTodos(
    {
      description,
      priority,
    },
    { limit, page }
  );
  res.json(todosResponse);
};
