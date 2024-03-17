import { User } from "@/types/type";
import { create } from "zustand";

interface GameState {
  currentDrawer: User | null;
  rounds: number | null;
  drawtime: number | null;
  hasGameStarted: boolean;
  hasRoundStarted: boolean;
  password: string | null;
  winners: User[];
  time: number | null;
  setRounds: (rounds: number | null) => void;
  setDrawtime: (time: number | null) => void;
  setCurrentDrawer: (currentDrawer: User | null) => void;
  setGameState: (state: boolean) => void;
  setRoundState: (state: boolean) => void;
  setPassword: (password: string | null) => void;
  setWinners: (user: User) => void;
  clearWinners: () => void;
  setTime: (time: number | null) => void;
}

export const useGame = create<GameState>((set) => ({
  currentDrawer: null,
  rounds: null,
  drawtime: null,
  hasGameStarted: false,
  hasRoundStarted: false,
  password: null,
  winners: [],
  time: null,
  setCurrentDrawer: (currentDrawer) => set({ currentDrawer }),
  setRounds: (rounds) => set({ rounds }),
  setDrawtime: (drawtime) => set({ drawtime }),
  setGameState: (state) => set({ hasGameStarted: state }),
  setRoundState: (state) => set({ hasRoundStarted: state }),
  setPassword: (password) => set({ password }),
  setWinners: (winner) =>
    set((prev) => ({
      winners: [...prev.winners, winner],
    })),
  clearWinners: () => set({ winners: [] }),
  setTime: (time) => set({ time }),
}));
