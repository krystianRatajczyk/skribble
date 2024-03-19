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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const validate_1 = require("./lib/validate");
const z = __importStar(require("zod"));
const rooms_1 = require("./data/rooms");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const validateData = (socket, { name, roomId }) => {
    try {
        return validate_1.joinRoomSchema.parse({ name, roomId });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            socket.emit("wrong-data", {
                message: "Name or room id you provided are incorrect",
            });
        }
    }
};
const joinRoom = (socket, roomId, name) => {
    socket.join(roomId);
    const user = { id: socket.id, name, isAdmin: false, points: 0 };
    (0, rooms_1.addUser)(user, roomId);
    const members = (0, rooms_1.getMembers)(roomId);
    const currentDrawer = (0, rooms_1.getCurrentDrawer)(roomId);
    socket.emit("joined-room", user, members, roomId, currentDrawer);
    socket.to(roomId).emit("update-members", members);
    socket
        .to(roomId)
        .emit("send-notification", ` ${name} has just arrived! `, "success");
};
const leaveRoom = (socket, userId, roomId) => {
    socket.leave(roomId);
    (0, rooms_1.removeUser)(userId, roomId);
};
io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("create-room", (joinRoomData) => {
        const validatedData = validateData(socket, joinRoomData);
        if (!validatedData) {
            return;
        }
        const { roomId, name } = validatedData;
        joinRoom(socket, roomId, name);
    });
    socket.on("join-room", (joinRoomData) => {
        const validatedData = validateData(socket, joinRoomData);
        if (!validatedData) {
            return;
        }
        const { roomId, name } = validatedData;
        if ((0, rooms_1.isRoomCreated)(roomId)) {
            return joinRoom(socket, roomId, name);
        }
        socket.emit("room-not-found", {
            message: "Oops! The Room ID you entered doesn't exist or hasn't been created yet.",
        });
    });
    socket.on("leave-room", (user, roomId) => {
        leaveRoom(socket, user.id, roomId);
        socket.emit("leaved-room");
        const newMembers = (0, rooms_1.getMembers)(roomId);
        if ((newMembers === null || newMembers === void 0 ? void 0 : newMembers.length) === 0 || !newMembers) {
            (0, rooms_1.deleteRoom)(roomId);
        }
        socket.to(roomId).emit("update-members", newMembers);
        socket
            .to(roomId)
            .emit("send-notification", `${user.name} has left the party`, "emoji");
    });
    socket.on("send-message", ({ userMessage, roomId, drawtime, }) => {
        var _a, _b;
        if (userMessage.message !== "") {
            socket.to(roomId).emit("receive-message", Object.assign(Object.assign({}, userMessage), { isGuessed: (0, rooms_1.getPassword)(roomId) !== undefined &&
                    userMessage.isGuessed &&
                    (((_a = (0, rooms_1.getPassword)(roomId)) === null || _a === void 0 ? void 0 : _a.trim().toLocaleLowerCase()) ===
                        userMessage.message.trim().toLocaleLowerCase() ||
                        (0, validate_1.withoutPolishSigns)((0, rooms_1.getPassword)(roomId), userMessage.message)) }));
            if ((0, rooms_1.getPassword)(roomId)) {
                if (((_b = (0, rooms_1.getPassword)(roomId)) === null || _b === void 0 ? void 0 : _b.toLocaleLowerCase()) ===
                    userMessage.message.trim().toLocaleLowerCase() ||
                    (0, validate_1.withoutPolishSigns)((0, rooms_1.getPassword)(roomId), userMessage.message)) {
                    socket.to(roomId).emit("guessed-password", userMessage.author);
                    const time = (0, rooms_1.getTime)(roomId);
                    if (time && drawtime) {
                        (0, rooms_1.setPoints)(roomId, userMessage.author, Math.floor((time / drawtime) * 400));
                    }
                }
            }
        }
    });
    socket.on("draw", ({ drawOptions, roomId }) => {
        socket.to(roomId).emit("update-canvas", drawOptions);
    });
    socket.on("clear-canvas", (roomId) => {
        socket.to(roomId).emit("cleared-canvas");
    });
    socket.on("start-game", ({ rounds, drawtime, roomId, currentDrawer }) => {
        (0, rooms_1.setTime)(roomId, drawtime);
        (0, rooms_1.setMaxRounds)(roomId, rounds);
        io.to(roomId).emit("started-game", rounds, drawtime, currentDrawer);
    });
    // start new round
    socket.on("change-password", (password, roomId) => {
        (0, rooms_1.setPassword)(roomId, password);
        (0, rooms_1.setRoundState)(roomId, true);
        socket.to(roomId).emit("changed-password", password);
        const interval = setInterval(() => {
            if (!(0, rooms_1.getRoundState)(roomId)) {
                clearInterval(interval);
                return;
            }
            (0, rooms_1.reduceTime)(roomId);
            io.to(roomId).emit("reduce-time", (0, rooms_1.getTime)(roomId));
        }, 1000);
    });
    socket.on("send-message-winners", ({ userMessage, ids }) => {
        ids.forEach((id) => {
            socket
                .to(id)
                .emit("sent-message-winners", Object.assign(Object.assign({}, userMessage), { isWinner: true }));
        });
    });
    socket.on("end-round", (roomId, currentDrawer, winnersLength, membersLength) => {
        if (membersLength > 0) {
            (0, rooms_1.setPoints)(roomId, currentDrawer, Math.floor((winnersLength / membersLength) * 100));
        }
        (0, rooms_1.setRoundState)(roomId, false);
        const members = (0, rooms_1.getMembers)(roomId);
        socket.to(roomId).emit("ended-round", members);
    });
    socket.on("restart-round", (roomId, drawtime) => {
        (0, rooms_1.setTime)(roomId, drawtime);
        (0, rooms_1.setPassword)(roomId, "");
        (0, rooms_1.clearPoints)(roomId);
        const newDrawer = (0, rooms_1.getNewDrawer)(roomId);
        if ((0, rooms_1.getRounds)(roomId) > (0, rooms_1.getMaxRounds)(roomId)) {
            io.to(roomId).emit("game-over");
        }
        else {
            io.to(roomId).emit("next-round", (0, rooms_1.getRounds)(roomId));
            io.to(roomId).emit("restarted-round", newDrawer);
        }
    });
    socket.on("restart-game", (roomId) => {
        (0, rooms_1.setTime)(roomId, 0);
        (0, rooms_1.setRounds)(roomId, 1);
        (0, rooms_1.clearPoints)(roomId);
        io.to(roomId).emit("restarted-game", (0, rooms_1.getMembers)(roomId));
    });
});
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server is running on port ${PORT} now!`));
//# sourceMappingURL=index.js.map