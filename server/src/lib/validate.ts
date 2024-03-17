import * as z from "zod";

export const joinRoomSchema = z.object({
  name: z
    .string()
    .min(2, "Username must contain at least 2 characters")
    .max(50, "Username must not contain more than 50 characters"),
  roomId: z
    .string()
    .trim()
    .length(21, "Room ID must contain exactly 21 characters"),
});

export const withoutPolishSigns = (str1: string, str2: string) => {
  const polishSigns: Record<string, string> = {
    ą: "a",
    ć: "c",
    ę: "e",
    ł: "l",
    ń: "n",
    ó: "o",
    ś: "s",
    ź: "z",
    ż: "z",
  };
  if (str1.length !== str2.length) {
    return false;
  }

  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  return Array.from(str1).every((letter, index) => {
    if (letter !== str2[index]) {
      if (letter in polishSigns) {
        return polishSigns[letter] === str2[index];
      }
      return false;
    }
    return true;
  });
};