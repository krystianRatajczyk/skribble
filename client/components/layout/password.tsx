import { useGame } from "@/hooks/use-game-store";
import { useUser } from "@/hooks/use-user-store";
import React from "react";

const Password = () => {
  const { password, currentDrawer } = useGame();
  const { user } = useUser();

  if (!password) {
    return null;
  }

  return (
    <div className="font-semibold text-xl flex items-center flex-col justify-between h-full py-4">
      <span className="font-normal text-xs">
        {currentDrawer?.id === user?.id ? "Draw this" : "Guess this"}
      </span>
      {currentDrawer?.id === user?.id ? (
        <div>{password}</div>
      ) : (
        <div className="relative ">
          <div className="flex items-center justify-center gap-1">
            {Array.from(password).map((char) => (
              <div className={`w-4 h-[2px] ${char !== " " && "bg-white"}`} />
            ))}
          </div>
          <span className="absolute -right-3 bottom-1 text-[11px]">
            {password.length}
          </span>
        </div>
      )}
    </div>
  );
};

export default Password;
