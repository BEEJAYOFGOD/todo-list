import { useContext } from "react";
import { TodoContext } from "./context";
import Todo from "./todo";
import Dnd from "./DND";
import useMemoList from "./useMemoList";

const CompletedTodos = () => {
  const { todos } = useContext(TodoContext);

  const filteredTodos = todos.filter((todo) => todo.checked);

  const memoizedfilteredTodos = useMemoList({ todos: filteredTodos });

  return <Dnd>{memoizedfilteredTodos}</Dnd>;
};

export default CompletedTodos;
