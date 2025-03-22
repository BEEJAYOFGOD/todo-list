import { useContext } from "react";
import { TodoContext } from "./context";
import Todo from "./todo";

const CompletedTodos = () => {
  const { todos } = useContext(TodoContext);

  const filteredTodos = todos.filter((todo) => todo.checked);
  return (
    <>
      <div>
        {filteredTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
};

export default CompletedTodos;
