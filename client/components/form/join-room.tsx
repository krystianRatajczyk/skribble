"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";

const formSchema = z.object({
  username: z
    .string()
    .min(2, "Username must contain at least 2 characters")
    .max(30, "Username must not contain more than 30 characters"),
  id: z
    .string()
    .min(21, "Id must contain exactly 21 characters")
    .max(21, "Id must contain exactly 21 characters"),
});

const JoinRoom = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { username: "", id: "" },
    resolver: zodResolver(formSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-transparent w-full border-[#1e293b] dark:hover:bg-[#1e293b] 
          hover:bg-[#f1f5f9]"
        >
          Join a room
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-[#020817] border-[#1e293b] max-w-[420px] w-[90vw]">
        <DialogTitle className="mb-2">Join a room</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
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
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="px-4 bg-transparent focus-visible:ring-0 
                  focus-visible:ring-offset-0 border-[#1e293b] dark:text-[#949b94] dark:placeholder:text-[#949b94] placeholder:text-[#5b5c5b]"
                      placeholder="Room ID"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-1 w-full ">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Join"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinRoom;
