import { PASSWORDS } from "@/constants/passwords";
import { DrawProps, User } from "@/types/type";
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

export const getPasswords = (amount: number): string[] => {
  const copy = [...PASSWORDS];

  copy.sort(() => Math.random() - 0.5);

  return copy.slice(0, amount);
};

export const addPoints = (members: User[], membersWithPoints: User[]) => {
  const newMembers = members.map((member) => {
    const user = membersWithPoints.find((m) => m.id === member.id);
    return {
      ...member,
      points:
        user?.points !== undefined
          ? member.points + user.points
          : member.points,
    };
  });

  return newMembers;
};
