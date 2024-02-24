import React from "react";

interface RoomProps {
  params: { roomId: string };
}

const Room = ({ params }: RoomProps) => {
  return <div>{params?.roomId}</div>;
};

export default Room;
