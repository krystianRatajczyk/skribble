import React, { useState } from "react";
import { Button } from "../ui/button";
import { socket } from "@/lib/socket";
import { useUser } from "@/hooks/use-user-store";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface LeaveRoomProps {
  roomId: string;
}

const LeaveButton = ({ roomId }: LeaveRoomProps) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const leaveRoom = () => {
    setIsLeaving(true);
    socket.emit("leave-room", user, roomId);
    socket.on("leaved-room", () => {
      router.replace("/");
      setIsLeaving(false);
    });
  };

  return (
    <Button
      variant="ghost"
      onClick={leaveRoom}
      className="w-full bg-red-600 mt-3 dark:hover:bg-[#1e293b] hover:bg-[#c5c5c5]"
    >
      {isLeaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Leave"}
    </Button>
  );
};

export default LeaveButton;
