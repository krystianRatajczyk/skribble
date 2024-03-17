import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import { User } from "@/types/type";
import { Crown } from "lucide-react";
import React from "react";

interface PlaceProps {
  text: string;
  border: string;
  user: User & { place: number };
  className?: string;
  first?: boolean;
}

const Place = ({ user, text, className, border, first }: PlaceProps) => {
  const { language } = useLanguage();

  return (
    <div className="flex items-center gap-2 flex-col justify-center">
      <div
        className={`font-semibold ${
          first ? "text-[22px]" : "text-[19px]"
        } flex items-center justify-center gap-3 ${text}`}
      >
        {first && <Crown className="w-8 h-8 -rotate-12" />}
        {user.name}
      </div>
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
          {user.points} {language.points}
        </div>
      </div>
    </div>
  );
};

export default Place;
