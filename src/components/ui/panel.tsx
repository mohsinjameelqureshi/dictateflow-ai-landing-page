import { cn } from "@/lib/cn";

/**
 * The card surface. Modern Dark Cinema: a lifted tone, a hairline in rgba
 * rather than a solid grey, a 16px radius, and a soft inset top edge that
 * catches an implied light source. On light ground the same token resolves to
 * a conventional soft shadow.
 */
export function Panel({
  children,
  className,
  as: Tag = "div",
  tone = "raised",
  accentEdge = false,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "aside" | "figure";
  /** `raised` sits above the page; `sunken` recedes into it. */
  tone?: "raised" | "sunken";
  /** A 2px accent left border — the privacy ledger and the callout use it. */
  accentEdge?: boolean;
  /** Adds a hover lift. Only for panels that are themselves a link/button. */
  interactive?: boolean;
}) {
  return (
    <Tag
      className={cn(
        "rounded-card border border-line p-5 md:p-7",
        tone === "raised"
          ? "bg-surface-1 shadow-[var(--shadow-panel)]"
          : "bg-surface-2/60",
        accentEdge && "border-l-2 border-l-accent",
        interactive && [
          "transition-[border-color,background-color,transform]",
          "duration-[var(--dur-state)] ease-[var(--ease-out)]",
          "hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-2",
        ],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
