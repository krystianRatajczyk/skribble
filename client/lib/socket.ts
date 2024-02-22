import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? process?.env?.NEXT_PUBLIC_SITE_URL!
    : "http://localhost:3001";
export const socket = io(URL);
