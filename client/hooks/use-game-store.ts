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
  setRounds: (rounds: number) => void;
  setDrawtime: (time: number) => void;
  setCurrentDrawer: (currentDrawer: User) => void;
  setGameState: (state: boolean) => void;
  setRoundState: (state: boolean) => void;
  setPassword: (password: string) => void;
  setWinners: (user: User) => void;
}

export const useGame = create<GameState>((set) => ({
  currentDrawer: null,
  rounds: null,
  drawtime: null,
  hasGameStarted: false,
  hasRoundStarted: false,
  password: null,
  winners: [],
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
}));
