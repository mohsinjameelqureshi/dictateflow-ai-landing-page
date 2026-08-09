"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Kbd } from "@/components/ui/kbd";
import { Waveform } from "@/components/ui/waveform";
import { InsertionLine } from "@/components/ui/insertion-line";

/**
 * The hero sequence. It runs on a loop: the gesture is three seconds long and
 * most readers arrive mid-scroll, so a single pass is easily missed, and
 * asking someone to press Replay to see the product's core claim is asking
 * too much. The pause on `rest` is deliberately the longest beat — the
 * settled sentence is the payoff, not the motion.
 *
 * It only runs while it is on screen and the tab is in front. Loops nobody is
 * watching are pure cost, and the sequence always restarts from a clean idle
 * frame rather than resuming mid-gesture.
 *
 * The paste beat is the whole animation. The sentence appears in ONE FRAME,
 * because insertion is a clipboard paste and not simulated typing. A
 * typewriter effect here would be a factually wrong depiction of the product,
 * on the page whose entire pitch is accuracy.
 */

type Phase = "idle" | "hold" | "speak" | "release" | "wait" | "paste" | "rest";

const SENTENCE = "Ship the release notes before standup.";

const BEATS: ReadonlyArray<{ at: number; phase: Phase }> = [
  { at: 600, phase: "hold" }, //     Ctrl and Win depress together.
  { at: 760, phase: "speak" }, //    Waveform animates for 2200ms.
  { at: 2960, phase: "release" }, // Keycaps spring back; waveform goes flat.
  { at: 3100, phase: "wait" }, //    Caret pulses. The label states 1-2s.
  { at: 4300, phase: "paste" }, //   The sentence arrives, all at once.
  { at: 4540, phase: "rest" }, //    Settled. Caret resumes after the text.
];

/**
 * The sentence holds for ~2.5s after it lands, then the card resets and the
 * next run begins. Long enough to read the payoff, short enough that a reader
 * glancing over gets a full gesture without waiting.
 */
const LOOP_AT = 7000;

/** What the status pill reads at each beat. */
const STATUS: Record<Phase, string> = {
  idle: "Ready",
  hold: "Listening",
  speak: "Recording",
  release: "Sent",
  wait: "Transcribing",
  paste: "Pasted",
  rest: "Pasted",
};

export function HeroDemo() {
  // Under reduced motion the demo renders its final frame — keys at rest,
  // the line already holding the text. It still reads; it just does not move.
  // Derived rather than stored, so no effect has to correct the first render.
  const reduced = useReducedMotion();

  // t=0 is also what the server renders: keycaps up, line empty, caret
  // blinking. Hydration is therefore seamless.
  const [phase, setPhase] = useState<Phase>("idle");
  const [run, setRun] = useState(0);
  const [watchable, setWatchable] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  // Two ways to stop being worth animating: scrolled past, or the tab is in
  // the background. Either one parks the card on its idle frame, so whatever
  // is on screen when the reader comes back is the start of a run, not a
  // frozen middle of one.
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

  // One run's worth of timers. The last one bumps `run`, which re-fires this
  // effect and arms the next pass — a chain rather than an interval, so a
  // slow frame can never let two runs overlap.
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

  const keysDown = current === "hold" || current === "speak";
  const speaking = current === "speak";
  const settled = current === "paste" || current === "rest";
  const active = current !== "idle";

  return (
    <div
      ref={cardRef}
      className={cn(
        "overflow-hidden rounded-card border border-line bg-surface-1",
        "shadow-[var(--shadow-panel)]",
      )}
    >
      {/* Header strip: what the demo is standing in for, and where it is. */}
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-2/60 px-4 py-2.5 md:px-5">
        <span className="font-display text-[11px] uppercase tracking-[0.12em] text-fg-subtle">
          The window that had focus
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

      {/* The moving parts are decorative; the sentence below is the real text. */}
      <div
        aria-hidden="true"
        className="flex flex-col gap-5 p-5 md:gap-6 md:p-7"
      >
        <InsertionLine
          label="editor"
          text={settled ? SENTENCE : ""}
          state={current === "paste" ? "pasted" : "idle"}
          caret={current === "wait" ? "pulse" : "blink"}
        />

        <div className="flex items-center justify-between gap-4 rounded-control border border-line bg-surface-2/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <Kbd
              pressed={keysDown}
              className={keysDown ? "duration-[160ms]" : "duration-[240ms]"}
            >
              Ctrl
            </Kbd>
            <span className="text-micro text-fg-subtle">+</span>
            <Kbd
              pressed={keysDown}
              className={keysDown ? "duration-[160ms]" : "duration-[240ms]"}
            >
              Win
            </Kbd>
          </div>

          <Waveform active={speaking} />

          {/* Fixed width so the row cannot reflow as the label changes. */}
          <span className="w-[52px] text-right font-display text-[11px] tabular-nums text-fg-subtle">
            {current === "wait" ? "1-2s" : ""}
          </span>
        </div>
      </div>

      <p className="sr-only">
        A demonstration: holding Ctrl and Win, speaking, then releasing pastes
        the sentence &ldquo;{SENTENCE}&rdquo; into the window that had focus.
      </p>

    </div>
  );
}
