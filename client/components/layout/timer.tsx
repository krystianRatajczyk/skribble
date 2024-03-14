"use client";

import { useGame } from "@/hooks/use-game-store";
import { useMembers } from "@/hooks/use-member-store";
import { socket } from "@/lib/socket";
import { User } from "@/types/type";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Timer = () => {
  const { roomId } = useParams();
  const {
    currentDrawer,
    setRoundState,
    drawtime,
    password,
    winners,
    time,
    setTime,
  } = useGame();
  const { members, setMembers } = useMembers();
  const [count, setCount] = useState(false);

  const roundOver = () => {
    setCount(false);
    setRoundState(false);
    socket.emit(
      "get-points",
      roomId,
      currentDrawer,
      winners.length,
      members.length - 1
    );
  };

  useEffect(() => {
    setTime(drawtime);
  }, [drawtime]);

  useEffect(() => {
    setCount(password !== null);
  }, [password]);

  useEffect(() => {
    if (count && drawtime) {
      const interval = setInterval(() => {
        setTime((prev) => (typeof prev === "number" ? prev - 1 : null));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [count, drawtime]);

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

  useEffect(() => {
    socket.on("got-points", (members: User[]) => {
      setMembers(members);
    });

    return () => {
      socket.off("got-points");
    };
  }, [socket]);

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
