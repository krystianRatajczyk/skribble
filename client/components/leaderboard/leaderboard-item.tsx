import { useLanguage } from "@/hooks/use-language";
import { User } from "@/types/type";
import { Pencil } from "lucide-react";
import React from "react";

interface LeaderboardItemProps {
  member: User;
  index: number;
  place: number;
  isOwner: boolean;
  isDrawer: boolean;
  isWinner: boolean;
}

const LeaderboardItem = ({
  member,
  index,
  isOwner,
  isDrawer,
  place,
  isWinner,
}: LeaderboardItemProps) => {
  const { language } = useLanguage();

  return (
    <div
      className={`w-full flex items-center 
    justify-start px-3 py-1.5 gap-x-3 h-fit relative ${
      isWinner
        ? index % 2 == 1
          ? "bg-emerald-300 dark:bg-emerald-800"
          : "bg-emerald-400 dark:bg-emerald-900"
        : index % 2 == 1
        ? "bg-transparent"
        : "dark:bg-[#101022] bg-[#f7f7f7]"
    }`}
    >
      <p className="flex flex-start flex-row -mt-4 font-semibold text-[15px]">
        #{place}
      </p>

      <div className="flex flex-col ">
        <span
          className={`${
            isOwner ? "text-blue-400" : "dark:text-white "
          } font-semibold text-lg text-[15px]`}
        >
          {member.name} {isOwner && "(You)"}
        </span>
        <p className="font-semibold text-[13px]">
          {member.points} {language.points}
        </p>
      </div>
      <div className="absolute top-3.5 right-5">
        {isDrawer && <Pencil className="w-5 h-5" />}
      </div>
    </div>
  );
};

export default LeaderboardItem;
