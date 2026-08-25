import { useEffect, useRef, useState } from 'react';
import BasicDebounce from './components/debounce/basic';
import OptimizeDebounce from './components/debounce/optimize';
import BasicThrottle from './components/throttle/basic';

const useDebounce = (text: string, time: number) => {
  const [myText, setMyText] = useState('');
  useEffect(() => {
    const id = setTimeout(() => {
      setMyText(text);
    }, time);

    return () => clearTimeout(id);
  }, [text, time]);

  return myText;
};

const useThrottle1 = (value: number, delay: number) => {
  const [throttledValue, setThrottledValue] = useState(value);

  const lastRun = useRef(0);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const now = Date.now();
    const remaining = delay - (now - lastRun.current);

    if (remaining <= 0) {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }

      setThrottledValue(value);
      lastRun.current = now;
    } else {
      if (!timeout.current) {
        timeout.current = setTimeout(() => {
          setThrottledValue(value);
          lastRun.current = Date.now();
          timeout.current = null;
        }, remaining);
      }
    }

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [value, delay]);

  return throttledValue;
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
      {/* <BasicDebounce /> */}
      {/* <OptimizeDebounce /> */}
      <BasicThrottle />
    </>
  );
}

export default App;
