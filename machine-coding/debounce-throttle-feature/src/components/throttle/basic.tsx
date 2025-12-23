import { useEffect, useRef } from "react";

export default function ScrollThrottle() {
  const lastCallRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const throttleDelay = 200; // ms

  const handleScroll = () => {
    const now = Date.now();
    const remaining = throttleDelay - (now - lastCallRef.current);

    const execute = () => {
      lastCallRef.current = Date.now();

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      console.log("Scroll Y:", scrollTop);

      // 🔥 Infinite scroll condition
      if (scrollTop + windowHeight >= documentHeight - 200) {
        console.log("Load more data");
      }
    };

    if (remaining <= 0) {
      execute();
    } else if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        execute();
      }, remaining);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div style={{ height: "200vh", padding: "20px" }}>
      <h2>Scroll down 👇</h2>
      <p>Open console to see throttled scroll logs.</p>
    </div>
  );
}
