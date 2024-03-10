"use client";

import { useGame } from "@/hooks/use-game-store";
import React, { useEffect, useState } from "react";

const Timer = () => {
  const { drawtime, password } = useGame();
  const [time, setTime] = useState(drawtime);

  useEffect(() => {
    setTime(drawtime);
  }, [drawtime]);

  useEffect(() => {
    if (password && drawtime) {
      const interval = setInterval(() => {
        setTime((prev) => {
          if (prev) return prev - 1;
          else return prev;
        });
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setTime(drawtime);
    }
  }, [password]);

  useEffect(() => {
    if (time === 0) {
      //game over
    }
  }, [time]);

  if (!drawtime) {
    return null;
  }

  return (
    <div className="w-10 h-10 rounded-full bg-[#091125] border-[2px] dark:border-[#1e293b] border-[#dde9f9] flex items-center justify-center font-semibold">
      {time}
    </div>
  );
};

export default Timer;
