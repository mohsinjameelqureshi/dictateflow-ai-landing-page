"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { setTheme, useTheme, type Theme } from "@/lib/theme";
import { cn } from "@/lib/cn";

const OPTIONS = [
  { value: "dark", label: "Dark", icon: Moon },
  { value: "light", label: "Light", icon: Sun },
  { value: "system", label: "System", icon: Monitor },
] as const satisfies ReadonlyArray<{
  value: Theme;
  label: string;
  icon: typeof Sun;
}>;

/**
 * Icon-only, so it sits quietly in the footer rather than competing with the
 * link columns. Dark leads the group because dark is the page's primary mode.
 *
 * Dropping the visible text means each control needs its name supplied
 * another way: `aria-label` carries it for assistive tech, `title` gives
 * sighted mouse users the same string on hover, and the current choice is
 * announced by `aria-pressed` rather than by the filled surface alone.
 */
export function ThemeToggle() {
  const theme = useTheme();

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className="inline-flex shrink-0 items-center gap-0.5 rounded-control border border-line bg-surface-1 p-1"
    >
      {OPTIONS.map(({ value, label, icon: Icon }) => {
        const selected = theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={selected}
            aria-label={`${label} theme`}
            title={`${label} theme`}
            onClick={() => setTheme(value)}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-[7px]",
              "transition-colors duration-[var(--dur-press)] ease-[var(--ease-out)]",
              selected
                ? "bg-surface-3 text-fg"
                : "text-fg-muted hover:bg-surface-2 hover:text-fg",
            )}
          >
            <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
          </button>
        );
      })}
    </div>
  );
}
