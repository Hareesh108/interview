import  { useEffect, useState } from "react";

export default function useDebounceValue<T>(value: T, wait = 300) {
  const [debounce, setDebounce] = useState<T>(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounce(value), wait);

    return () => clearTimeout(id);
  }, [value, wait]);

  return debounce;
}
