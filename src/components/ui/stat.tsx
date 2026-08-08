import { cn } from "@/lib/cn";

/**
 * Large numeral, small label beneath. The number dominates — never the
 * reverse. Mono and tabular so a row of them aligns on the digits.
 */
export function Stat({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="font-display text-stat tabular-nums text-fg">
        {value}
      </span>
      <span className="text-micro text-fg-muted">{label}</span>
    </div>
  );
}
