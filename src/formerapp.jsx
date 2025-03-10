import { useState } from "react";
import "./App.css";
import moon from "../images/icon-moon.svg";
import sun from "../images/icon-sun.svg";
import backgnd from "../images/bg-mobile-dark.jpg";
import check from "../images/icon-check.svg";
import deleteIcon from "../images/icon-cross.svg";
import { v4 as uuidv4 } from "uuid";
// import {delete} from "../images/icon.cross.svg";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState();

  // const Todo = {content:

  const handleSubmitTodo = (e) => {
    e.preventDefault();

    let listOfTodos = todos.map((todo) => todo.content);

    if (!todo.trim()) {
      alert("enter a valid todo");
      return;
    }
    const newTodo = {
      id: uuidv4(),
      content: todo,
      checked: false,
    };

    if (!listOfTodos.includes(newTodo.content)) {
      setTodos([...todos, newTodo]);
      setTodo("");
    } else {
      alert("change yr content");
    }

    console.log(todos);
    // if (newTodo.content ==)
  };

  const handleDelete = (id) => {
    let newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <>
      <main
        className={`bg-black min-h-screen h-max text-white relative border `}
      >
        <div className="w-full border h-48 -z-20">
          <img className="object-cover w-full h-full" src={backgnd} alt="" />
        </div>
        <div className="p-4 z-10 absolute top-0 w-full">
          <div className="flex justify-between">
            <h1 className="text-4xl">TODO</h1>
            <img className="hidden" src={moon} alt="" />
            <button>
              <img src={sun} alt="" />
            </button>
          </div>
          <div className="mt-12">
            <form
              onSubmit={handleSubmitTodo}
              className="w-full flex space-x-3 p-4 bg-gray-800 rounded-md"
            >
              <div
                className={`h-6 w-6 flex justify-center items-center rounded-full border`}
              ></div>
              <input
                className="placeholder:text-white outline-0"
                placeholder="Create a new todo"
                type="text"
                name=""
                value={todo}
                id=""
                // value={}
                onChange={(e) => {
                  setTodo(e.target.value);
                }}
              />
            </form>

            <div className="bg-gray-800 mt-4 rounded-md">
              {todos.map((todo) => (
                <div className="flex justify-between space-x-4 p-4 last:border-b-0 border-b-1">
                  <div className="flex space-x-4">
                    <div
                      className={`h-6 w-6 flex justify-center items-center rounded-full ${
                        todo.checked ? "bg-blue-500 bg-gradient-to-br from-blue-500 via-blue-500 to-purple-500" : "border"
                      }`}
                      onClick={() => {
                        let todoTocheck = todo;
                        setTodos(
                          todos.map((todo) =>
                            todo.id === todoTocheck.id
                              ? {
                                  ...todoTocheck,
                                  checked: !todoTocheck.checked,
                                }
                              : todo
                          )
                        );
                      }}
                    >
                      <img
                        src={check}
                        alt=""
                        className={todo.checked ? "flex" : `hidden`}
                      />
                    </div>
                    <p className={todo.checked ? "line-through" : "bold"}>
                      {todo.content}
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      handleDelete(todo.id);
                    }}
                  >
                    <img src={deleteIcon} alt="" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
