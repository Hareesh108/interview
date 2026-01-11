import { useEffect, useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [search, setSearch] = useState();
  const [view, setView] = useState(false);
  const [cache, setCache] = useState({});
  // console.log(search);
  console.log("cache", cache);

  useEffect(() => {
    const fetchApi = async () => {
      if (cache[text]) {
        setSearch(cache[text]);
        return;
      }

      try {
        const res = await fetch(
          "https://dummyjson.com/recipes/search?q=" + text
        );
        const json = await res.json();
        setSearch(json);
        setCache((prev) => ({ ...prev, [text]: json }));
      } catch (e) {
        console.log(e);
      }
    };

    const timer = setTimeout(() => {
      fetchApi();
    }, 500);
    console.log("outer", timer);

    return () => {
      console.log("inner", timer);
      clearTimeout(timer);
    };
  }, [cache, text]);

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

      {view && (
        <div className="border max-h-72 overflow-y-scroll">
          {search?.recipes?.map((item) => (
            <div
              key={item.id}
              className="hover:bg-pink-300 px-1 py-1 cursor-pointer"
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
