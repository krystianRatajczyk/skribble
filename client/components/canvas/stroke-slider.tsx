import React from "react";
import { Slider } from "../ui/slider";
import { useCanvas } from "@/hooks/use-canvas-store";
import { useLanguage } from "@/hooks/use-language";

const StrokeSlider = () => {
  const { strokeWidth, setStrokeWidth } = useCanvas();
  const { language } = useLanguage();

  return (
    <div className="min-w-[150px] flex flex-col gap-2">
      <div className="flex items-center justify-between mb-2">
        <span>{language.strokeWidth}</span>
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
