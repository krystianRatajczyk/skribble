import { User } from "@/types/type";
import { create } from "zustand";

interface userStore {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUser = create<userStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
