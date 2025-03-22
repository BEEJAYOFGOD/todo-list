import { useContext } from "react";
import { TodoContext } from "./context";
import Todo from "./todo";

const AllTodos = () => {
  const { todos } = useContext(TodoContext);

  return (
    <>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </>
  );
};

export default AllTodos;
