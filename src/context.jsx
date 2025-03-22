/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState("light");

  const updateTodoStorage = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const addTodo = (newTodo) => {
    setTodos((prev) => {
      let newTodos = [...prev, newTodo];
      updateTodoStorage(newTodos);

      return newTodos;
    });
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id != id));
  };

  const toggleTodo = (id) => {
    setTodos((todos) => {
      let newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      );

      updateTodoStorage(newTodos);

      return newTodos;
    });
  };

  const toggleTheme = () => {
    setTheme((theme) => {
      let newTheme;
      if (theme == "dark") {
        newTheme = "light";
      } else {
        newTheme = "dark";
      }

      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        theme,
        addTodo,
        deleteTodo,
        toggleTodo,
        updateTodoStorage,
        setTheme,
        toggleTheme,
        setTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
