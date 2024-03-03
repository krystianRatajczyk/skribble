import { Room, User } from "../types/type";

export let rooms: Record<string, Room> = {};

export const addUser = (user: User, roomId: string) => {
  if (!(roomId in rooms)) {
    rooms[roomId] = { users: [user], currentIndexOfDrawer: 0 };
  } else {
    rooms[roomId].users.push(user);
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
