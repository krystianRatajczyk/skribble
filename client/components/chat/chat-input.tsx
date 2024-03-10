"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { SendHorizontal } from "lucide-react";
import { socket } from "@/lib/socket";
import { useParams } from "next/navigation";
import { Message } from "@/types/type";
import { useUser } from "@/hooks/use-user-store";
import { useChat } from "@/hooks/use-chat-store";
import { useGame } from "@/hooks/use-game-store";

const formSchema = z.object({
  message: z.string().min(1),
});

const ChatInput = () => {
  const { user } = useUser();
  const { setMessages } = useChat();
  const { password, currentDrawer } = useGame();
  const { roomId } = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { message: "" },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const userMessage = {
      message: values.message,
      author: { id: user?.id!, name: user?.name!, isAdmin: user?.isAdmin! },
      isGuessed:
        password?.toLocaleLowerCase() === values.message.toLocaleLowerCase() && user?.id !== currentDrawer?.id,
      ownMessage: user?.id === currentDrawer?.id && password !== null,
    };

    if (user) {
      setMessages(userMessage);

      if (!userMessage.ownMessage) {
        socket.emit("send-message", { userMessage, roomId });
      }
    }

    form.reset();
  };

  useEffect(() => {
    socket.on("receive-message", (message: Message) => {
      setMessages(message);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [socket]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center justify-center border-[1px] dark:border-[#1e293b] border-[#dde9f9] rounded-md px-2 pr-4">
                  <Input
                    className="w-fullbg-transparent focus-visible:ring-0 
                focus-visible:ring-offset-0 px-2 border-0 dark:text-[#949b94] dark:placeholder:text-[#949b94] placeholder:text-[#5b5c5b]"
                    placeholder="Message"
                    {...field}
                  />
                  <SendHorizontal
                    className="dark:text-[#1e293b] text-[#9b9b9b]"
                    onClick={form.handleSubmit(onSubmit)}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ChatInput;
