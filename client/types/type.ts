export interface User {
  id: string;
  name: string;
}

export interface Message {
  author: User;
  message: string;
}

// Drawing

export interface Point {
  x: number;
  y: number;
}

export interface DrawProps {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
}
