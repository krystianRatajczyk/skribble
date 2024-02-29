import { useCanvas } from "@/hooks/use-canvas-store";
import { cn } from "@/lib/utils";
import React from "react";

const Color = ({ color }: { color: string }) => {
  const { strokeColor, setStrokeColor } = useCanvas();

  return (
    <div
      className={cn(
        "w-6 h-6 rounded-sm",
        strokeColor === color && "border-[1px] border-white"
      )}
      style={{ backgroundColor: color }}
      onClick={() => setStrokeColor(color)}
    />
  );
};

export default Color;
