import { useEffect, useRef, useState } from "react";
import BasicDebounce from "./components/debounce/basic";
import OptimizeDebounce from "./components/debounce/optimize";
import BasicThrottle from "./components/throttle/basic";

const useDebounce = (text: string, time: number) => {
  const [myText, setMyText] = useState("");
  useEffect(() => {
    const id = setTimeout(() => {
      setMyText(text);
    }, time);

    return () => clearTimeout(id);
  }, [text, time]);

  return myText;
};

const useThrottle = (text: number, time: number) => {
  const [myThrottleText, setMyThrottleText] = useState(0);

  const lastRun = useRef(0);

  useEffect(() => {
    const now = Date.now();

    if (now - lastRun.current >= time) {
      setMyThrottleText(text);
      lastRun.current = now;
    }
  }, [text, time]);

  return myThrottleText;
};

function App() {
  // const [myText, setMyText] = useState(0);

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setMyText((prev) => prev + 1);
  //   }, 1000);

  //   return () => clearInterval(id);
  // }, []);

  // const throttled = useThrottle(myText, 4000);

  // console.log("original:", myText, "throttled:", throttled);

  return (
    <>
      <BasicDebounce />
      {/* <OptimizeDebounce /> */}
      {/* <BasicThrottle/> */}
    </>
  );
}

export default App;
