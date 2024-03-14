export interface User {
  id: string;
  name: string;
  isAdmin: boolean;
  points: number;
}

export interface Room {
  users: User[];
  currentIndexOfDrawer: number;
  currentPassword: string;
}

export interface Message {
  author: User;
  message: string;
  isGuessed: boolean;
}

export interface Point {
  x: number;
  y: number;
}

export interface DrawOptions {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | undefined;
  strokeColor: string;
  strokeWidth: number[];
  dashGap: number[];
}
