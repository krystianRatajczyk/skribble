"use client";

import { COLORS } from "@/constants/canvas";
import React from "react";
import StrokeSlider from "./stroke-slider";
import Color from "./color";
import { useParams } from "next/navigation";
import CopyButton from "../form/copy-button";
import ClearButton from "./clear-button";
import { socket } from "@/lib/socket";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";

interface ToolBoxProps {
  clear: () => void;
  hidden: boolean;
}

const ToolBox = ({ clear, hidden }: ToolBoxProps) => {
  const { roomId } = useParams() as { roomId: string };
  const { language } = useLanguage();

  const handleClear = () => {
    socket.emit("clear-canvas", roomId);
    clear();
  };

  return (
    <div
      className={cn(
        `min-h-[15vh] dark:bg-[#020817] border-t-[1px] dark:border-[#1e293b] 
        border-[#dde9f9] px-7 py-4 flex items-center justify-between`,
        hidden ? "justify-end" : "justify-between"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-x-[50px]",
          hidden ? "hidden" : "flex"
        )}
      >
        <div className="grid grid-cols-[repeat(13,_minmax(0,_1fr))] grid-rows-2 gap-2">
          {COLORS.map((color, index) => (
            <Color key={index} color={color} />
          ))}
        </div>
        <div>
          <StrokeSlider />
        </div>
        <div className="flex items-center gap-3">
          <ClearButton clear={handleClear} />
        </div>
      </div>
      <div className="flex items-start gap-1 flex-col ">
        <span className="font-semibold text-[15px]">
          {language.roomIdLabel}
        </span>
        <div className="flex items-center justify-between py-2 px-4 rounded-md border-[1px] dark:border-[#1e293b] border-[#dde9f9] gap-4">
          <span className="dark:text-[#949b94] text-[#5b5c5b] text-sm">
            {roomId}
          </span>
          <CopyButton roomId={roomId} />
        </div>
      </div>
    </div>
  );
};

export default ToolBox;
