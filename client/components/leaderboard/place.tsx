import { cn } from "@/lib/utils";
import { User } from "@/types/type";
import React from "react";

interface PlaceProps {
  text: string;
  border: string;
  user: User & { place: number };
  className?: string;
}

const Place = ({ user, text, className, border }: PlaceProps) => {
  return (
    <div className="flex items-center gap-2 flex-col justify-center">
      <div className={`font-semibold text-[19px] ${text}`}>{user.name}</div>
      <div
        className={cn(
          `w-[300px] h-5 rounded-md border-[3px] border-b-[0px] rounded-bl-none rounded-br-none p-5 relative `,
          className,
          text,
          border
        )}
      >
        <div className="absolute left-1 top-1 font-bold text-[15px]">
          #{user.place}
        </div>
        <div className="w-full h-full flex items-center justify-center text-[16px] font-semibold">
          {user.points} points
        </div>
      </div>
    </div>
  );
};

export default Place;
