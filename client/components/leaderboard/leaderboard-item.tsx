import { User } from "@/types/type";
import React from "react";

const LeaderboardItem = ({
  member,
  index,
  isOwner,
}: {
  member: User;
  index: number;
  isOwner: boolean;
}) => {
  return (
    <div
      className={`min-w-[300px] flex items-center 
    justify-start px-3 py-1.5 gap-x-3 h-fit ${
      index % 2 == 1 ? "bg-transparent" : "bg-[#101022]"
    }`}
    >
      <p className="flex flex-start flex-row -mt-4 font-semibold ">
        #{index}
      </p>

      <div className="flex flex-col ">
        <span
          className={`${
            isOwner ? "text-blue-500" : "text-white"
          } font-semibold text-lg `}
        >
          {member.name} {isOwner && "(You)"}
        </span>
        <p className="font-semibold text-sm">0 points</p>
      </div>
    </div>
  );
};

export default LeaderboardItem;
