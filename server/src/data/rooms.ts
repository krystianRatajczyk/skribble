import { User } from "../types/type";

export let rooms: Record<string, User[]> = {};

export const addUser = (user: User, roomId: string) => {
  if (!(roomId in rooms)) {
    rooms[roomId] = [user];
  } else {
    rooms[roomId].push(user);
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
    return rooms[roomId];
  }
};

export const removeUser = (userId: string, roomId: string) => {
  rooms = {
    ...rooms,
    [roomId]: rooms[roomId].filter((user) => user.id !== userId),
  };
};

export const deleteRoom = (roomId: string) => {
  delete rooms[roomId];
};
