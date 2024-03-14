import { useCanvas } from "@/hooks/use-canvas-store";
import { useDraw } from "@/hooks/use-draw";
import { draw } from "@/lib/utils";
import { DrawProps } from "@/types/type";
import React, { useEffect, useRef } from "react";
import ToolBox from "./toolbox";
import { socket } from "@/lib/socket";
import { useParams } from "next/navigation";
import { useUser } from "@/hooks/use-user-store";
import { useGame } from "@/hooks/use-game-store";
import GameSettings from "./game-settings";
import ChoosePassword from "./choose-password";
import Notification from "../layout/notification";

const DrawingCanvas = () => {
  const { strokeColor, strokeWidth } = useCanvas();
  const { roomId } = useParams();
  const { user } = useUser();
  const {
    currentDrawer,
    hasGameStarted,
    hasRoundStarted,
    setRoundState,
    setRounds,
    setDrawtime,
    setGameState,
    setCurrentDrawer,
    password,
  } = useGame();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const onDraw = ({ ctx, currentPoint, prevPoint }: DrawProps) => {
    const drawOptions = {
      ctx,
      currentPoint,
      prevPoint,
      strokeColor,
      strokeWidth,
    };

    if (currentDrawer?.id !== user?.id) return;

    draw(drawOptions);
    socket.emit("draw", {
      drawOptions: {
        ...drawOptions,
        prevHeightRatio:
          drawOptions.prevPoint?.y! / canvasRef.current?.clientHeight!,
        prevWidthRatio:
          drawOptions.prevPoint?.x! / canvasRef.current?.clientWidth!,
        currHeightRatio:
          drawOptions.currentPoint?.y! / canvasRef.current?.clientHeight!,
        currWidthRatio:
          drawOptions.currentPoint?.x! / canvasRef.current?.clientWidth!,
        width: canvasRef.current?.clientWidth!,
      },
      roomId,
    });
  };

  const { canvasRef, onMouseDown, clear } = useDraw(onDraw);

  useEffect(() => {
    const setCanvasDimensions = () => {
      if (!containerRef.current || !canvasRef.current) return;

      const { width, height } = containerRef.current?.getBoundingClientRect();

      canvasRef.current.width = width;
      canvasRef.current.height = height;
    };

    setCanvasDimensions();
  }, [canvasRef, hasGameStarted, password]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    const width = canvasRef.current?.width;
    const height = canvasRef.current?.height;

    socket.on("update-canvas", (drawOptions) => {
      if (!ctx || !canvasRef.current || !width || !height) return;
      if (drawOptions.prevWidthRatio && drawOptions.prevHeightRatio) {
        draw({
          ...drawOptions,
          ctx,
          currentPoint: {
            x: drawOptions.currWidthRatio * width,
            y: drawOptions.currHeightRatio * height,
          },

          prevPoint: {
            x: drawOptions.prevWidthRatio * width,
            y: drawOptions.prevHeightRatio * height,
          },
          strokeWidth: [
            drawOptions.strokeWidth *
              (canvasRef.current?.clientWidth / drawOptions.width),
          ],
        });
      }
    });

    socket.on("cleared-canvas", () => {
      clear();
    });

    socket.on("started-game", (rounds, drawtime, currentDrawer) => {
      setGameState(true);
      setRoundState(true);
      setRounds(+rounds);
      setDrawtime(+drawtime);
      setCurrentDrawer(currentDrawer);
    });

    return () => {
      socket.off("update-canvas");
      socket.off("cleared-canvas");
      socket.off("started-game");
    };
  }, [socket, draw, canvasRef, hasGameStarted, password]);

  const renderContent = () => {
    if (!hasGameStarted) {
      if (!user?.isAdmin) {
        return <Notification notification="Waiting for host to start game" />;
      }

      return <GameSettings />;
    }

    if (!password) {
      if (user?.id === currentDrawer?.id) {
        return <ChoosePassword />;
      }

      return (
        <Notification
          notification={`${currentDrawer?.name} is choosing the word`}
        />
      );
    }


    return (
      <canvas
        id="canvas"
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={0}
        height={0}
        className="touch-none bg-white "
      />
    );
  };

  return (
    <>
      <div className="flex-1">
        <div
          className="flex h-full w-full items-center justify-center "
          ref={containerRef}
        >
          {renderContent()}
        </div>
      </div>

      <ToolBox
        clear={clear}
        hidden={currentDrawer?.id !== user?.id || !hasGameStarted}
      />
    </>
  );
};

export default DrawingCanvas;
