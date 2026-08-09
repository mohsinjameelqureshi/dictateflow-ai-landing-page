import { isConfigured } from "@/config/site";
import { cn } from "@/lib/cn";

type Variant = "solid" | "ghost";
type Size = "lg" | "md" | "sm";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-control " +
  "font-sans font-medium whitespace-nowrap " +
  "transition-[background-color,border-color,color,box-shadow,transform] " +
  "duration-[var(--dur-press)] ease-[var(--ease-out)] " +
  "active:scale-[0.985] disabled:cursor-not-allowed disabled:active:scale-100";

const sizes: Record<Size, string> = {
  lg: "h-12 px-6 text-body",
  md: "h-11 px-5 text-small",
  sm: "h-9 px-3.5 text-small",
};

const variants: Record<Variant, string> = {
  // The accent glow is the one place light is implied on the dark ground.
  solid:
    "bg-accent text-on-accent shadow-[var(--shadow-accent)] hover:bg-accent-hover",
  ghost:
    "border border-line bg-surface-1/60 text-fg hover:border-line-strong hover:bg-surface-2",
};

/**
 * Every CTA pointing at a GitHub-derived URL reads `isConfigured`. One flag,
 * one behaviour, no per-button logic.
 *
 * While the owner has not supplied `githubUrl` the control renders disabled
 * with a visible TODO rather than linking to `#` — it should be impossible to
 * ship the site with a dead primary CTA by accident.
 */
export function ActionLink({
  href,
  children,
  variant = "solid",
  size = "lg",
  className,
  todoLabel = "TODO",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  todoLabel?: string;
}) {
  const classes = cn(base, sizes[size], variants[variant], className);

  if (!isConfigured) {
    return (
      <button
        type="button"
        disabled
        aria-describedby="cta-todo-note"
        className={cn(classes, "opacity-60 shadow-none")}
      >
        {children}
        <span
          className={cn(
            "rounded-[5px] border border-current px-1.5 py-0.5 text-micro",
            // The compact nav button drops the pill on the narrowest screens
            // so the bar cannot overflow. The page's primary CTAs always
            // carry the visible TODO.
            size === "sm" && "hidden sm:inline-block",
          )}
        >
          {todoLabel}
        </span>
      </button>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {children}
    </a>
  );
}

/**
 * One explanation of why the CTAs are disabled, referenced by every gated
 * control through aria-describedby. Rendered once, in the footer.
 */
export function CtaTodoNote() {
  if (isConfigured) return null;
  return (
    <p id="cta-todo-note" className="measure text-small text-fg-muted">
      The repository URL has not been set yet, so every download and GitHub
      link is disabled. Set{" "}
      <code className="font-mono text-accent-text">githubUrl</code> in{" "}
      <code className="font-mono text-accent-text">src/config/site.ts</code> to
      enable them.
    </p>
  );
}

/** A quiet text link that follows the same gate. */
export function GhostLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const classes = cn(
    // min-h-8 keeps it a comfortable target when it stands alone at the end
    // of a section, which is the only way it is used.
    "inline-flex min-h-8 items-center gap-1.5 text-small underline",
    "decoration-line underline-offset-[5px]",
    "transition-colors duration-[var(--dur-press)] ease-[var(--ease-out)]",
    className,
  );

  if (!isConfigured) {
    return (
      <span className={cn(classes, "cursor-not-allowed text-fg-subtle")}>
        {children} (TODO)
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        classes,
        "text-accent-text hover:decoration-accent-text",
      )}
    >
      {children}
    </a>
  );
}
