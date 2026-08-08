"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Scroll Reveal, Standard tier: 24px rise, ~500ms, optional stagger.
 *
 * Implemented with IntersectionObserver and CSS transitions rather than a
 * animation library — the effect is two properties and does not justify a
 * runtime dependency on a page whose whole pitch is that it is small.
 *
 * The hidden state lives behind `html.js` (see globals.css), so with
 * JavaScript disabled nothing is ever invisible. Reduced motion resolves
 * straight to the final state.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  /** Stagger offset in ms. Keep under ~8 steps so the tail does not lag. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "header" | "figure";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already past the fold on load (deep link, restored scroll): show it
    // immediately rather than waiting for a scroll that may never come.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal=""
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
