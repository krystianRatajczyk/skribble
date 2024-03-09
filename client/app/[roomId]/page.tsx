"use client";

import DrawingCanvas from "@/components/canvas/drawing-canvas";
import Chat from "@/components/chat/chat";
import ChatInput from "@/components/chat/chat-input";
import Header from "@/components/layout/header";
import LeaderBoard from "@/components/leaderboard/leaderboard";
import LeaveButton from "@/components/leaderboard/leave-button";
import ThemeToggle from "@/components/theme-toggle";
import { defaultStyle } from "@/constants/toast-style";
import { useMembers } from "@/hooks/use-member-store";
import { useUser } from "@/hooks/use-user-store";
import { socket } from "@/lib/socket";
import { User } from "@/types/type";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

interface RoomProps {
  params: {
    roomId: string;
  };
}

const Room = ({ params }: RoomProps) => {
  const { members, setMembers } = useMembers();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user || !members.find((member) => member.id === user.id)) {
      router.push("/");
    }
  }, [user, members]);

  useEffect(() => {
    socket.on("update-members", (members: User[]) => {
      setMembers(members);
    });

    socket.on("send-notification", (message: string, type: string) => {
      if (type === "success") toast.success(message, defaultStyle);
      else if (type === "emoji")
        toast(message, { icon: "😔", ...defaultStyle });
    });

    return () => {
      socket.off("update-members");
      socket.off("send-notification");
    };
  }, [socket]);

  return (
    <div className="h-full flex">
      <div className="flex justify-between items-center flex-col">
        <div className="h-[70px] border-b-[1px] dark:border-[#1e293b] border-[#dde9f9] w-full flex items-center justify-center ">
          <p className="font-semibold text-4xl ">Skribble</p>
        </div>
        <div className="flex overflow-auto px-3 flex-1 border-r-[1px] dark:border-[#1e293b] border-[#dde9f9]">
          <LeaderBoard />
        </div>
        <div className="px-3 w-full border-r-[1px] dark:border-[#1e293b] border-[#dde9f9]">
          <div className="pb-3">
            <LeaveButton roomId={params?.roomId} />
          </div>
        </div>
      </div>
      <div className="flex-1 bg-white h-full flex flex-col">
        <Header />
        <DrawingCanvas />
      </div>
      <div className="flex justify-start items-center flex-col w-[320px] h-full">
        <div className="w-full flex items-center justify-center h-[70px] border-b-[1px] dark:border-[#1e293b] border-[#dde9f9]">
          <ThemeToggle />
        </div>
        <div className="flex min-h-0 flex-1 h-full w-full px-4 flex-col border-l-[1px] dark:border-[#1e293b] border-[#dde9f9] gap-3">
          <Chat />
          <div className="w-full mb-4 ">
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
