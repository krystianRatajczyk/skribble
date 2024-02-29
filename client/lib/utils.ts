import { DrawProps } from "@/types/type";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const draw = ({
  ctx,
  prevPoint,
  currentPoint,
  strokeColor,
  strokeWidth,
}: DrawProps & { strokeColor: string; strokeWidth: number[] }) => {
  const startPoint = prevPoint ?? currentPoint;

  ctx.lineWidth = strokeWidth[0];
  ctx.lineCap = "round";
  ctx.strokeStyle = strokeColor;

  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(currentPoint.x, currentPoint.y);
  ctx.stroke();
};
