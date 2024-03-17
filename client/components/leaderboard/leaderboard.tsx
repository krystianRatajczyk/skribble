import { useMembers } from "@/hooks/use-member-store";
import React, { useEffect } from "react";
import LeaderboardItem from "./leaderboard-item";
import { useUser } from "@/hooks/use-user-store";
import { useGame } from "@/hooks/use-game-store";

const LeaderBoard = () => {
  const { user } = useUser();
  const { currentDrawer, hasGameStarted, password } = useGame();
  const { members, setMembers } = useMembers();

  members.sort((a, b) => {
    return b.points - a.points;
  });

  let prevPoints = -1;
  let prevIndex = -1;

  return (
    <div className="flex flex-col items-center justify-start flex-1 overflow-scroll no-scrollbar w-[300px] ">
      <p className="font-semibold text-xl mt-3">Leaderboard</p>
      {members.length > 0 && (
        <div className="mt-3 dark:border-[#1e293b] border-[#dde9f9] border-[1px] rounded-md overflow-hidden overflow-y-auto no-scrollbar w-full">
          {members?.map((member, index) => {
            const samePointsAsPrev = member.points === prevPoints;
            const currentIndex = samePointsAsPrev ? prevIndex : index + 1;
            prevPoints = member.points;
            prevIndex = currentIndex;

            return (
              <LeaderboardItem
                key={member.id}
                place={currentIndex}
                index={index}
                member={member}
                isOwner={member.id === user?.id}
                isDrawer={
                  member.id === currentDrawer?.id &&
                  hasGameStarted &&
                  password !== ""
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LeaderBoard;
