"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { PartyPopper, RefreshCw, Timer } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMembers } from "@/hooks/use-member-store";
import { useParams } from "next/navigation";
import CopyButton from "../form/copy-button";
import { socket } from "@/lib/socket";
import { useGame } from "@/hooks/use-game-store";
import { useUser } from "@/hooks/use-user-store";
import { useLanguage } from "@/hooks/use-language";

const formSchema = z.object({
  drawtime: z.string().min(1, "Please select drawtime"),
  rounds: z.string().min(1, "Please select rounds"),
});

const GameSettings = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { members } = useMembers();
  const { user } = useUser();
  const { language } = useLanguage();
  const { roomId } = useParams() as { roomId: string };
  const { setRounds, setDrawtime, setGameState, setRoundState } = useGame();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { drawtime: "", rounds: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (members.length <= 1) {
      return setModalOpen(true);
    }

    setGameState(true);
    setRounds(+values.rounds);
    setDrawtime(+values.drawtime);
    setRoundState(true);

    socket.emit("start-game", { ...values, roomId, currentDrawer: user });
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#4e4e4e59] dark:bg-[#35394a] text-black">
      <Dialog open={modalOpen} onOpenChange={() => setModalOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-1">{language.cantStart}</DialogTitle>
            <DialogDescription>
              {language.cantStartDescription}
              <div className="flex gap-1 flex-row items-center mt-3 gap-x-3">
                <span className="font-semibold text-[15px]">
                  {language.roomIdLabel}
                </span>
                <div className="flex items-center justify-between py-2 px-4 rounded-md border-[1px] border-[#1e293b] gap-4">
                  <span className="dark:text-[#949b94] text-[#5b5c5b] text-sm">
                    {roomId}
                  </span>
                  <CopyButton roomId={roomId} />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Card className="w-[90vw] max-w-[400px] dark:bg-[#020817] dark:border-[#1e293b] border-[#b7b8b9]">
        <CardHeader>
          <CardTitle>{language.gameSettings}</CardTitle>
          <CardDescription>{language.gameSettingsDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="drawtime"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-x-2">
                        <Timer />
                        {language.drawtimeLabel}
                      </div>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px] ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder={language.drawtimeLabel} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from(
                            { length: 11 },
                            (_, index) => (index + 2) * 10
                          ).map((value) => (
                            <SelectItem value={value.toString()} key={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rounds"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-0">
                    <div className="w-full flex items-center justify-between ">
                      <div className="flex items-center gap-x-2">
                        <RefreshCw />
                        {language.roundsLabel}
                      </div>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px] ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder={language.roundsLabel} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from(
                            { length: 10 },
                            (_, index) => index + 1
                          ).map((value) => (
                            <SelectItem value={value.toString()} key={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="flex gap-x-3 items-center" type="submit">
                <PartyPopper />
                <span className="text-semibold text-lg">{language.play}</span>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameSettings;
