import { Database } from "sqlite3";
import { Todo } from "../types";

interface TodoFilter {
  description?: string;
  priority?: number;
}

interface PaginationOptions {
  page?: number;
  limit?: number;
}

interface TodoService {
  getTodos(
    filter: TodoFilter,
    options: PaginationOptions
  ): Promise<{ todos: Todo[]; count: number }>;
}

export class SqliteTodoService implements TodoService {
  constructor(private db: Database) {}

  async getTotalCount() {}

  async getTodos(
    filter: TodoFilter,
    options: PaginationOptions
  ): Promise<{ todos: Todo[]; count: number }> {
    try {
      const { page = 1, limit = 20 } = options;
      const offset = (page - 1) * limit;
      const queryArgs: any[] = [limit, offset];

      let whereClause = "";

      if (filter.priority !== undefined) {
        if (whereClause !== "") {
          whereClause += " AND ";
        }
        whereClause += "priority = ?";
        queryArgs.unshift(Number(filter.priority));
      }

      if (filter.description !== undefined) {
        whereClause += "description LIKE ?";
        queryArgs.unshift(`%${filter.description}%`);
      }

      let query = "SELECT * FROM todo";
      if (whereClause !== "") {
        query += " WHERE " + whereClause;
      }
      query += " LIMIT ? OFFSET ?";

      const rows = await new Promise<Todo[]>((resolve, reject) => {
        this.db.all(query, queryArgs, (err, rows: Todo[]) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

      const countQuery = `SELECT COUNT(*) AS count FROM todo ${
        whereClause !== "" ? `WHERE ${whereClause}` : ""
      }`;
      const { count } = await new Promise<{ count: number }>(
        (resolve, reject) => {
          this.db.get(
            countQuery,
            queryArgs.slice(0, queryArgs.length - 2),
            (err, row: { count: number }) => {
              if (err) {
                reject(err);
              } else {
                resolve(row);
              }
            }
          );
        }
      );

      return { todos: rows, count };
    } catch (e) {
      return { todos: [], count: 0 };
    }
  }
}
