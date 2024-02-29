import { create } from "zustand";

interface CanvasState {
  strokeColor: string;
  strokeWidth: number[];
  setStrokeColor: (strokeColor: string) => void;
  setStrokeWidth: (strokeWidth: number[]) => void;
}

export const useCanvas = create<CanvasState>((set) => ({
  strokeColor: "#000000",
  strokeWidth: [20],
  setStrokeColor: (strokeColor) => set({ strokeColor }),
  setStrokeWidth: (strokeWidth) => set({ strokeWidth }),
}));
