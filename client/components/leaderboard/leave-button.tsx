import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { socket } from "@/lib/socket";
import { useUser } from "@/hooks/use-user-store";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface LeaveRoomProps {
  roomId: string;
}

const LeaveButton = ({ roomId }: LeaveRoomProps) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const { language } = useLanguage();

  const leaveRoom = () => {
    setIsLeaving(true);
    socket.emit("leave-room", user, roomId);
  };

  useEffect(() => {
    socket.on("leaved-room", () => {
      router.replace("/");
      setIsLeaving(false);
    });

    return () => {
      socket.off("leaved-room");
    };
  }, []);

  useEffect(() => {
    const handleWindowClose = () => {
      socket.emit("leave-room", user, roomId);
    };

    window.addEventListener("beforeunload", handleWindowClose);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, []);

  return (
    <Button
      variant="ghost"
      onClick={leaveRoom}
      className="w-full bg-red-600 mt-3 dark:hover:bg-[#1e293b] hover:bg-[#c5c5c5] text-white"
    >
      {isLeaving ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        language.leave
      )}
    </Button>
  );
};

export default LeaveButton;
