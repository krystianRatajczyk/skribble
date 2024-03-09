import { useGame } from "@/hooks/use-game-store";
import React from "react";

const Password = () => {
  const { password } = useGame();

  if (!password) {
    return null;
  }

  return <div>Password</div>;
};

export default Password;
