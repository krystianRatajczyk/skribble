import { Message } from "@/types/type";
import React from "react";

interface ChatItemProps {
  message: Message;
}

const ChatItem = ({ message }: ChatItemProps) => {
  return (
    <div className="px-3 py-1">
      <span className="text-sm font-bold">{message.author.name}: </span>
      <span className="text-md font-normal">{message.message}</span>
    </div>
  );
};

export default ChatItem;
