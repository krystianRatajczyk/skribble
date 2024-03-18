import React from "react";
import Rounds from "./rounds";
import Password from "./password";
import Timer from "./timer";
import { useGame } from "@/hooks/use-game-store";

const Header = () => {
  const { password, hasGameStarted } = useGame();

  return (
    <div className="h-[70px] dark:bg-[#020817] border-b-[1px] dark:border-[#1e293b] border-[#dde9f9]">
      <div className="flex items-center justify-between flex-1 px-[50px] h-full">
        {!(password && !hasGameStarted) && (
          <>
            <Timer />
            <Password />
            <Rounds />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
