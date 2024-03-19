"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withoutPolishSigns = exports.joinRoomSchema = void 0;
const z = __importStar(require("zod"));
exports.joinRoomSchema = z.object({
    name: z
        .string()
        .min(2, "Username must contain at least 2 characters")
        .max(50, "Username must not contain more than 50 characters"),
    roomId: z
        .string()
        .trim()
        .length(21, "Room ID must contain exactly 21 characters"),
});
const withoutPolishSigns = (str1, str2) => {
    const polishSigns = {
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
exports.withoutPolishSigns = withoutPolishSigns;
//# sourceMappingURL=validate.js.map