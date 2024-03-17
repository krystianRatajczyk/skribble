import { cn } from "@/lib/utils";
import { User } from "@/types/type";
import React from "react";

interface PlaceProps {
  color: string;
  user: User & { place: number };
  className?: string;
}

const Place = ({ user, color, className }: PlaceProps) => {
  return (
    <div className="flex items-center gap-2 flex-col justify-center">
      <div className="font-semibold text-[19px]" style={{ color }}>
        {user.name}
      </div>
      <div
        style={{ borderColor: color, color }}
        className={cn(
          "w-[300px] h-5 rounded-md border-[2px] border-b-[0px] rounded-bl-none rounded-br-none p-5 relative",
          className
        )}
      >
        <div className="absolute left-1 top-1 font-bold text-[15px]">
          #{user.place}
        </div>
        <div className="w-full h-full flex items-center justify-center text-[16px]">
          {user.points} points
        </div>
      </div>
    </div>
  );
};

export default Place;
