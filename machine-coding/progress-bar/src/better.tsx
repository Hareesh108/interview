import { useEffect, useState } from "react";

function Better() {
  const [text, setText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [view, setView] = useState(false);
  const [cache, setCache] = useState({});
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!text) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      if (cache[text]) {
        setSearchResult(cache[text]);
        return;
      }

      try {
        const res = await fetch(
          "https://dummyjson.com/recipes/search?q=" + text
        );
        const json = await res.json();
        setSearchResult(json?.recipes || []);
        setCache((prev) => ({ ...prev, [text]: json?.recipes || [] }));
      } catch (e) {
        console.error(e);
      }
    };

    const timer = setTimeout(fetchApi, 500);

    return () => clearTimeout(timer);
  }, [text]); // ❗ remove cache from dependency

  // 🔽 Keyboard navigation
  const handleKeyDown = (e) => {
    if (!view || searchResult.length === 0) return;

    if (e.key === "ArrowDown") {
      setActiveIndex((prev) =>
        prev < searchResult.length - 1 ? prev + 1 : prev
      );
    }

    if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      selectItem(searchResult[activeIndex]);
    }
  };

  // ✅ Selection handler
  const selectItem = (item) => {
    setText(item.name);
    setView(false);
    setActiveIndex(-1);
    console.log("Selected item:", item);
  };

  return (
    <div className="max-w-xl mx-auto mt-20">
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setActiveIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setView(true)}
        onBlur={() => setTimeout(() => setView(false), 150)} // allow click
        className="border-2 w-full p-2"
        placeholder="Search recipes..."
      />

      {view && searchResult.length > 0 && (
        <div className="border max-h-72 overflow-y-auto">
          {searchResult.map((item, index) => (
            <div
              key={item.id}
              onMouseDown={() => selectItem(item)}
              className={`px-2 py-1 cursor-pointer ${
                index === activeIndex
                  ? "bg-blue-300"
                  : "hover:bg-gray-200"
              }`}
            >
              {item?.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Better;
