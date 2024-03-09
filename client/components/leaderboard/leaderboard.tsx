import { useMembers } from "@/hooks/use-member-store";
import React from "react";
import LeaderboardItem from "./leaderboard-item";
import { useUser } from "@/hooks/use-user-store";
import { useGame } from "@/hooks/use-game-store";

const LeaderBoard = () => {
  const { user } = useUser();
  const { currentDrawer, hasGameStarted } = useGame();
  const { members } = useMembers();
  
  return (
    <div className="flex flex-col items-center justify-start flex-1 overflow-scroll no-scrollbar w-[300px] ">
      <p className="font-semibold text-xl mt-3">Leaderboard</p>
      {members.length > 0 && (
        <div className="mt-3 dark:border-[#1e293b] border-[#dde9f9] border-[1px] rounded-md overflow-hidden overflow-y-auto no-scrollbar w-full">
          {members?.map((member, index) => (
            <LeaderboardItem
              key={member.id}
              index={index + 1}
              member={member}
              isOwner={member.id === user?.id}
              isDrawer={member.id === currentDrawer?.id && hasGameStarted}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaderBoard;
