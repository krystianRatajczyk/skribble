import { Check, Languages } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/hooks/use-language";

const LanguageToggle = () => {
  const { setLanguage, short } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[6rem]">
        <DropdownMenuItem
          onClick={() => setLanguage("PL")}
          className="w-full flex items-center justify-between"
        >
          {short === "PL" ? <Check className="w-4 h-4" /> : <div />}
          PL
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("ENG")}
          className="w-full flex items-center justify-between"
        >
          {short === "ENG" ? <Check className="w-4 h-4" /> : <div />}
          ENG
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
