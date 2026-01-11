import { useEffect, useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [search, setSearch] = useState();
  const [view, setView] = useState(false);
  // console.log(search);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await fetch(
          "https://dummyjson.com/recipes/search?q=" + text
        );
        const json = await res.json();
        setSearch(json);
      } catch (e) {
        console.log(e);
      }
    };

    const timer = setTimeout(() => {
      fetchApi();
    }, 300);
    console.log("outer", timer);

    return () => {
      console.log("inner", timer);
      clearTimeout(timer);
    };
  }, [text]);

  return (
    <div className="max-w-xl mx-auto mt-20">
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border-2 w-full"
          onFocus={() => setView(true)}
          onBlur={() => setView(false)}
        />
      </div>

      <div className="border max-h-72 overflow-y-scroll">
        {search?.recipes?.map((item) => (
          <button
            key={item.id}
            className="hover:bg-red-300 block w-full text-start px-1 py-1 cursor-pointer"
            onClick={() => {
              setText(item.name);
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
