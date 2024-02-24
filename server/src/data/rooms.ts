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
