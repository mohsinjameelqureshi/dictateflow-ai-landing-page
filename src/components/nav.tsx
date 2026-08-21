"use client";

import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";
import { isConfigured, site } from "@/config/site";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/logo";
import { GithubMark } from "@/components/icons/github-mark";
import { ActionLink } from "@/components/ui/cta";

const ANCHORS = [
  { href: "#engines", label: "Engines" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#privacy", label: "Privacy" },
  { href: "#features", label: "Features" },
  { href: "#limits", label: "Limits" },
  { href: "#faq", label: "FAQ" },
] as const;

/**
 * A floating glass bar rather than a full-bleed strip.
 *
 * The page is built out of rounded, hairlined surfaces sitting on an ambient
 * ground; a nav that spans edge to edge cuts across that instead of belonging
 * to it. This one is an inset card with the same radius, border and blur as
 * every other panel, so it reads as part of the same system. Past 24px of
 * scroll it deepens: stronger fill, a lift, and the ambient wash no longer
 * showing through.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The disclosure covers the page on small screens; stop the body behind it
  // from scrolling underneath.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const glass = scrolled || open;

  return (
    <header className="sticky top-0 z-50 pt-3 md:pt-4">
      <div className="container-page">
        <nav
          aria-label="Main"
          className={cn(
            "rounded-card border transition-all ease-[var(--ease-out)]",
            "duration-[var(--dur-state)]",
            glass
              ? "border-line bg-surface-1/80 shadow-[var(--shadow-nav)] backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent bg-transparent",
          )}
        >
          <div className="flex h-14 items-center justify-between gap-3 pl-3 pr-2 md:h-16 md:pl-4 md:pr-3">
            <a
              href="#top"
              className="flex h-11 shrink-0 items-center gap-2.5 rounded-chip pr-1"
            >
              <Logo size={28} priority className="h-7 w-7" />
              <span className="whitespace-nowrap font-sans text-[15px] font-semibold tracking-tight text-fg">
                {site.name}
              </span>
            </a>

            {/* Centre track. Absolute-free: it simply takes the slack. */}
            <ul className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
              {ANCHORS.map((a) => (
                <li key={a.href}>
                  <a
                    href={a.href}
                    className={cn(
                      "inline-flex h-9 items-center rounded-chip px-3 text-small text-fg-muted",
                      "transition-colors duration-[var(--dur-press)] ease-[var(--ease-out)]",
                      "hover:bg-surface-2 hover:text-fg",
                    )}
                  >
                    {a.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
              {isConfigured ? (
                <a
                  href={site.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View the source on GitHub"
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-chip",
                    "text-fg-muted transition-colors duration-[var(--dur-press)]",
                    "ease-[var(--ease-out)] hover:bg-surface-2 hover:text-fg",
                  )}
                >
                  <GithubMark className="h-[18px] w-[18px]" />
                </a>
              ) : (
                <span
                  aria-label="GitHub link not configured"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-chip text-fg-subtle"
                >
                  <GithubMark className="h-[18px] w-[18px]" />
                </span>
              )}

              <ActionLink
                href={site.downloadUrl}
                size="sm"
                todoLabel="TODO"
                className="hidden sm:inline-flex"
              >
                Download
              </ActionLink>

              <button
                type="button"
                aria-expanded={open}
                aria-controls={menuId}
                aria-label={open ? "Close navigation" : "Open navigation"}
                onClick={() => setOpen((v) => !v)}
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-chip",
                  "text-fg-muted transition-colors duration-[var(--dur-press)]",
                  "ease-[var(--ease-out)] hover:bg-surface-2 hover:text-fg lg:hidden",
                )}
              >
                {open ? (
                  <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                ) : (
                  <Menu
                    aria-hidden="true"
                    className="h-5 w-5"
                    strokeWidth={1.75}
                  />
                )}
              </button>
            </div>
          </div>

          {/* The disclosure lives inside the card, so it opens as one object
              rather than a separate sheet hanging off the bottom. */}
          <div id={menuId} hidden={!open} className="border-t border-line lg:hidden">
            <ul className="p-2">
              {ANCHORS.map((a) => (
                <li key={a.href}>
                  <a
                    href={a.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex min-h-11 items-center rounded-chip px-3 text-body text-fg-muted",
                      "transition-colors duration-[var(--dur-press)] ease-[var(--ease-out)]",
                      "hover:bg-surface-2 hover:text-fg",
                    )}
                  >
                    {a.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="border-t border-line p-3 sm:hidden">
              <ActionLink
                href={site.downloadUrl}
                size="md"
                todoLabel="TODO"
                className="w-full"
              >
                Download for Windows
              </ActionLink>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
