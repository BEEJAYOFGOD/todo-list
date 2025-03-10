import { useContext, useState } from "react";
import { TodoContext } from "TodoContext";

const TodoList = () => {
  const { todos, addToTodo, handleDelete } = useContext(TodoContext);
  const [input, setInput] = useState("");

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => addToTodo({ text: input, checked: false })}>
        Add Todo
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
