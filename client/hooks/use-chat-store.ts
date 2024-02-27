import { Message } from "@/types/type";
import { create } from "zustand";

interface chatStore {
  messages: Message[];
  setMessages: (message: Message) => void;
}

export const useChat = create<chatStore>((set) => ({
  messages: [],
  setMessages: (message) =>
    set((prev) => ({
      messages: [...prev.messages, message],
    })),
}));
