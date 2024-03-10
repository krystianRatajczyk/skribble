export interface User {
  id: string;
  name: string;
  isAdmin: boolean;
}

export interface Message {
  author: User;
  message: string;
  isGuessed: boolean;
  ownMessage: boolean;
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
