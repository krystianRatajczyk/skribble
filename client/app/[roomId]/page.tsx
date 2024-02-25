"use client";

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

  const leaveRoom = () => {
    socket.emit("leave-room", user, params?.roomId);
    socket.on("leaved-room", () => {
      router.replace("/");
    });
  };

  return (
    <div className="flex">
      <div>
        {members?.map((member) => (
          <div>{member.name}</div>
        ))}

        {user && (
          <button
            onClick={leaveRoom}
            className="px-4 py-2 bg-red-300 rounded-sm"
          >
            Leave
          </button>
        )}
      </div>
    </div>
  );
};

export default Room;
