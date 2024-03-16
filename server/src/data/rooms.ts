import { Room, User } from "../types/type";

export let rooms: Record<string, Room> = {};

export const addUser = (user: User, roomId: string) => {
  if (!(roomId in rooms)) {
    rooms[roomId] = {
      users: [{ ...user, isAdmin: true, points: 0 }],
      currentIndexOfDrawer: 0,
      currentPassword: "",
      time: 0,
      roundState: true,
    };
  } else {
    rooms[roomId].users.push({ ...user, isAdmin: false, points: 0 });
  }
};

export const getUsers = (roomId: string) => {
  return rooms[roomId];
};

export const isRoomCreated = (roomId: string): boolean => {
  return roomId in rooms;
};

export const getMembers = (roomId: string) => {
  if (roomId in rooms) {
    return rooms[roomId].users;
  }
};

export const getCurrentDrawer = (roomId: string) => {
  if (roomId in rooms) {
    return rooms[roomId].users[rooms[roomId].currentIndexOfDrawer];
  }
};

export const removeUser = (userId: string, roomId: string) => {
  rooms = {
    ...rooms,
    [roomId]: {
      ...rooms[roomId],
      users: rooms[roomId].users.filter((user) => user.id !== userId),
    },
  };
};

export const deleteRoom = (roomId: string) => {
  delete rooms[roomId];
};

export const setPassword = (roomId: string, password: string) => {
  if (roomId in rooms) {
    rooms[roomId].currentPassword = password;
  }
};

export const getPassword = (roomId: string) => {
  if (roomId in rooms && rooms[roomId].currentPassword !== "") {
    return rooms[roomId].currentPassword;
  }
};

export const setPoints = (roomId: string, user: User, newPoints: number) => {
  if (roomId in rooms) {
    rooms[roomId] = {
      ...rooms[roomId],
      users: rooms[roomId].users.map((u) =>
        u.id === user.id ? { ...user, points: newPoints } : u
      ),
    };
  }
};

export const getTime = (roomId: string) => {
  if (roomId in rooms) {
    return rooms[roomId].time;
  }
};

export const setTime = (roomId: string, time: number) => {
  if (roomId in rooms) {
    rooms[roomId] = { ...rooms[roomId], time };
  }
};

export const reduceTime = (roomId: string) => {
  if (roomId in rooms) {
    rooms[roomId] = { ...rooms[roomId], time: rooms[roomId].time - 1 };
  }
};

export const setRoundState = (roomId: string, state: boolean) => {
  if (roomId in rooms) {
    rooms[roomId] = { ...rooms[roomId], roundState: state };
  }
};

export const getRoundState = (roomId: string) => {
  if (roomId in rooms) {
    return rooms[roomId].roundState;
  }
};
