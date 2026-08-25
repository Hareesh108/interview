import { useEffect, useRef, useState } from 'react';

export default function Stopwatch1() {
  const [time, setTime] = useState(0);

  const [isRunning, setIsRunning] = useState(false);

  let interval = useRef<any>(null);

  useEffect(() => {
    if (isRunning) {
      interval.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [isRunning]);

  const formatTime = (time) => {
    const min = Math.floor(time / 60000);
    const sec = Math.floor((time % 60000) / 1000);
    const mil = Math.floor((time % 1000) / 10);

    return `${min}:${sec.toString().padStart(2, '0')}: ${mil.toString().padStart(0, '0')}`;
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
