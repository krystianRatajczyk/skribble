"use client";

import { useGame } from "@/hooks/use-game-store";
import { useMembers } from "@/hooks/use-member-store";
import { socket } from "@/lib/socket";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const Timer = () => {
  const { roomId } = useParams();
  const { currentDrawer, setRoundState, drawtime, winners, time, setTime } =
    useGame();
  const { members } = useMembers();

  const roundOver = () => {
    socket.emit(
      "end-round",
      roomId,
      currentDrawer,
      winners.length,
      members.length - 1
    );

    setRoundState(false);
  };

  useEffect(() => {
    setTime(drawtime);
  }, [drawtime]);

  useEffect(() => {
    socket.on("reduce-time", (t) => setTime(t));
  }, [socket]);

  useEffect(() => {
    if (time === 0) {
      roundOver();
    }
  }, [time]);

  useEffect(() => {
    //everyone guessed tne word
    if (
      members.length > 0 &&
      winners.length > 0 &&
      winners.length === members.length - 1
    ) {
      roundOver();
    }
  }, [winners]);

  if (!drawtime) {
    return null;
  }

  return (
    <div className="w-10 h-10 rounded-full dark:bg-[#091125]  border-[2px] dark:border-[#1e293b] border-[#dde9f9] flex items-center justify-center font-semibold">
      {time}
    </div>
  );
};

export default Timer;
