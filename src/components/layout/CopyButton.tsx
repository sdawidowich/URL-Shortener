"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { CopyIcon, CheckIcon } from "lucide-react";

export function CopyButton({label, copyText}: {label: string, copyText: string}) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!isCopied) {
        try {
            await navigator.clipboard.writeText(copyText);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1500);
        } catch (err) {
            console.error("Failed to copy text: ", err);
            toast({
                title: "Error",
                description: "Failed to copy text. Please try again.",
                variant: "destructive",
            });
        }
    }
  };

  return (
      <Button
        onClick={handleCopy}
        variant="outline"
        className="max-w-36 mb-1"
        aria-label={isCopied ? "Copied to clipboard" : "Copy to clipboard"}
      >
        {isCopied ? (
          <>
            <CheckIcon className="mr-2 h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <CopyIcon className="mr-2 h-4 w-4" />
            {label}
          </>
        )}
      </Button>
  );
}
