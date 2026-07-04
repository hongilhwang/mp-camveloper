"use client";

import { useState } from "react";
import { Copy, CheckCircle2 } from "lucide-react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white text-xs font-medium transition-colors shrink-0"
    >
      {copied ? (
        <>
          <CheckCircle2 size={12} />
          복사됨
        </>
      ) : (
        <>
          <Copy size={12} />
          복사
        </>
      )}
    </button>
  );
}
