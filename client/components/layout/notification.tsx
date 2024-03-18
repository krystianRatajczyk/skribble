import React from "react";

interface NotificationProps {
  notification: string;
}

const Notification = ({ notification }: NotificationProps) => {
  return (
    <div
      className="w-full h-full flex items-center justify-center bg-[#d3d3d359] dark:bg-[#35394a]
  text-[#3a3939] dark:text-[#dcdadf] text-[20px] font-semibold"
    >
      {notification}
    </div>
  );
};

export default Notification;
