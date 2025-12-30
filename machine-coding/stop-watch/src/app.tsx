import { useEffect, useRef, useState } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  console.log(time);
  
  

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
    console.log(">>>>>>",intervalRef.current);
    

    return () => {
      
      console.log("Hi");
      if (intervalRef.current) {
        console.log("bye");
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${minutes}:${seconds.toString().padStart(2, "0")}:${milliseconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-md rounded-2xl bg-slate-950 p-8 shadow-xl">
        <h1 className="text-center text-5xl font-mono font-bold text-white tracking-widest">
          {formatTime(time)}
        </h1>

        <div className="mt-8 flex justify-between gap-4">
          <button
            onClick={() => setIsRunning(true)}
            className="flex-1 rounded-lg bg-emerald-500 px-4 py-3 text-white font-semibold hover:bg-emerald-600 active:scale-95 transition"
          >
            Start
          </button>

          <button
            onClick={() => setIsRunning(false)}
            className="flex-1 rounded-lg bg-amber-500 px-4 py-3 text-white font-semibold hover:bg-amber-600 active:scale-95 transition"
          >
            Stop
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setTime(0);
            }}
            className="flex-1 rounded-lg bg-rose-500 px-4 py-3 text-white font-semibold hover:bg-rose-600 active:scale-95 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
