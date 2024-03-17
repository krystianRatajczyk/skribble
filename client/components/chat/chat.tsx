"use client";

import { useChat } from "@/hooks/use-chat-store";
import React, { useEffect, useRef } from "react";
import ChatItem from "./chat-item";
import { useLanguage } from "@/hooks/use-language";

const Chat = () => {
  const { messages } = useChat();
  const { language } = useLanguage();

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-full flex flex-col items-center justify-center flex-1 overflow-auto mt-3">
      <p className="font-semibold text-xl">{language.chat}</p>
      <div
        ref={chatContainerRef}
        className="mt-3 dark:border-[#1e293b] border-[#dde9f9] border-[1px] rounded-md overflow-hidden overflow-y-auto no-scrollbar 
      h-full w-full dark:bg-[#050e1d] flex-1"
      >
        {messages.map((message, index) => (
          <ChatItem message={message} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Chat;
