import { useContext, useEffect, useState } from "react";
import "./App.css";
import moon from "../images/icon-moon.svg";
import sun from "../images/icon-sun.svg";

import { Route, Routes, Link, useLocation } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import { TodoContext } from "./context";
// import {delete} from "../images/icon.cross.svg";
import AllTodos from "./allTodos";
import CompletedTodos from "./CompletedTodos";
import ActiveTodos from "./ActiveTodos";

function App() {
  let { todos, addTodo, theme, toggleTheme, setTodos, setTheme } =
    useContext(TodoContext);
  const [todo, setTodo] = useState("");
  const location = useLocation();
  const isDark = theme === "dark";

  // const Todo = {content:

  const handleSubmitTodo = (e) => {
    e.preventDefault();
    if (!todo.trim()) {
      alert("Please enter a valid todo");
      return;
    }

    const newTodo = {
      id: uuidv4(),
      content: todo.trim(),
      checked: false,
    };

    if (todos.some((item) => item.content === newTodo.content)) {
      alert("This todo already exists. Try adding something new.");
      return;
    }

    addTodo(newTodo); // localStorage is also here
    setTodo("");
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.checked));
  };

  useEffect(() => {
    // Get todos from localStorage
    const storedTodos = localStorage.getItem("todos");
    const todos = storedTodos ? JSON.parse(storedTodos) : [];

    // Get theme from localStorage
    const theme = localStorage.getItem("theme") || "light";

    // Update state with the fetched values
    setTodos(todos);
    console.log(todos);
    setTheme(theme);
    console.log(theme);
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("todos", todos);
  // }, [todos]);

  return (
    <>
      <main
        className={`${
          isDark ? "bg-black" : "bg-gray-200"
        }  min-h-screen text-white relative overflow-y-auto `}
      >
        <div
          className={`w-full -z-20 aspect-[1.8] md:aspect-[5] ${
            isDark ? "todoDarkBg" : "todoLightBg"
          }`}
        />

        <div className="p-4 z-10 absolute top-0 w-full" id="todo-abs-container">
          <div className="md:w-4xl md:mx-auto">
            <div className="flex justify-between mt-10" id="todo-header">
              <h1 className="text-5xl">TODO</h1>

              <button
                className="group"
                onClick={() => {
                  toggleTheme(); // handles localStorage
                }}
                aria-label="Toggle theme"
              >
                <img
                  className="flex group-hover:cursor-pointer"
                  src={isDark ? sun : moon}
                  alt={isDark ? "sun icon" : "moon icon"}
                />
              </button>
            </div>

            <div className="mt-12">
              <form
                onSubmit={handleSubmitTodo}
                className={`w-full flex space-x-3 p-4  rounded-md ${
                  isDark ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div
                  className={`h-6 w-6 flex justify-center items-center rounded-full border ${
                    isDark ? "border" : "border-gray-600"
                  }`}
                ></div>
                <input
                  className={` outline-0 ${
                    isDark
                      ? "placeholder:text-white text-white"
                      : "placeholder:text-black text-black"
                  }`}
                  placeholder="Create a new todo"
                  type="text"
                  value={todo}
                  // value={}
                  onChange={(e) => {
                    setTodo(e.target.value);
                  }}
                />
              </form>

              <p>{theme}</p>

              <div
                className={`${
                  theme == "dark"
                    ? `bg-gray-800 mt-4 rounded-t-md`
                    : `bg-white mt-4 rounded-t-md`
                } shadow-2xl`}
              >
                <Routes>
                  <Route path="/" element={<AllTodos />} />
                  <Route path="active" element={<ActiveTodos />} />
                  <Route path="completed" element={<CompletedTodos />} />
                </Routes>
              </div>

              <div
                className={`text-gray-600 px-4 py-4
                flex justify-between rounded-b-md shadow-2xl
                ${isDark ? `bg-gray-800` : `bg-white`}
                ${todos.length ? `flex` : `hidden`}

                 ${
                   (!todos.filter((todo) => !todo.checked).length &&
                     location.pathname === "/active") ||
                   (!todos.filter((todo) => todo.checked).length &&
                     location.pathname === "/completed")
                     ? "rounded-t-md"
                     : ""
                 }
              `}
              >
                <p>
                  {todos.filter((todo) => !todo.checked).length} Item(s) left
                </p>

                <div className={`md:flex hidden md:gap-4`}>
                  <Link
                    className={`focus:text-blue-700 ${
                      location.pathname === "/" ? "text-blue-700 font-bold" : ""
                    }`}
                    to="/"
                  >
                    All
                  </Link>
                  <Link
                    className={`focus:text-blue-700 ${
                      location.pathname === "/active"
                        ? "text-blue-700 font-bold"
                        : ""
                    }`}
                    to="/active"
                    replace={true}
                  >
                    Active
                  </Link>
                  <Link
                    className={`focus:text-blue-700 ${
                      location.pathname === "/completed"
                        ? "text-blue-700 font-bold"
                        : ""
                    }`}
                    to="/completed"
                    replace
                  >
                    Completed
                  </Link>
                </div>
                <button
                  onClick={() => {
                    handleClearCompleted();
                  }}
                >
                  clear completed
                </button>
              </div>

              <div
                className={`flex md:hidden justify-center gap-2 rounded-md mt-12 px-4 py-4 ${
                  isDark ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
              >
                <Link
                  className={`focus:text-blue-700 ${
                    location.pathname === "/" ? "text-blue-700 font-bold" : ""
                  }`}
                  to="/"
                >
                  All
                </Link>
                <Link
                  className={`focus:text-blue-700 ${
                    location.pathname === "/active"
                      ? "text-blue-700 font-bold"
                      : ""
                  }`}
                  to="/active"
                  replace
                >
                  Active
                </Link>
                <Link
                  className={`focus:text-blue-700 ${
                    location.pathname === "/completed"
                      ? "text-blue-700 font-bold"
                      : ""
                  }`}
                  to="/completed"
                  replace
                >
                  Completed
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
