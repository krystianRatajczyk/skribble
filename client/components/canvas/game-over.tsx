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

const GameOver = () => {
  const { roomId } = useParams();
  const { members, setMembers } = useMembers();
  const { user } = useUser();
  const { clearChat } = useChat();

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
    <div className="flex items-center justify-center bg-[#4a4a4d] w-full h-full text-black flex-col gap-[50px]">
      <span className="font-semibold text-[25px] flex items-center justify-center gap-2 text-[#dcdadf]">
        <span className="font-bold text-[35px] -mt-1.5 text-[#ffc87d]">
          {memberWithPlace[0]?.name}
        </span>
        is the winner!
      </span>
      <div className="flex items-end justify-center gap-1 ">
        <Place
          user={memberWithPlace[1]}
          color="#c0c0c0"
          className="h-[60px] border-r-[0px] rounded-tr-none"
        />
        {/*2nd */}
        {memberWithPlace.length > 1 && (
          <Place
            user={memberWithPlace[0]}
            color="#ffc532"
            className="h-[80px]"
          /> //1st
        )}
        {memberWithPlace.length > 2 && (
          <Place
            user={memberWithPlace[2]}
            color="#be6029"
            className="h-[40px] border-l-[0px] rounded-tl-none"
          /> //3rd
        )}
      </div>
      {user?.isAdmin && (
        <Button
          className="bg-[#091125] text-white border-[2px] dark:border-[#1e293b] border-[#dde9f9] px-4 py-2 text-[19px] hover:bg-[#1f2535] mt-5"
          onClick={newGame}
        >
          New Game
        </Button>
      )}
    </div>
  );
};

export default GameOver;
