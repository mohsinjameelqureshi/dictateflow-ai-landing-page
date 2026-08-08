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
 * Dark leads the group because dark is the page's primary mode.
 *
 * The selected option is marked by a filled surface *and* aria-pressed, never
 * by colour alone.
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
            onClick={() => setTheme(value)}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-[7px] px-2.5 text-micro",
              "transition-colors duration-[var(--dur-press)] ease-[var(--ease-out)]",
              selected
                ? "bg-surface-3 text-fg"
                : "text-fg-muted hover:text-fg",
            )}
          >
            <Icon aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
