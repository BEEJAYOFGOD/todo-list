import check from "../images/icon-check.svg";
import deleteIcon from "../images/icon-cross.svg";

const Todo = ({ todo, toggleTodo, deleteTodo, theme }) => {
  return (
    <>
      <div
        className={`flex justify-between space-x-4 md:space-x-24 p-4 group ${
          theme == "dark"
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
            } ${theme == "dark" ? "border-gray-600" : "border-light-grayish-blue"}`}
          >
            <img
              src={check}
              alt=""
              className={`${todo.checked ? "flex" : "hidden"} `}
            />
          </div>
          <p
            className={`text-justify w-fit 
            ${theme === "dark" && !todo.checked ? "text-white" : "text-black"}
            ${todo.checked ? "line-through text-light-grayish-blue" : "bold"}
            
          `}
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
          <img src={deleteIcon} alt="" />
        </div>
      </div>
    </>
  );
};

export default Todo;
