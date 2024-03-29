import { useGame } from "@/hooks/use-game-store";
import { getPasswords } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { socket } from "@/lib/socket";
import { useParams } from "next/navigation";

const ChoosePassword = () => {
  const { hasRoundStarted, setPassword } = useGame();
  const [passwords, setPasswords] = useState<string[]>();
  const { roomId } = useParams();

  useEffect(() => {
    if (hasRoundStarted) {
      setPasswords(getPasswords(3));
    }
  }, [hasRoundStarted]);

  const onClick = (password: string) => {
    socket.emit("change-password", password, roomId);
    setPassword(password);
  };

  return (
    <div className="flex gap-3 items-center justify-center bg-[#d3d3d359] dark:bg-[#35394a] w-full h-full">
      {passwords?.map((password) => (
        <Button
          key={password}
          className="bg-white dark:bg-[#091125] text-[#091125] dark:text-white border-[2px] dark:border-[#1e293b] border-[#dde9f9] px-4 py-2 text-[19px] hover:dark:bg-[#191e2c] hover:bg-[#dfdddd] "
          onClick={() => onClick(password)}
        >
          {password}
        </Button>
      ))}
    </div>
  );
};

export default ChoosePassword;
