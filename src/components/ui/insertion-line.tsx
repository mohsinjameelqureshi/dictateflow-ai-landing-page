import { cn } from "@/lib/cn";

export type InsertionLineState = "idle" | "pasted";
export type CaretMode = "blink" | "pulse" | "none";

/**
 * The signature element: a single-line mock text field standing in for "the
 * window that already had focus".
 *
 * It is deliberately not a fake screenshot — one line, no window chrome, no
 * title bar, no traffic lights. It never claims to be UI.
 *
 * In this system it is styled as a *sunken* field: the surface recedes below
 * the panel it sits in, with an inset top shadow, so it reads as somewhere
 * text lands rather than another card. The text arrives all at once, because
 * insertion is a clipboard paste and not simulated typing.
 */
export function InsertionLine({
  text = "",
  state = "idle",
  caret = "blink",
  label,
  className,
}: {
  text?: string;
  state?: InsertionLineState;
  caret?: CaretMode;
  /** Optional mono tag pinned to the left, e.g. the app being typed into. */
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-[60px] items-center gap-3 overflow-hidden rounded-control",
        "border border-line bg-deep px-4",
        "shadow-[inset_0_1px_3px_rgb(0_0_0/0.28)]",
        className,
      )}
    >
      {label ? (
        <span
          aria-hidden="true"
          className={cn(
            "hidden shrink-0 rounded-[5px] border border-line bg-surface-2",
            "px-2 py-1 font-display text-[10.5px] uppercase tracking-[0.1em]",
            "text-fg-subtle sm:inline-block",
          )}
        >
          {label}
        </span>
      ) : null}

      <span className="flex min-w-0 flex-1 items-center font-mono text-[15px] text-fg">
        <span
          className={cn(
            "truncate rounded-[3px]",
            state === "pasted" &&
              "animate-[paste-flash_var(--dur-state)_var(--ease-out)_both]",
          )}
        >
          {text}
        </span>
        {caret !== "none" ? (
          <span
            aria-hidden="true"
            className={cn(
              "ml-px inline-block h-[21px] w-0.5 shrink-0 rounded-[1px] bg-accent-text",
              caret === "blink" &&
                "animate-[caret-blink_1060ms_step-end_infinite]",
              caret === "pulse" &&
                "animate-[caret-wait-pulse_800ms_ease-in-out_infinite]",
            )}
          />
        ) : null}
      </span>
    </div>
  );
}
