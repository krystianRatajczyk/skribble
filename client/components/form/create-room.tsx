"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import CopyButton from "./copy-button";
import { Button } from "../ui/button";
import { socket } from "@/lib/socket";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { defaultStyle } from "@/constants/toast-style";
import { User } from "@/types/type";
import { useMembers } from "@/hooks/use-member-store";
import { useUser } from "@/hooks/use-user-store";
import { useGame } from "@/hooks/use-game-store";
import { useLanguage } from "@/hooks/use-language";

interface CreateRoomProps {
  roomId: string;
}

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Username must contain at least 2 characters")
    .max(30, "Username must not contain more than 30 characters"),
});

const CreateRoom = ({ roomId }: CreateRoomProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setMembers } = useMembers();
  const { setUser } = useUser();
  const { setCurrentDrawer } = useGame();
  const { language } = useLanguage();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { name: "" },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    socket.emit("create-room", { ...values, roomId });
  };

  useEffect(() => {
    socket.on("wrong-data", ({ message }: { message: string }) => {
      toast.error(message, defaultStyle);
    });

    socket.on(
      "joined-room",
      (user: User, members: User[], roomId: string, currentDrawer: User) => {
        toast.success("Created party ! 🎉", defaultStyle);

        setMembers(members);
        setUser({ ...user, isAdmin: true, points: 0 });
        setCurrentDrawer(currentDrawer);
        console.log(user, members);
        router.push(`/${roomId}`);
      }
    );
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-[15px] text-foreground">
                {language.usernameLabel}
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  className="px-4 bg-transparent focus-visible:ring-0 
                  focus-visible:ring-offset-0 border-[#1e293b] dark:text-[#949b94] dark:placeholder:text-[#949b94] placeholder:text-[#5b5c5b]"
                  placeholder="johndoe"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="flex flex-col space-y-2">
          <span className="font-semibold text-[15px]">
            {language.roomIdLabel}
          </span>
          <div className="h-10 flex items-center justify-between py-2 px-4 rounded-md border-[1px] border-[#1e293b] ">
            <span className="dark:text-[#949b94] text-[#5b5c5b] text-sm">
              {roomId}
            </span>
            <CopyButton roomId={roomId} />
          </div>
        </div>

        <Button type="submit" className="mt-1 w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            language.createRoom
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateRoom;
