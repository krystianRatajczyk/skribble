import { useGame } from "@/hooks/use-game-store";
import { User } from "@/types/type";
import React, { useEffect, useState } from "react";

interface RoundOverProps {
  users: User[];
}

const RoundOver = ({ users }: RoundOverProps) => {
  const { setPassword, password, setRoundState } = useGame();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPassword(null);
      setRoundState(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex items-center justify-center bg-[#4e4e4e59] w-full h-full text-black">
      <div className="min-w-[400px] rounded-md px-5 py-3 flex flex-col items-center gap-3">
        <p className="text-center font-semibold text-[30px] ">
          The word was <span className="font-bold">{password}</span>
        </p>

        <div className="w-full">
          {users.map((user) => (
            <div className="w-full flex items-center justify-between">
              <span className="font-semibold text-[20px]">{user.name}</span>{" "}
              <span
                className={`font-bold text-[19px] ${
                  user.points > 0 ? "text-emerald-600" : "text-red-400"
                }`}
              >
                {user.points > 0 && "+"}
                {user.points}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoundOver;
