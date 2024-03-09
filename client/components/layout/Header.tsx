import React from "react";
import ThemeToggle from "../theme-toggle";
import Rounds from "./rounds";
import Password from "./password";
import Timer from "./timer";

const Header = () => {
  return (
    <div className="w-full px-[100px] py-5 flex items-center justify-between dark:border-b-[#1e293b] border-b-[#dde9f9] border-b-[1px] ">
      <p className="font-semibold text-4xl">Skribble</p>
      <div className="flex items-center justify-between flex-1 px-[100px]">
        <Timer />
        <Password />
        <Rounds />
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Header;
