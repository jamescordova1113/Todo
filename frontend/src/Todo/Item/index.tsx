import { Todo } from "../../types";
import { Bold } from "../../ui";
import { formatTime } from "../../utils";

interface ITodoItem {
  todo: Todo;
}

export const TodoItem = ({ todo }: ITodoItem) => {
  const { description, dueDate, priority } = todo;

  return (
    <div
      style={{
        display: "flex",
        padding: "20px",
        border: "1px solid",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        borderRadius: "8px",
      }}
    >
      <div>
        <Bold>DESC : </Bold>
        {description}
      </div>
      <div>
        <Bold>PRIORITY : </Bold>
        {priority}
      </div>
      <div>
        <Bold>DATE : </Bold>
        {formatTime(dueDate)}
      </div>
    </div>
  );
};
