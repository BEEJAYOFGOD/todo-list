import { useContext } from "react";
import { TodoContext } from "./context";
import Todo from "./todo";

const CompletedTodos = () => {
  const { todos, toggleTodo, deleteTodo, theme } = useContext(TodoContext);

  const filteredTodos = todos.filter((todo) => todo.checked);
  return (
    <>
      <div>
        {filteredTodos.map((todo) => (
          <Todo
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            theme={theme}
          />
        ))}
      </div>
    </>
  );
};

export default CompletedTodos;
