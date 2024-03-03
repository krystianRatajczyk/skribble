export interface User {
  id: string;
  name: string;
}

export interface Room {
  users: User[];
  currentIndexOfDrawer: number;
}

export interface Message {
  author: User;
  message: string;
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
