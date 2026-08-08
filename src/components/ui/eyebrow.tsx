import { cn } from "@/lib/cn";

/**
 * The section label, now a chip rather than a rail marker: mono, uppercase,
 * wide tracking, on a sunken pill with a hairline. A small accent dot carries
 * the one colour so the label itself can stay quiet.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-chip border border-line",
        "bg-surface-2/70 px-2.5 py-1.5",
        "font-display text-eyebrow uppercase text-fg-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
      />
      {children}
    </span>
  );
}
