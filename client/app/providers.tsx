import { ThemeProvider } from "@/components/providers/theme-provider";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
      storageKey="skribble-theme"
    >
      {children}
    </ThemeProvider>
  );
};

export default Providers;
