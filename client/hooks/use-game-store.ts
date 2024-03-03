import { User } from "@/types/type";
import { create } from "zustand";

interface GameState {
  currentDrawer: User | null;
  setCurrentDrawer: (currentDrawer: User) => void;
}

export const useGame = create<GameState>((set) => ({
  currentDrawer: null,
  setCurrentDrawer: (currentDrawer) => set({ currentDrawer }),
}));
