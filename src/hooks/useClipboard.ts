import { useState } from "react";

export function useClipboard() {
  const [isCopied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return { copyToClipboard, isCopied };
}
