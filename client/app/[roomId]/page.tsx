"use client";

import LeaderBoard from "@/components/leaderboard/leaderboard";
import LeaveButton from "@/components/leaderboard/leave-button";
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
    <div className="h-full flex px-3">
      <div className="flex justify-between items-center flex-col pr-3 py-3 border-r-[1px] border-[#1e293b] ">
        <div className="flex overflow-auto">
          <LeaderBoard />
        </div>
        <LeaveButton roomId={params?.roomId} />
      </div>
      <div className="flex-1 bg-white h-full">
        <div className=""></div>
      </div>
    </div>
  );
};

export default Room;
