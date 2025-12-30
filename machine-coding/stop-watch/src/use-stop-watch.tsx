import { useEffect, useRef, useState } from "react";

export function useStopwatch(interval = 10) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + interval);
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, interval]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / interval);

    return `${minutes}:${seconds.toString().padStart(2, "0")}:${milliseconds
      .toString()
      .padStart(2, "0")}`;
  };

  return {
    time,
    isRunning,
    start,
    stop,
    reset,
    formatTime,
  };
}
