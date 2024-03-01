"use client";

import { useChat } from "@/hooks/use-chat-store";
import React from "react";
import ChatItem from "./chat-item";

const Chat = () => {
  const { messages } = useChat();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <p className="font-semibold text-xl">Chat</p>
      <div
        className="mt-3 dark:border-[#1e293b] border-[#dde9f9] border-[1px] rounded-md overflow-hidden overflow-y-auto no-scrollbar 
      h-full w-full dark:bg-[#050e1d]"
      >
        {messages.map((message, index) => (
          <ChatItem message={message} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Chat;