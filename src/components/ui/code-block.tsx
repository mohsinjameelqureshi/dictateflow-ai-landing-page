"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * A terminal-framed code block with a copy button whose own label becomes
 * `Copied` for 1600ms — the label matches the result. It does not say `Copy!`
 * and it does not fire a toast.
 *
 * The header strip is a plain title bar with the file/command context, not
 * macOS traffic lights: this is a Windows product.
 */
export function CodeBlock({
  code,
  label,
  title,
  className,
}: {
  code: string;
  /** Accessible name for the copy button, e.g. "Copy the build commands". */
  label: string;
  /** Shown in the header strip, e.g. "powershell". */
  title?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard access can be denied. Say nothing rather than claim success.
    }
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-card border border-line bg-surface-1",
        "shadow-[var(--shadow-panel)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-2/60 px-4 py-2.5">
        <span className="font-display text-[11px] uppercase tracking-[0.12em] text-fg-subtle">
          {title ?? "terminal"}
        </span>

        <button
          type="button"
          onClick={copy}
          aria-label={label}
          className={cn(
            "inline-flex h-8 items-center gap-1.5 rounded-[6px] px-2.5",
            "text-micro text-fg-muted",
            "transition-colors duration-[var(--dur-press)] ease-[var(--ease-out)]",
            "hover:bg-surface-3 hover:text-fg",
          )}
        >
          {copied ? (
            <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
          ) : (
            <Copy aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className="scroll-x bg-deep p-5">
        <pre className="font-mono text-code text-fg-muted">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
