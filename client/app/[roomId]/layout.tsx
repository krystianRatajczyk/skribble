import React from "react";

const RoomLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen">
      <div className="flex items-center justify-center h-full">
        <main className="flex-1 overflow-y-auto w-full h-full">{children}</main>
      </div>
    </div>
  );
};

export default RoomLayout;
