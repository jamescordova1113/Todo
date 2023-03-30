import { useScrollToBottom } from "../../hooks/useScrollToBottom";
import { useTodos } from "../../hooks/useTodos";
import { Filters } from "../Filters";
import { TodoItem } from "../Item";

export const TodoList = () => {
  const { todos, filters, isLoading, handleFilterChange, fetchMore } =
    useTodos();
  useScrollToBottom({ handler: fetchMore });

  return (
    <div>
      <h2>Todo List</h2>
      {isLoading ? (
        "...Loading"
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Filters filters={filters} handleFilterChange={handleFilterChange} />
          {todos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </div>
      )}
    </div>
  );
};
