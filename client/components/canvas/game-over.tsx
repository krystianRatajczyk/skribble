import { useMembers } from "@/hooks/use-member-store";
import { User } from "@/types/type";
import React, { useEffect } from "react";
import Place from "../leaderboard/place";
import { Button } from "../ui/button";
import { useUser } from "@/hooks/use-user-store";
import { useGame } from "@/hooks/use-game-store";
import { socket } from "@/lib/socket";
import { useParams } from "next/navigation";
import { useChat } from "@/hooks/use-chat-store";
import { useLanguage } from "@/hooks/use-language";

const GameOver = () => {
  const { roomId } = useParams();
  const { members, setMembers } = useMembers();
  const { user } = useUser();
  const { clearChat } = useChat();
  const { language } = useLanguage();

  const {
    setGameState,
    setPassword,
    clearWinners,
    setDrawtime,
    setRounds,
    setCurrentDrawer,
    setTime,
    setRoundState,
  } = useGame();

  let prevPoints = -1;
  let prevIndex = -1;

  const memberWithPlace: (User & { place: number })[] = members.map(
    (member, index) => {
      const samePointsAsPrev = member.points === prevPoints;
      const currentIndex = samePointsAsPrev ? prevIndex : index + 1;
      prevPoints = member.points;
      prevIndex = currentIndex;
      return { ...member, place: currentIndex };
    }
  );

  useEffect(() => {
    socket.on("restarted-game", (newMembers) => {
      setMembers(newMembers);
      setGameState(false);
      setPassword(null);
      clearWinners();
      setDrawtime(null);
      setRounds(null);
      setCurrentDrawer(null);
      setRoundState(false);
      setTime(null);
      clearChat();
    });

    return () => {
      socket.off("restarted-game");
    };
  }, [socket]);

  const newGame = () => {
    socket.emit("restart-game", roomId);
  };

  return (
    <div className="flex items-center justify-center bg-[#d3d3d359] dark:bg-[#35394a] w-full h-full text-black flex-col gap-[50px]">
      <span className="font-semibold text-[25px] flex items-center justify-center gap-2 dark:text-[#dcdadf] text-[#5d5c5e]">
        <span className="font-bold text-[35px] -mt-1.5 dark:text-[#caa36d] text-[#b08e3c]">
          {memberWithPlace[0]?.name}
        </span>
        {language.winner}
      </span>
      <div className="flex items-end justify-center gap-1 ">
        {memberWithPlace.length > 1 ? (
          <Place
            user={memberWithPlace[1]}
            text="dark:text-[#c0c0c0] text-[#5d5c5e]"
            border="dark:border-[#c0c0c0] border-[#5d5c5e]"
            className="h-[60px] border-r-[0px] rounded-tr-none "
          />
        ) : (
          <div className="w-[300px]" />
        )}
        {/*2nd */}
        {memberWithPlace.length > 0 ? (
          <Place
            user={memberWithPlace[0]}
            text="dark:text-[#ffc532] text-[#94762c]"
            border="dark:border-[#ffc532] border-[#94762c]"
            className="h-[80px]"
            first
          />
        ) : (
          <div className="w-[300px]" />
        )}
        {/* //1st */}
        {memberWithPlace.length > 2 ? (
          <Place
            user={memberWithPlace[2]}
            text="dark:text-[#be6029] text-[#63361c] "
            border="dark:border-[#be6029] border-[#63361c]"
            className="h-[40px] border-l-[0px] rounded-tl-none"
            // 3rd
          />
        ) : (
          <div className="w-[300px]" />
        )}
      </div>
      {user?.isAdmin && (
        <Button
          className="bg-white dark:bg-[#091125] text-[#091125] dark:text-white border-[2px] dark:border-[#1e293b] border-[#cdd3db] px-4 py-2 text-[19px] hover:dark:bg-[#191e2c] hover:bg-[#dfdddd] mt-5"
          onClick={newGame}
        >
          {language.newGame}
        </Button>
      )}
    </div>
  );
};

export default GameOver;
