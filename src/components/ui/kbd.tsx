import { cn } from "@/lib/cn";

/**
 * The amber keycap.
 *
 * Amber is the page's only colour outside the indigo accent, and it is
 * reserved for this component alone — it marks a physical key a finger
 * presses, which is a different job from "this is interactive". Never on a
 * button, badge, link or icon.
 *
 * The hard bottom edge plus the inset top highlight is what makes it read as
 * a moulded cap rather than a coloured chip; pressing collapses the edge and
 * drops the cap, so the depress is a real 3D move rather than a tint change.
 */
export function Kbd({
  children,
  pressed = false,
  className,
}: {
  children: React.ReactNode;
  pressed?: boolean;
  className?: string;
}) {
  return (
    <kbd
      className={cn(
        "inline-flex select-none items-center justify-center align-middle",
        "rounded-[7px] px-2 py-[5px]",
        "bg-key text-key-ink",
        "font-display text-[12.5px] font-semibold leading-none tracking-tight",
        "transition-[transform,box-shadow] ease-[var(--ease-out)]",
        "duration-[var(--dur-press)]",
        pressed
          ? "translate-y-[2px] shadow-[0_1px_0_0_var(--color-key-edge),inset_0_1px_0_0_rgb(255_255_255/0.25)]"
          : "shadow-[0_3px_0_0_var(--color-key-edge),inset_0_1px_0_0_rgb(255_255_255/0.4)]",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
