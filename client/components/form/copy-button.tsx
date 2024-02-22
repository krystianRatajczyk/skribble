import { Check, Copy } from "lucide-react";
import React, { useEffect, useState } from "react";

interface CopyButtonProps {
  roomId: string;
}

const CopyButton = ({ roomId }: CopyButtonProps) => {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => setHasCopied(false), 2000);

      return () => clearTimeout(timeout);
    }
  }, [hasCopied]);

  const copy = () => {
    navigator.clipboard.writeText(roomId);
    setHasCopied(true);
  };

  return (
    <button onClick={copy} className="h-fit rounded-sm p-0 hover:bg-background">
      {hasCopied ? (
        <Check className="w-3.5 h-3.5 dark:text-[#949b94] text-[#5b5c5b]" />
      ) : (
        <Copy className="w-3.5 h-3.5 dark:text-[#949b94] text-[#5b5c5b]" />
      )}
    </button>
  );
};

export default CopyButton;
