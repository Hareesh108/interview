import { useEffect, useMemo, useState } from "react";

type Todos = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

const App = () => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [text, setText] = useState<string>();

  const fetchTodos = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const json = await res.json();
      setTodos(json);
    } catch (err) {
      console.log(err);
    }
  };

  const searchToDos = useMemo(() => {
    if (!text) return todos;
    return todos.filter((item) => {
      if (item.title.includes(text)) {
        return true;
      }
      return false;
    });
  }, [text, todos]);

  console.log(searchToDos, ">>>");

  const ontoggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-20">
      <div>
        <input
          type="text"
          name="title"
          className="border-2 mb-4"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th className="border-2 p-2 w-40">Title</th>
            <th className="border-2 p-2 w-10">ID</th>
            <td className="border-2 p-2 w-10">Status</td>
          </tr>
        </thead>
        <tbody>
          {searchToDos.map((todo) => (
            <tr key={todo.id}>
              <td className="border-2 p-2 w-40">{todo.title}</td>
              <td className="border-2 p-2 w-10">{todo.userId}</td>
              <td className="border-2 p-2 w-10">
                <input
                  type="checkbox"
                  name="check"
                  id=""
                  checked={todo.completed}
                  onChange={(e) => {
                    ontoggle(todo.id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
