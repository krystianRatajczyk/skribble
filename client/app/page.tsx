"use client";

import CreateRoom from "@/components/form/create-room";
import JoinRoom from "@/components/form/join-room";
import ThemeToggle from "@/components/theme-toggle";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

export default function Home() {
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    setRoomId(nanoid());
  }, []);

  return (
    <div className="flex h-screen flex-col items-center pb-5">
      <div className="w-full flex justify-end p-5">
        <ThemeToggle />
      </div>
      <div className="pt-[13vh]">
        <Card className="w-[90vw] max-w-[400px] dark:bg-[#020817] border-[#1e293b]">
          <CardHeader>
            <CardTitle>Skribble</CardTitle>
            <CardDescription>
              Draw and guess word with your friends in real time!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            <CreateRoom roomId={roomId} />
            <div className="flex gap-x-3 items-center">
              <div className="flex-1 h-[1px] bg-[#1e293b]" />
              <span className="text-[#5b5c5b] dark:text-[#949b94] text-sm">
                OR
              </span>
              <div className="flex-1 h-[1px] bg-[#1e293b]" />
            </div>
            <JoinRoom />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
