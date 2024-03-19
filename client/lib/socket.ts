import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? "https://skribble-server.vercel.app"
    : "http://localhost:3001";
export const socket = io(URL, { transports: ["websocket"] });
