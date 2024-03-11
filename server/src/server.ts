import { Server, type Socket } from "socket.io";
import http from "http";
import cors from "cors";
import express from "express";
import { joinRoomSchema } from "./lib/validate";
import * as z from "zod";
import {
  addUser,
  deleteRoom,
  getCurrentDrawer,
  getMembers,
  getPassword,
  isRoomCreated,
  removeUser,
  setPassword,
} from "./data/rooms";
import { DrawOptions, Message, User } from "./types/type";

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server);

const validateData = (
  socket: Socket,
  { name, roomId }: { name: string; roomId: string }
) => {
  try {
    return joinRoomSchema.parse({ name, roomId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      socket.emit("wrong-data", {
        message: "Name or room id you provided are incorrect",
      });
    }
  }
};

const joinRoom = (socket: Socket, roomId: string, name: string) => {
  socket.join(roomId);
  const user = { id: socket.id, name };

  addUser(user, roomId);
  const members = getMembers(roomId);
  const currentDrawer = getCurrentDrawer(roomId);

  socket.emit("joined-room", user, members, roomId, currentDrawer);
  socket.to(roomId).emit("update-members", members);
  socket
    .to(roomId)
    .emit("send-notification", ` ${name} has just arrived! `, "success");
};

const leaveRoom = (socket: Socket, userId: string, roomId: string) => {
  socket.leave(roomId);
  removeUser(userId, roomId);
};

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("create-room", (joinRoomData: { name: string; roomId: string }) => {
    const validatedData = validateData(socket, joinRoomData);

    if (!validatedData) {
      return;
    }

    const { roomId, name } = validatedData;

    joinRoom(socket, roomId, name);
  });

  socket.on("join-room", (joinRoomData: { name: string; roomId: string }) => {
    const validatedData = validateData(socket, joinRoomData);

    if (!validatedData) {
      return;
    }

    const { roomId, name } = validatedData;

    if (isRoomCreated(roomId)) {
      return joinRoom(socket, roomId, name);
    }

    socket.emit("room-not-found", {
      message:
        "Oops! The Room ID you entered doesn't exist or hasn't been created yet.",
    });
  });

  socket.on("leave-room", (user: User, roomId: string) => {
    leaveRoom(socket, user.id, roomId);
    socket.emit("leaved-room");

    const newMembers = getMembers(roomId);

    if (newMembers?.length === 0 || !newMembers) {
      deleteRoom(roomId);
    }

    socket.to(roomId).emit("update-members", newMembers);
    socket
      .to(roomId)
      .emit("send-notification", `${user.name} has left the party`, "emoji");
  });

  socket.on(
    "send-message",
    ({ userMessage, roomId }: { userMessage: Message; roomId: string }) => {
      if (userMessage.message !== "") {
        socket.to(roomId).emit("receive-message", {
          ...userMessage,
          isGuessed:
            userMessage.isGuessed &&
            getPassword(roomId)?.toLocaleLowerCase() === userMessage.message,
        });
        if (getPassword(roomId)?.toLocaleLowerCase() === userMessage.message) {
          socket.to(roomId).emit("guessed-password", userMessage.author);
        }
      }
    }
  );

  socket.on(
    "draw",
    ({ drawOptions, roomId }: { drawOptions: DrawOptions; roomId: string }) => {
      socket.to(roomId).emit("update-canvas", drawOptions);
    }
  );

  socket.on("clear-canvas", (roomId: string) => {
    socket.to(roomId).emit("cleared-canvas");
  });

  socket.on("start-game", ({ rounds, drawtime, roomId, currentDrawer }) => {
    socket.to(roomId).emit("started-game", rounds, drawtime, currentDrawer);
  });

  socket.on("change-password", (password, roomId) => {
    setPassword(roomId, password);
    socket.to(roomId).emit("changed-password", password);
  });

  socket.on(
    "send-message-winners",
    ({ userMessage, ids }: { userMessage: Message; ids: string[] }) => {
      ids.forEach((id) => {
        socket
          .to(id)
          .emit("sent-message-winners", { ...userMessage, isWinner: true });
      });
    }
  );
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () =>
  console.log(`Server is running on port ${PORT} now!`)
);
