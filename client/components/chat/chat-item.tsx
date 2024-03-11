import { Message } from "@/types/type";
import React from "react";

interface ChatItemProps {
  message: Message;
}

const ChatItem = ({ message }: ChatItemProps) => {
  if (message.isGuessed) {
    return (
      <div className="px-3 py-1">
        <span className="text-sm font-bold text-emerald-400">
          {message.author.name} guessed the word !
        </span>
      </div>
    );
  }

  return (
    <div className="px-3 py-1">
      <span
        className={`text-sm font-bold ${
          message.ownMessage
            ? "text-[#7dad45]"
            : message.isWinner
            ? "text-blue-300"
            : ""
        }`}
      >
        {message.author.name}:{" "}
      </span>
      <span
        className={`text-md font-normal ${
          message.ownMessage
            ? "text-[#7dad45]"
            : message.isWinner
            ? "text-blue-300"
            : ""
        }`}
      >
        {message.message}
      </span>
    </div>
  );
};

export default ChatItem;
