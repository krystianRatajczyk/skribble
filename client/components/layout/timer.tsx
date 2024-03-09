import { useGame } from "@/hooks/use-game-store";
import React from "react";

const Timer = () => {
  const { drawtime } = useGame();

  if (!drawtime) {
    return null;
  }
  
  return (
    <div className="w-10 h-10 rounded-full bg-[#091125] border-[2px] dark:border-[#1e293b] border-[#dde9f9] flex items-center justify-center font-semibold">
      {drawtime}
    </div>
  );
};

export default Timer;
