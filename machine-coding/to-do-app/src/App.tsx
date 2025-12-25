import { useState, type ChangeEvent } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addTodo = (): void => {
    if (!input.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  };

  const toggleTodo = (id: number): void => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number): void => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>📝 TypeScript Todo App</h2>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Add a task"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul style={{ marginTop: 20 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: 8 }}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                cursor: "pointer",
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>

            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: 10 }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
