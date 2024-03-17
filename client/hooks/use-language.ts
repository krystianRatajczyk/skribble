import { englishVersion, polishVersion, textContent } from "./../constants/text-content";
import { create } from "zustand";

interface languageStore {
  short: string;
  language: typeof englishVersion | typeof polishVersion;
  setLanguage: (language: string) => void;
}

export const useLanguage = create<languageStore>((set) => ({
  short: "ENG",
  language: textContent["ENG"],
  setLanguage: (language) => {
    set({ language: textContent[language] });
    set({ short: language });
  },
}));
