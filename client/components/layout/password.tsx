import { useGame } from "@/hooks/use-game-store";
import { useLanguage } from "@/hooks/use-language";
import { useUser } from "@/hooks/use-user-store";
import React from "react";

const Password = () => {
  const { password, currentDrawer, winners } = useGame();
  const { user } = useUser();
  const { language } = useLanguage();

  if (!password) {
    return null;
  }

  const isWinner = !!winners.find((winner) => winner.id === user?.id);

  return (
    <div className="font-semibold text-xl flex items-center flex-col justify-between h-full py-4">
      <span className="font-normal text-xs">
        {currentDrawer?.id === user?.id
          ? language.drawThis
          : isWinner
          ? language.wordWas
          : language.guessThis}
      </span>
      {currentDrawer?.id === user?.id || isWinner ? (
        <div>{password}</div>
      ) : (
        <div className="relative ">
          <div className="flex items-center justify-center gap-1">
            {Array.from(password).map((char, index) => (
              <div
                className={`w-4 h-[2px] ${
                  char !== " " && "dark:bg-white bg-[#091125]"
                }`}
                key={index}
              />
            ))}
          </div>
          <span className="absolute -right-3 bottom-1 text-[11px]">
            {password.length}
          </span>
        </div>
      )}
    </div>
  );
};

export default Password;
