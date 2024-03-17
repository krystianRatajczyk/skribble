import React from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/hooks/use-language";

interface ClearButtonProps {
  clear: () => void;
}

const ClearButton = ({ clear }: ClearButtonProps) => {
  const { language } = useLanguage();
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" onClick={clear}>
            <Trash2 className="w-5 h-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{language.clear}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ClearButton;
