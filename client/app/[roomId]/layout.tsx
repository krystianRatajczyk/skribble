import Header from "@/components/layout/Header";
import React from "react";

const RoomLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen">
      <div className="flex items-center justify-center flex-col h-full">
        <Header />
        <main className="flex-1 overflow-y-auto w-full">{children}</main>
      </div>
    </div>
  );
};

export default RoomLayout;
