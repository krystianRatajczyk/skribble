import React from "react";
import ThemeToggle from "../theme-toggle";

const Header = () => {
  return (
    <div className="w-full px-[100px] py-3 pt-6 flex items-center justify-between border-b-[#1e293b] border-b-[1px]">
      <p className="font-semibold text-4xl">Skribble</p>
      <ThemeToggle />
    </div>
  );
};

export default Header;
