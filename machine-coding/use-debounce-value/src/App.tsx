import { useState, useEffect } from "react";
import "./App.css";
import useDebounceValue from "./use-debounce-value";

function App() {
  const [q, setQ] = useState("");
  const debouncedQ = useDebounceValue(q, 400);

  useEffect(() => {
    if (!debouncedQ) return;

    // run API search with async/await
    const search = async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedQ)}`
        );
        const data = await res.json();
        console.log(data); 
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    search();
  }, [debouncedQ]);

  return (
    <input
      value={q}
      onChange={(e) => setQ(e.target.value)}
      placeholder="Search..."
    />
  );
}

export default App;
