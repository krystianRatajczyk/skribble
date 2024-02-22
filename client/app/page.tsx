import { socket } from "@/lib/socket";

export default function Home() {
  socket.emit("event", "HELLO WORLD")

  return <div>Hello</div>;
}
