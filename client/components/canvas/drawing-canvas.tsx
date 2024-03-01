import { useCanvas } from "@/hooks/use-canvas-store";
import { useDraw } from "@/hooks/use-draw";
import { draw } from "@/lib/utils";
import { DrawProps } from "@/types/type";
import React, { useEffect, useRef } from "react";
import ToolBox from "./toolbox";
import { socket } from "@/lib/socket";
import { useParams } from "next/navigation";

const DrawingCanvas = () => {
  const { strokeColor, strokeWidth } = useCanvas();
  const { roomId } = useParams();

  const onDraw = ({ ctx, currentPoint, prevPoint }: DrawProps) => {
    const drawOptions = {
      ctx,
      currentPoint,
      prevPoint,
      strokeColor,
      strokeWidth,
    };

    draw(drawOptions);

    socket.emit("draw", { drawOptions, roomId });
  };

  const { canvasRef, onMouseDown, clear } = useDraw(onDraw);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const setCanvasDimensions = () => {
      if (!containerRef.current || !canvasRef.current) return;

      const { width, height } = containerRef.current?.getBoundingClientRect();

      canvasRef.current.width = width;
      canvasRef.current.height = height;
    };

    setCanvasDimensions();
  }, [canvasRef]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    socket.on("update-canvas", (drawOptions) => {
      if (!ctx) return;
      draw({ ...drawOptions, ctx });
    });

    socket.on("cleared-canvas", () => {
      clear();
    });

    return () => {
      socket.off("update-canvas");
      socket.off("cleared-canvas");
    };
  }, [socket, draw]);

  return (
    <>
      <div className="flex-1">
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
      </div>

      <ToolBox clear={clear} />
    </>
  );
};

export default DrawingCanvas;
