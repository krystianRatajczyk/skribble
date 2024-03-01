export interface User {
  id: string;
  name: string;
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
