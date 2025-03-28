import { useContext } from "react";
import { TodoContext } from "./context";
import Todo from "./todo";
import Dnd from "./DND";
import useMemoList from "./useMemoList";

const CompletedTodos = () => {
  const { todos } = useContext(TodoContext);

  const filteredTodos = todos.filter((todo) => todo.checked);

  const memoizedfilteredTodos = useMemoList({ todos: filteredTodos });

  if (filteredTodos.length === 0) {
    return (
      <div className="h-24 flex justify-center items-center text-dark-grayish-blue border-b border-dark-grayish-blue">
        <p>No completed todos available</p>
      </div>
    );
  }

  return <Dnd>{memoizedfilteredTodos}</Dnd>;
};

export default CompletedTodos;
