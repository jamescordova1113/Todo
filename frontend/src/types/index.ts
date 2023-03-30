export interface Todo {
  id: number;
  description: string;
  dueDate: number;
  priority: number;
}

export interface Filter {
  description?: string;
  priority?: number;
}
