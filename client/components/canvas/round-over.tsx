import { useGame } from "@/hooks/use-game-store";
import { useUser } from "@/hooks/use-user-store";
import { socket } from "@/lib/socket";
import { User } from "@/types/type";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

interface RoundOverProps {
  users: User[];
}

const RoundOver = ({ users }: RoundOverProps) => {
  const { roomId } = useParams();
  const { user } = useUser();
  const {
    password,
    drawtime,
    currentDrawer,
  } = useGame();

  useEffect(() => {
    const timeout = setTimeout(() => {
      user?.id === currentDrawer?.id &&
        socket.emit("restart-round", roomId, drawtime);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  if (users.length === 0) {
    return;
  }

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
