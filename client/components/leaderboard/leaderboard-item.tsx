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
      index % 2 == 1 ? "bg-transparent" : "dark:bg-[#101022] bg-[#f7f7f7]"
    }`}
    >
      <p className="flex flex-start flex-row -mt-4 font-semibold text-[15px]">
        #{index}
      </p>

      <div className="flex flex-col ">
        <span
          className={`${
            isOwner ? "text-blue-500" : "dark:text-white "
          } font-semibold text-lg text-[15px]`}
        >
          {member.name} {isOwner && "(You)"}
        </span>
        <p className="font-semibold text-[13px]">0 points</p>
      </div>
    </div>
  );
};

export default LeaderboardItem;