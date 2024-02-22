import ThemeToggle from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center pb-5">
      <div className="w-full flex justify-end p-5">
        <ThemeToggle />
      </div>
    </div>
  );
}
