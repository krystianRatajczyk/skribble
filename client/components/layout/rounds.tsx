"use client";

import { useGame } from "@/hooks/use-game-store";
import { socket } from "@/lib/socket";
import React, { useEffect, useState } from "react";

const Rounds = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const { rounds } = useGame();

  useEffect(() => {
    socket.on("next-round", (r) => {
      setCurrentRound(r);
    });

    return () => {
      socket.off("next-round");
      socket.off("game-over");
    };
  }, [socket]);

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
