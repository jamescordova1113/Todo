import { Todo } from "../types";

export const generateRandomTodo = (id: number): Todo => {
  const description = Math.random().toString(36).substring(2, 15);
  const dueDate = new Date(Date.now() + Math.floor(Math.random() * 604800000));
  const priority = Math.floor(Math.random() * 10) + 1;

  return { id, description, dueDate, priority };
};
