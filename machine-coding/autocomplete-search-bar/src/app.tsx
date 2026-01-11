import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [search, setSearch] = useState("");
  console.log(search);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await fetch(
          "https://dummyjson.com/recipes/search?q=Margherita"
        );
        const json = await res.json();
        setSearch(json);
      } catch (e) {
        console.log(e);
      }
    };
    fetchApi();
  }, []);

  return (
    <div>
      <div></div>
    </div>
  );
}

export default App;
