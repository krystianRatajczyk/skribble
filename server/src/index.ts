import { Server, type Socket } from "socket.io";
import http from "http";
import cors from "cors";
import express from "express";
import { joinRoomSchema, withoutPolishSigns } from "./lib/validate";
import * as z from "zod";
import {
  addUser,
  clearPoints,
  deleteRoom,
  getCurrentDrawer,
  getMaxRounds,
  getMembers,
  getNewDrawer,
  getPassword,
  getRoundState,
  getRounds,
  getTime,
  isRoomCreated,
  reduceTime,
  removeUser,
  setMaxRounds,
  setPassword,
  setPoints,
  setRoundState,
  setRounds,
  setTime,
} from "./data/rooms";
import { DrawOptions, Message, User } from "./types/type";

const app = express();

app.use(
  cors({
    origin: ["https://skribble-server.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

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
  const user = { id: socket.id, name, isAdmin: false, points: 0 };

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
    ({
      userMessage,
      roomId,
      drawtime,
    }: {
      userMessage: Message;
      roomId: string;
      drawtime: number | null;
    }) => {
      if (userMessage.message !== "") {
        socket.to(roomId).emit("receive-message", {
          ...userMessage,
          isGuessed:
            getPassword(roomId) !== undefined &&
            userMessage.isGuessed &&
            (getPassword(roomId)?.trim().toLocaleLowerCase() ===
              userMessage.message.trim().toLocaleLowerCase() ||
              withoutPolishSigns(getPassword(roomId)!, userMessage.message)),
        });
        if (getPassword(roomId)) {
          if (
            getPassword(roomId)?.toLocaleLowerCase() ===
              userMessage.message.trim().toLocaleLowerCase() ||
            withoutPolishSigns(getPassword(roomId)!, userMessage.message)
          ) {
            socket.to(roomId).emit("guessed-password", userMessage.author);

            const time = getTime(roomId);
            if (time && drawtime) {
              setPoints(
                roomId,
                userMessage.author,
                Math.floor((time / drawtime) * 400)
              );
            }
          }
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
    setTime(roomId, drawtime);
    setMaxRounds(roomId, rounds);
    io.to(roomId).emit("started-game", rounds, drawtime, currentDrawer);
  });

  // start new round
  socket.on("change-password", (password, roomId) => {
    setPassword(roomId, password);
    setRoundState(roomId, true);

    socket.to(roomId).emit("changed-password", password);

    const interval = setInterval(() => {
      if (!getRoundState(roomId)) {
        clearInterval(interval);
        return;
      }

      reduceTime(roomId);
      io.to(roomId).emit("reduce-time", getTime(roomId));
    }, 1000);
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

  socket.on(
    "end-round",
    (roomId, currentDrawer, winnersLength, membersLength) => {
      if (membersLength > 0) {
        setPoints(
          roomId,
          currentDrawer,
          Math.floor((winnersLength / membersLength) * 100)
        );
      }
      setRoundState(roomId, false);
      const members = getMembers(roomId);
      io.to(roomId).emit("ended-round", members);
    }
  );

  socket.on("restart-round", (roomId, drawtime) => {
    setTime(roomId, drawtime);
    setPassword(roomId, "");
    clearPoints(roomId);

    const newDrawer = getNewDrawer(roomId);
    if (getRounds(roomId)! > getMaxRounds(roomId)!) {
      io.to(roomId).emit("game-over");
    } else {
      io.to(roomId).emit("next-round", getRounds(roomId));
      io.to(roomId).emit("restarted-round", newDrawer);
    }
  });

  socket.on("restart-game", (roomId) => {
    setTime(roomId, 0);
    setRounds(roomId, 1);
    clearPoints(roomId);
    io.to(roomId).emit("restarted-game", getMembers(roomId));
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () =>
  console.log(`Server is running on port ${PORT} now!`)
);
