import check from "../images/icon-check.svg";
import deleteIcon from "../images/icon-cross.svg";
import { TodoContext } from "./context";
import { useContext } from "react";

const Todo = ({ todo }) => {
  const { toggleTodo, theme, deleteTodo, todos, setTodos, updateTodoStorage } =
    useContext(TodoContext);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("todoId", todo.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow drop
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const draggedId = e.dataTransfer.getData("todoId");
    const droppedId = todo.id;

    // Verify we have both IDs
    if (!draggedId || draggedId === droppedId) {
      return; // Exit early if same item or missing data
    }

    const draggedIndex = todos.findIndex((item) => item.id === draggedId);
    const droppedIndex = todos.findIndex((item) => item.id === droppedId);

    // Verify both items exist
    if (draggedIndex === -1 || droppedIndex === -1) {
      console.error("Could not find one or both items");
      return;
    }

    setTodos((prevTodos) => {
      const newTodos = [...prevTodos];
      const [movedItem] = newTodos.splice(draggedIndex, 1);
      newTodos.splice(droppedIndex, 0, movedItem);
      updateTodoStorage(newTodos);
      return newTodos;
    });
  };

  return (
    <div
      key={todo.id}
      draggable="true"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`flex justify-between space-x-4 md:space-x-24 p-4 group ${
        theme === "light"
          ? "border-b-dark-grayish-blue border-b-1"
          : "border-b-gray-400 border-b-1"
      }`}
    >
      <div
        className="flex space-x-4 flex-1 cursor-pointer"
        onClick={() => {
          toggleTodo(todo.id);
        }}
      >
        <div
          className={`h-6 aspect-square flex justify-center items-center rounded-full ${
            todo.checked
              ? "bg-blue-500 bg-gradient-to-br from-blue-500 via-blue-500 to-purple-500"
              : "border"
          } ${
            theme === "dark" ? "border-gray-600" : "border-light-grayish-blue"
          }`}
        >
          <img
            src={check}
            alt="check"
            className={`${todo.checked ? "flex" : "hidden"}`}
          />
        </div>
        <p
          className={`text-justify w-fit ${
            theme === "dark" && !todo.checked ? "text-white" : "text-black"
          } ${todo.checked ? "line-through text-light-grayish-blue" : "bold"}`}
        >
          {todo.content}
        </p>
      </div>
      <div
        className={`${
          todo.checked ? "lg:hidden lg:group-hover:hidden" : "lg:hidden"
        } group-hover:block`}
        onClick={() => {
          deleteTodo(todo.id);
        }}
      >
        <img src={deleteIcon} alt="delete" />
      </div>
    </div>
  );
};

export default Todo;
