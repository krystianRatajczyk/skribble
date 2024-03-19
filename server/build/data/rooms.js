"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaxRounds = exports.getRounds = exports.clearPoints = exports.getNewDrawer = exports.getRoundState = exports.setRoundState = exports.reduceTime = exports.setRounds = exports.setMaxRounds = exports.setTime = exports.getTime = exports.setPoints = exports.getPassword = exports.setPassword = exports.deleteRoom = exports.removeUser = exports.getCurrentDrawer = exports.getMembers = exports.isRoomCreated = exports.getUsers = exports.addUser = exports.rooms = void 0;
exports.rooms = {};
const addUser = (user, roomId) => {
    if (!(roomId in exports.rooms)) {
        exports.rooms[roomId] = {
            users: [Object.assign(Object.assign({}, user), { isAdmin: true, points: 0 })],
            currentIndexOfDrawer: 0,
            currentPassword: "",
            time: 0,
            rounds: 1,
            maxRounds: 0,
            roundState: true,
        };
    }
    else {
        exports.rooms[roomId].users.push(Object.assign(Object.assign({}, user), { isAdmin: false, points: 0 }));
    }
};
exports.addUser = addUser;
const getUsers = (roomId) => {
    return exports.rooms[roomId];
};
exports.getUsers = getUsers;
const isRoomCreated = (roomId) => {
    return roomId in exports.rooms;
};
exports.isRoomCreated = isRoomCreated;
const getMembers = (roomId) => {
    if (roomId in exports.rooms) {
        return exports.rooms[roomId].users;
    }
};
exports.getMembers = getMembers;
const getCurrentDrawer = (roomId) => {
    if (roomId in exports.rooms) {
        return exports.rooms[roomId].users[exports.rooms[roomId].currentIndexOfDrawer];
    }
};
exports.getCurrentDrawer = getCurrentDrawer;
const removeUser = (userId, roomId) => {
    exports.rooms = Object.assign(Object.assign({}, exports.rooms), { [roomId]: Object.assign(Object.assign({}, exports.rooms[roomId]), { users: exports.rooms[roomId].users.filter((user) => user.id !== userId) }) });
};
exports.removeUser = removeUser;
const deleteRoom = (roomId) => {
    delete exports.rooms[roomId];
};
exports.deleteRoom = deleteRoom;
const setPassword = (roomId, password) => {
    if (roomId in exports.rooms) {
        exports.rooms[roomId].currentPassword = password;
    }
};
exports.setPassword = setPassword;
const getPassword = (roomId) => {
    if (roomId in exports.rooms && exports.rooms[roomId].currentPassword !== "") {
        return exports.rooms[roomId].currentPassword;
    }
};
exports.getPassword = getPassword;
const setPoints = (roomId, user, newPoints) => {
    if (roomId in exports.rooms) {
        exports.rooms[roomId] = Object.assign(Object.assign({}, exports.rooms[roomId]), { users: exports.rooms[roomId].users.map((u) => u.id === user.id ? Object.assign(Object.assign({}, user), { points: newPoints }) : u) });
    }
};
exports.setPoints = setPoints;
const getTime = (roomId) => {
    if (roomId in exports.rooms) {
        return exports.rooms[roomId].time;
    }
};
exports.getTime = getTime;
const setTime = (roomId, time) => {
    if (roomId in exports.rooms) {
        exports.rooms[roomId] = Object.assign(Object.assign({}, exports.rooms[roomId]), { time });
    }
};
exports.setTime = setTime;
const setMaxRounds = (roomId, maxRounds) => {
    if (roomId in exports.rooms) {
        exports.rooms[roomId] = Object.assign(Object.assign({}, exports.rooms[roomId]), { maxRounds });
    }
};
exports.setMaxRounds = setMaxRounds;
const setRounds = (roomId, rounds) => {
    if (roomId in exports.rooms) {
        exports.rooms[roomId] = Object.assign(Object.assign({}, exports.rooms[roomId]), { rounds });
    }
};
exports.setRounds = setRounds;
const reduceTime = (roomId) => {
    if (roomId in exports.rooms) {
        exports.rooms[roomId] = Object.assign(Object.assign({}, exports.rooms[roomId]), { time: exports.rooms[roomId].time - 1 });
    }
};
exports.reduceTime = reduceTime;
const setRoundState = (roomId, state) => {
    if (roomId in exports.rooms) {
        exports.rooms[roomId] = Object.assign(Object.assign({}, exports.rooms[roomId]), { roundState: state });
    }
};
exports.setRoundState = setRoundState;
const getRoundState = (roomId) => {
    if (roomId in exports.rooms) {
        return exports.rooms[roomId].roundState;
    }
};
exports.getRoundState = getRoundState;
const setNewDrawer = (roomId) => {
    if (roomId in exports.rooms) {
        let newIndex = exports.rooms[roomId].currentIndexOfDrawer;
        let newRounds = exports.rooms[roomId].rounds;
        if (exports.rooms[roomId].currentIndexOfDrawer + 1 < exports.rooms[roomId].users.length) {
            newIndex += 1;
        }
        else {
            // next turn
            newIndex = 0;
            newRounds += 1;
        }
        exports.rooms[roomId] = Object.assign(Object.assign({}, exports.rooms[roomId]), { currentIndexOfDrawer: newIndex, rounds: newRounds });
    }
};
const getNewDrawer = (roomId) => {
    setNewDrawer(roomId);
    if (roomId in exports.rooms) {
        return exports.rooms[roomId].users[exports.rooms[roomId].currentIndexOfDrawer];
    }
};
exports.getNewDrawer = getNewDrawer;
const clearPoints = (roomId) => {
    if (roomId in exports.rooms) {
        exports.rooms[roomId] = Object.assign(Object.assign({}, exports.rooms[roomId]), { users: exports.rooms[roomId].users.map((user) => (Object.assign(Object.assign({}, user), { points: 0 }))) });
    }
};
exports.clearPoints = clearPoints;
const getRounds = (roomId) => {
    if (roomId in exports.rooms) {
        return exports.rooms[roomId].rounds;
    }
};
exports.getRounds = getRounds;
const getMaxRounds = (roomId) => {
    if (roomId in exports.rooms) {
        return exports.rooms[roomId].maxRounds;
    }
};
exports.getMaxRounds = getMaxRounds;
//# sourceMappingURL=rooms.js.map