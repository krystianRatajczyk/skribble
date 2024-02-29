import React from "react";
import { Slider } from "../ui/slider";
import { useCanvas } from "@/hooks/use-canvas-store";

const StrokeSlider = () => {
  const { strokeWidth, setStrokeWidth } = useCanvas();

  return (
    <div className="min-w-[150px] flex flex-col gap-2">
      <div className="flex items-center justify-between mb-2">
        <span>Stroke Width</span>
        <span>{strokeWidth}</span>
      </div>
      <Slider
        value={strokeWidth}
        max={50}
        min={1}
        step={1}
        onValueChange={setStrokeWidth}
      />
    </div>
  );
};

export default StrokeSlider;
