import { useCallback, useEffect, useRef, useState } from "react";

export default function BasicThrottle() {
  const previousTime = useRef(0);

  const handleScroll = () => {
    console.log("Scrolling...");

    const throttle = 250
    

    
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="w-xl m-auto mt-40 h-dvh">
        <div className="flex flex-col gap-2 text-center">
          Testing Throttle (Single Component)
        </div>
      </div>
      <div className="w-xl m-auto mt-40 h-dvh text-center">
        <div className="flex flex-col gap-2">
          Testing Throttle (Single Component)
        </div>
      </div>
      <div className="w-xl m-auto mt-40 h-dvh text-center">
        <div className="flex flex-col gap-2">
          Testing Throttle (Single Component)
        </div>
      </div>
    </>
  );
}
