import { useMemo } from "react";
import TodoList from "./TodoList";

const useMemoList = ({ todos }) => {
  const memoizedTodoList = useMemo(() => {
    return <TodoList todos={todos} />;
  }, [todos]);

  return memoizedTodoList;
};

export default useMemoList;
