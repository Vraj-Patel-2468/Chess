import { FunctionComponent, useEffect, useState } from "react";

export default function Timer( { handleClock } : {handleClock: FunctionComponent} ) {
  const [time, setTime] = useState<{ min: number; sec: number }>({ min: 0, sec: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(({ min, sec }) => {
        sec += 1;
        if (sec >= 60) {
          sec = sec % 60;
          min += 1;
        }
        return { min, sec };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="text-2xl font-semibold mb-4 italic text-white">Queue Started</div>
      <div className="flex flex-row space-x-4 mx-auto">
        <div className="h-12 w-12 text-xl bg-slate-800 text-white flex items-center justify-center rounded-lg shadow-md">
          {time.min < 10 ? `0${time.min}` : time.min}
        </div>
        <div className="h-12 w-12 text-xl bg-slate-800 text-white flex items-center justify-center rounded-lg shadow-md">
          {time.sec < 10 ? `0${time.sec}` : time.sec}
        </div>
      </div>
      <button onClick={handleClock} className="w-[120px] m-4 text-white text-[16px] italic bg-red-600 p-1 rounded-[6px] border-[2px] border-transparent hover:border-blue-700">
          Cancel
        </button>
    </div>
  );
}
