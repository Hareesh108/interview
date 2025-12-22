import { useEffect, useState } from "react";

function BasicDebounce() {
  const [params, setParams] = useState("");
  const [debounceText, setDebounceText] = useState("");

  console.log("params:", params);
  console.log("debounceText:", debounceText);

  const fetch = Promise.resolve("Success");
  // const fetch = Promise.reject(new Error("Error"));

  const fetchMe = async (p?: string) => {
    console.log("params:", p);

    try {
      const res = await fetch;
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (debounceText === "") {
      fetchMe();
    } else {
      fetchMe(debounceText);
    }
  }, [debounceText]);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounceText(params);
    }, 4000);

    console.log("setTimeoutID:", id);

    return () => clearTimeout(id);
  }, [params]);

  return (
    <div className="w-xl m-auto mt-40">
      <div className="flex flex-col gap-2 ">
        <label
          htmlFor="search"
          className="text-center font-bold text-lg hover:border-pink-400"
        >
          Testing Basic Debounce
        </label>
        <input
          name="search"
          className="border p-1"
          onChange={(e) => setParams(e.target.value)}
        ></input>
      </div>
    </div>
  );
}

export default BasicDebounce;
