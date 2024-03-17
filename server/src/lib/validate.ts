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
  const diacriticsMap: Record<string, string> = {
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

  const removeDiacritics = (str: string) => {
    return str.replace(
      /[ąćęłńóśźż]/g,
      (match) => diacriticsMap[match.toLowerCase()] || match
    );
  };

  const normalizedStr1 = removeDiacritics(str1.toLowerCase());
  const normalizedStr2 = removeDiacritics(str2.toLowerCase());

  return normalizedStr1 === normalizedStr2;
};
