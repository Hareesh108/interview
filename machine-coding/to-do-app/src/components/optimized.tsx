import { Check, Trash } from "lucide-react";
import { useState, useCallback } from "react";

type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
};

export default function Optimized() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = useCallback(() => {
    const value = text.trim();
    if (!value) return;

    setTodos((prev) => [
      {
        id: Date.now(),
        title: value,
        isCompleted: false,
      },
      ...prev,
    ]);

    setText("");
  }, [text]);

  const handleToggle = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      )
    );
  }, []);

  const handleRemove = useCallback((id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-5 space-y-4">
        <h1 className="text-xl font-semibold text-gray-800">Todo List</h1>

        {/* Input */}
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Add a task..."
            className="flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAdd}
            disabled={!text.trim()}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50 hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        {/* List */}
        {todos.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">
            No tasks yet ✨
          </p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between rounded-md border px-3 py-2"
              >
                <span
                  className={`text-sm ${
                    todo.isCompleted
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {todo.title}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggle(todo.id)}
                    className="rounded p-1 text-green-600 hover:bg-green-50"
                    aria-label="Toggle complete"
                  >
                    <Check size={18} />
                  </button>

                  <button
                    onClick={() => handleRemove(todo.id)}
                    className="rounded p-1 text-red-600 hover:bg-red-50"
                    aria-label="Delete"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
