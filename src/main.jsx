import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TodoProvider } from "./context.jsx";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TodoProvider>
      <Router>
        <App />
      </Router>
    </TodoProvider>
  </StrictMode>
);
