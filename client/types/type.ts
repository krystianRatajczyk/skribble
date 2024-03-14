export interface User {
  id: string;
  name: string;
  points: number;
  isAdmin: boolean;
}

export interface Message {
  author: User;
  message: string;
  isGuessed: boolean;
  ownMessage: boolean;
  isWinner: boolean;
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
