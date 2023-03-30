import { Database } from "sqlite3";
import { generateRandomTodo } from "../utils";

export const db = new Database("todo.db");

const createTable = () => {
  db.run(`CREATE TABLE IF NOT EXISTS todo (
      id INTEGER PRIMARY KEY,
      description TEXT NOT NULL,
      dueDate DATE,
      priority INTEGER
    )`);
};

const createInitialData = () => {
  db.get(
    "SELECT COUNT(*) AS count FROM todo",
    (err, row: { count?: number }) => {
      if (err) {
        return;
      }
      const rowCount = row.count || 0;
      if (rowCount === 0) {
        for (let i = 0; i < 1000; i++) {
          const todo = generateRandomTodo(i);
          db.run(
            `INSERT INTO todo (id, description, dueDate, priority) VALUES (?, ?, ?, ?)`,
            [todo.id, todo.description, todo.dueDate, todo.priority]
          );
        }
      }
    }
  );
};

export const initializeDb = () => {
  createTable();
  createInitialData();
};
