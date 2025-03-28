import { useContext } from "react";
import { TodoContext } from "./context";

import Dnd from "./DND";
import useMemoList from "./useMemoList";

const AllTodos = () => {
  const { todos } = useContext(TodoContext);

  // Optional: Add keyboard support for accessibility

  const memoizedTodoList = useMemoList({ todos });

  if (todos.length === 0) {
    return (
      <div className="h-24 flex justify-center items-center">
        <p>No todos available</p>
      </div>
    );
  }

  return (
    <>
      <Dnd>{memoizedTodoList}</Dnd>
    </>
  );
};

export default AllTodos;
