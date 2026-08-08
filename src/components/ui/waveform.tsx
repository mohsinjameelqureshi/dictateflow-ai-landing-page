import { cn } from "@/lib/cn";

/**
 * Nine bars driven by a fixed amplitude array.
 *
 * A stylisation of speech — not a real analyser, and it never claims to be
 * reading a microphone. At rest the bars collapse and a single flat line
 * takes their place; nine collapsed bars would read as a dotted line rather
 * than a flat one.
 */
const AMPLITUDES = [0.3, 0.62, 0.94, 0.5, 1, 0.44, 0.82, 0.36, 0.58] as const;
const DELAYS = [0, 130, 60, 210, 30, 170, 90, 240, 120] as const;

export function Waveform({
  active = false,
  className,
}: {
  active?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative flex h-6 w-[62px] items-center", className)}
    >
      <span
        className={cn(
          "absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-[1px]",
          "bg-accent-text transition-opacity ease-[var(--ease-out)]",
          "duration-[var(--dur-state)]",
          active ? "opacity-0" : "opacity-70",
        )}
      />

      <div className="relative flex h-full items-center gap-[3px]">
        {AMPLITUDES.map((amplitude, i) => (
          <span
            key={i}
            className={cn(
              "block w-[3px] rounded-[1.5px] bg-accent-text",
              "origin-center transition-transform ease-[var(--ease-out)]",
              "duration-[var(--dur-state)]",
              active && "animate-[waveform-bar_900ms_ease-in-out_infinite]",
            )}
            style={{
              height: `${Math.round(amplitude * 24)}px`,
              transform: active ? undefined : "scaleY(0)",
              animationDelay: active ? `${DELAYS[i]}ms` : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
}
