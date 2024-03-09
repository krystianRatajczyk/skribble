import { User } from "@/types/type";
import { create } from "zustand";

interface GameState {
  currentDrawer: User | null;
  rounds: number | null;
  drawtime: number | null;
  hasGameStarted: boolean;
  setRounds: (rounds: number) => void;
  setDrawtime: (time: number) => void;
  setCurrentDrawer: (currentDrawer: User) => void;
  setGameState: (state: boolean) => void;
}

export const useGame = create<GameState>((set) => ({
  currentDrawer: null,
  rounds: null,
  drawtime: null,
  hasGameStarted: false,
  setCurrentDrawer: (currentDrawer) => set({ currentDrawer }),
  setRounds: (rounds) => set({ rounds }),
  setDrawtime: (drawtime) => set({ drawtime }),
  setGameState: (state) => set({ hasGameStarted: state }),
}));
