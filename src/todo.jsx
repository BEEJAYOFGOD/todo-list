import check from "../images/icon-check.svg";
import deleteIcon from "../images/icon-cross.svg";
import { TodoContext } from "./context";
import { useContext } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Todo = ({ todo }) => {
  const { toggleTodo, theme, deleteTodo } = useContext(TodoContext);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: String(todo.id) });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleToggle = (e) => {
    // Stop propagation to prevent drag handlers from capturing this event
    e.stopPropagation();
    console.log("Toggle clicked for todo:", todo.id);
    toggleTodo(todo.id);
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onClick={() => {
        alert("hey");
      }}
      className={`flex justify-between space-x-4 md:space-x-24 p-4 group border-b-1 ${
        theme === "light" ? "border-b-dark-grayish-blue" : "border-b-gray-400 "
      }`}
    >
      <div role="button" className="flex space-x-4 flex-1 cursor-pointer">
        <div
          className={`h-6 aspect-square flex justify-center items-center rounded-full ${
            todo.checked
              ? "bg-blue-500 bg-gradient-to-br from-blue-500 via-blue-500 to-purple-500"
              : "border"
          } ${
            theme === "dark" ? "border-gray-600" : "border-light-grayish-blue"
          }`}
          onClick={handleToggle}
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
