"use client";

import { useGame } from "@/hooks/use-game-store";
import React, { useState } from "react";

const Rounds = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const { rounds } = useGame();

  if (!rounds) {
    return null;
  }

  return (
    <div className="px-4 py-1 text-[18px] font-bold flex gap-x-2 items-center border-[2px] rounded-lg">
      <span>{currentRound}</span>
      <span>/</span>
      <span>{rounds}</span>
    </div>
  );
};

export default Rounds;
