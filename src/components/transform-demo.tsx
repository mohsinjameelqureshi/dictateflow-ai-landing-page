"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Kbd } from "@/components/ui/kbd";

/**
 * The second loop on the page, and the counterpart to HeroDemo.
 *
 * Both fields are always in the DOM at a fixed height, so the card never
 * reflows and the *before* stays on screen while the *after* arrives. That is
 * the whole argument: the same box, two states. A single field that swapped
 * its contents would show the payoff and hide the premise.
 *
 * The rewritten text appears in ONE FRAME, for the same reason the hero
 * sentence does — the app replaces the field's contents, it does not type
 * them. Anything resembling a typewriter would be a lie about the product.
 *
 * With JavaScript off, under reduced motion, or off screen, the card parks on
 * its finished frame: both fields filled, keys at rest. It still makes the
 * point, it just does not move.
 */

type Phase = "idle" | "press" | "working" | "done" | "rest";

const BEFORE =
  "umm so i need a python thing that reads a csv and like pulls out the emails and puts them somewhere";

const AFTER = `Write a Python script that reads a CSV file, extracts every email address from it, and writes the results to an output file.

Include: the CSV path as an argument, and handling for rows with no email.`;

const BEATS: ReadonlyArray<{ at: number; phase: Phase }> = [
  { at: 1400, phase: "press" }, //   Ctrl, Alt and E go down together.
  { at: 1620, phase: "working" }, // The provider call. The app claims ~1s.
  { at: 2760, phase: "done" }, //    The rewrite lands, all at once.
  { at: 3000, phase: "rest" }, //    Settled, and held long enough to read.
];

/** Long enough to read six lines of the result before it resets. */
const LOOP_AT = 8600;

const STATUS: Record<Phase, string> = {
  idle: "Ready",
  press: "Enhance prompt",
  working: "Rewriting",
  done: "Replaced",
  rest: "Replaced",
};

/**
 * A multi-line sibling of InsertionLine. Same sunken treatment, same promise
 * that it is not pretending to be a screenshot: no window chrome, no toolbar,
 * no send button. It is a text field and nothing else.
 */
function Field({
  text,
  label,
  reserve,
  landed = false,
  muted = false,
}: {
  text: string;
  label: string;
  /**
   * Rendered invisibly underneath, purely to hold the box open. The field
   * spends most of the loop empty and has to be exactly as tall as it will be
   * when full, or the card jumps and the section below it moves.
   *
   * A fixed pixel height would do that too, and did, until you check it at
   * 360px: the same rewrite that runs to four lines on a laptop runs to eight
   * on a phone, and the tail gets clipped. Letting the longest state size the
   * box is the only version that is right at every width.
   */
  reserve?: string;
  /** Plays the paste flash on the frame the text arrives. */
  landed?: boolean;
  /** Dimmed once it has been superseded by the field below it. */
  muted?: boolean;
}) {
  const body = "whitespace-pre-wrap font-mono text-[13px] leading-[1.6]";

  return (
    <div>
      <span
        aria-hidden="true"
        className="font-display text-[10.5px] uppercase tracking-[0.1em] text-fg-subtle"
      >
        {label}
      </span>

      <div
        className={cn(
          "mt-2 grid rounded-control border border-line bg-deep px-4 py-3.5",
          "shadow-[inset_0_1px_3px_rgb(0_0_0/0.28)]",
        )}
      >
        {reserve ? (
          <p className={cn(body, "invisible [grid-area:1/1]")}>{reserve}</p>
        ) : null}

        <p
          className={cn(
            body,
            "[grid-area:1/1]",
            muted ? "text-fg-subtle" : "text-fg",
            landed &&
              "animate-[paste-flash_var(--dur-state)_var(--ease-out)_both]",
          )}
        >
          {text}
          {text === "" ? null : " "}
          <span
            aria-hidden="true"
            className={cn(
              "ml-px inline-block h-[15px] w-0.5 translate-y-[2px] rounded-[1px]",
              "bg-accent-text align-baseline",
              "animate-[caret-blink_1060ms_step-end_infinite]",
            )}
          />
        </p>
      </div>
    </div>
  );
}

export function TransformDemo() {
  const reduced = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("idle");
  const [run, setRun] = useState(0);
  const [watchable, setWatchable] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  // Same policy as the hero demo: scrolled past or backgrounded parks the
  // card, and it always restarts from a clean frame rather than resuming out
  // of the middle of a run.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let onScreen = true;
    const settle = () => {
      const next = onScreen && !document.hidden;
      setWatchable(next);
      if (!next) setPhase("idle");
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        settle();
      },
      { threshold: 0.3 },
    );
    observer.observe(card);
    document.addEventListener("visibilitychange", settle);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", settle);
    };
  }, []);

  useEffect(() => {
    if (reduced || !watchable) return;

    const timers = BEATS.map((beat) =>
      setTimeout(() => setPhase(beat.phase), beat.at),
    );
    timers.push(
      setTimeout(() => {
        setPhase("idle");
        setRun((r) => r + 1);
      }, LOOP_AT),
    );
    return () => timers.forEach(clearTimeout);
  }, [reduced, watchable, run]);

  const current: Phase = reduced ? "rest" : phase;

  const keysDown = current === "press" || current === "working";
  const settled = current === "done" || current === "rest";
  const active = current !== "idle";

  return (
    <div
      ref={cardRef}
      className={cn(
        "overflow-hidden rounded-card border border-line bg-surface-1",
        "shadow-[var(--shadow-panel)]",
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-2/60 px-4 py-2.5 md:px-5">
        <span className="font-display text-[11px] uppercase tracking-[0.12em] text-fg-subtle">
          The box you were already typing in
        </span>

        <span
          aria-hidden="true"
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2 py-1",
            "font-display text-[10.5px] uppercase tracking-[0.1em]",
            "transition-colors duration-[var(--dur-state)] ease-[var(--ease-out)]",
            active
              ? "border-accent/40 bg-accent-soft text-accent-text"
              : "border-line bg-surface-3 text-fg-subtle",
          )}
        >
          <span
            className={cn(
              "block h-1.5 w-1.5 rounded-full",
              active ? "bg-accent-text" : "bg-fg-subtle",
            )}
          />
          {STATUS[current]}
        </span>
      </div>

      {/* Decorative: the real text is in the description below the card. */}
      <div
        aria-hidden="true"
        className="flex flex-col gap-4 p-5 md:gap-5 md:p-7"
      >
        <Field text={BEFORE} label="what you dictated" muted={settled} />

        {/* The gesture, sitting between the two states it connects. */}
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-line" />
          <span className="flex items-center gap-1.5">
            <Kbd pressed={keysDown}>Ctrl</Kbd>
            <span className="text-micro text-fg-subtle">+</span>
            <Kbd pressed={keysDown}>Alt</Kbd>
            <span className="text-micro text-fg-subtle">+</span>
            <Kbd pressed={keysDown}>E</Kbd>
          </span>
          {/* Fixed width, so the rule either side cannot shift as the label
              appears and goes again. */}
          <span className="w-[62px] shrink-0 font-display text-[11px] tabular-nums text-fg-subtle">
            {current === "working" ? "about 1s" : ""}
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <Field
          text={settled ? AFTER : ""}
          reserve={AFTER}
          label="what is in the field now"
          landed={current === "done"}
        />
      </div>

      <p className="sr-only">
        A demonstration. A rough dictated prompt, &ldquo;{BEFORE}&rdquo;, sits
        in an input field. Pressing Ctrl, Alt and E replaces it in place with:
        &ldquo;{AFTER}&rdquo;
      </p>
    </div>
  );
}
