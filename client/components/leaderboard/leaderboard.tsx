import { useMembers } from "@/hooks/use-member-store";
import React from "react";
import LeaderboardItem from "./leaderboard-item";
import { useUser } from "@/hooks/use-user-store";

const LeaderBoard = () => {
  const { members } = useMembers();
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center justify-center flex-1 overflow-scroll no-scrollbar min-w-[300px] ">
      <p className="font-semibold text-xl">Leaderboard</p>
      <div className="mt-3 dark:border-[#1e293b] border-[#dde9f9] border-[1px] rounded-md overflow-hidden overflow-y-auto no-scrollbar">
        {members?.map((member, index) => (
          <LeaderboardItem
            key={member.id}
            index={index + 1}
            member={member}
            isOwner={member.id === user?.id}
          />
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
