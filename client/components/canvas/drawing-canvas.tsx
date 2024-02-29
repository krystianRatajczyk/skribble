import { useDraw } from "@/hooks/use-draw";
import { draw } from "@/lib/utils";
import { DrawProps } from "@/types/type";
import React, { useEffect, useRef } from "react";

const DrawingCanvas = () => {
  const onDraw = ({ ctx, currentPoint, prevPoint }: DrawProps) => {
    const drawOptions = {
      ctx,
      currentPoint,
      prevPoint,
      strokeColor: "#ff0000", // replace it with canvas strore
      strokeWidth: 30,
    };
    draw(drawOptions);
  };

  const { canvasRef, onMouseDown } = useDraw(onDraw);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const setCanvasDimensions = () => {
      if (!containerRef.current || !canvasRef.current) return;

      const { width, height } = containerRef.current?.getBoundingClientRect();

      canvasRef.current.width = width
      canvasRef.current.height = height
    };

    setCanvasDimensions();
  }, [canvasRef]);

  return (
    <div
      className="flex h-full w-full items-center justify-center"
      ref={containerRef}
    >
      <canvas
        id="canvas"
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={0}
        height={0}
        className="touch-none bg-white"
      />
    </div>
  );
};

export default DrawingCanvas;
