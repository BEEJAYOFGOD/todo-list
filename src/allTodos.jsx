import { useContext } from "react";
import { TodoContext } from "./context";
import Todo from "./todo";

const AllTodos = () => {
  const { todos, toggleTodo, deleteTodo, theme } = useContext(TodoContext);

  return (
    <>
      {todos.map((todo) => (
        <Todo
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          theme={theme}
        />
      ))}
    </>
  );
};

export default AllTodos;
