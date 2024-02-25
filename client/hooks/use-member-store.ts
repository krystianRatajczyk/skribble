import { User } from "@/types/type";
import { create } from "zustand";

interface membersStore {
  members: User[];
  setMembers: (members: User[]) => void;
}

export const useMembers = create<membersStore>((set) => ({
  members: [],
  setMembers: (members) => set({ members }),
}));
