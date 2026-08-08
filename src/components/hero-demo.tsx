"use client";

import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Kbd } from "@/components/ui/kbd";
import { Waveform } from "@/components/ui/waveform";
import { InsertionLine } from "@/components/ui/insertion-line";

/**
 * The hero sequence. It plays once on mount, then stops and offers a Replay
 * button. It does not loop: ambient motion in the first viewport is noise,
 * whereas a single well-timed run is a demonstration.
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
  { at: 3100, phase: "wait" }, //    Caret pulses. The label states 1–2s.
  { at: 4300, phase: "paste" }, //   The sentence arrives, all at once.
  { at: 4540, phase: "rest" }, //    Settled. Caret resumes after the text.
];

const REPLAY_AT = 5000;

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
  const [showReplay, setShowReplay] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduced) return;

    const timers = BEATS.map((beat) =>
      setTimeout(() => setPhase(beat.phase), beat.at),
    );
    timers.push(setTimeout(() => setShowReplay(true), REPLAY_AT));
    return () => timers.forEach(clearTimeout);
  }, [reduced, run]);

  const current: Phase = reduced ? "rest" : phase;

  const keysDown = current === "hold" || current === "speak";
  const speaking = current === "speak";
  const settled = current === "paste" || current === "rest";
  const active = current !== "idle";

  return (
    <div
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
            {current === "wait" ? "1–2s" : ""}
          </span>
        </div>
      </div>

      <p className="sr-only">
        A demonstration: holding Ctrl and Win, speaking, then releasing pastes
        the sentence &ldquo;{SENTENCE}&rdquo; into the window that had focus.
      </p>

      <div className="flex h-12 items-center justify-end border-t border-line px-4 md:px-5">
        {showReplay ? (
          <button
            type="button"
            onClick={() => {
              setShowReplay(false);
              setRun((r) => r + 1);
            }}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-[7px] px-2.5",
              "text-micro text-fg-muted",
              "animate-[fade-in_var(--dur-enter)_var(--ease-out)_both]",
              "transition-colors duration-[var(--dur-press)] ease-[var(--ease-out)]",
              "hover:bg-surface-2 hover:text-fg",
            )}
          >
            <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} />
            Replay
          </button>
        ) : null}
      </div>
    </div>
  );
}
