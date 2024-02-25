import Header from "@/components/layout/Header";
import React from "react";

const RoomLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen">
      <div className="flex items-center justify-center flex-col">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default RoomLayout;
