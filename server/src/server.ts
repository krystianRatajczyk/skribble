import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("connected server");
  socket.on("event", (event: string) => console.log(event));
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () =>
  console.log(`Server is running on port ${PORT} now!`)
);
