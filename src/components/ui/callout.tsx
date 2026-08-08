import { cn } from "@/lib/cn";

/**
 * A panel with a 2px accent left edge and a faint accent wash.
 *
 * Not red, not amber, no warning triangle: styling honest disclosure as a
 * warning teaches the reader to treat it as one. This is an explanation given
 * calmly by someone who is not worried.
 */
export function Callout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-card border border-line",
        "border-l-2 border-l-accent bg-surface-1 p-6 md:p-8",
        "shadow-[var(--shadow-panel)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-accent-soft opacity-60"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
