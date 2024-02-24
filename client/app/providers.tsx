import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "react-hot-toast";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
      storageKey="skribble-theme"
    >
      <Toaster position="bottom-right" reverseOrder={false} />
      {children}
    </ThemeProvider>
  );
};

export default Providers;
