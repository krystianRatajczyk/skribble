import React from "react";

interface NotificationProps {
  notification: string;
}

const Notification = ({ notification }: NotificationProps) => {
  return (
    <div
      className="w-full h-full flex items-center justify-center bg-[#4e4e4e59] 
  text-black text-[20px] font-semibold"
    >
      {notification}
    </div>
  );
};

export default Notification;
