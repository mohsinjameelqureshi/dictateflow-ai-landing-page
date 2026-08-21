import { Fragment } from "react";
import { Section } from "@/components/ui/section";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/ui/reveal";
import { InsertionLine } from "@/components/ui/insertion-line";
import { Kbd } from "@/components/ui/kbd";

const STEPS = [
  {
    n: "01",
    title: "Hold the shortcut",
    body: (
      <>
        A floating widget appears on the monitor your cursor is on, and never
        takes focus. <Kbd>Esc</Kbd> cancels at any point.
      </>
    ),
  },
  {
    n: "02",
    title: "Speak",
    body: (
      <>
        Audio is captured at 16kHz mono. It is transcribed either by
        Groq&rsquo;s Whisper{" "}
        <code className="font-mono text-code text-accent-text">
          large-v3-turbo
        </code>{" "}
        in the cloud, or by Moonshine on your own machine, depending on which
        engine you picked.
      </>
    ),
  },
  {
    n: "03",
    title: "Release",
    body: (
      <>
        Your personal dictionary is applied, the text is pasted into the window
        that had focus, and your clipboard is restored.
      </>
    ),
  },
] as const;

/**
 * The real pipeline, from the README — rendered as styled markup rather than
 * an image, so it stays selectable and readable at any zoom.
 *
 * Transcription is a fork now, so the diagram forks. `tone` says how each
 * line is inked; nothing is inferred by matching substrings, which is what
 * the previous version did and what would quietly mis-colour the moment a
 * step is reworded.
 *
 * Only the Groq branch is accent-inked, because on this page accent means
 * "this leaves your computer". The Moonshine branch is bright but uncoloured:
 * it is the interesting line, and it crosses nothing.
 *
 * ASCII only for the branch markers. Neither the arrow nor the box-drawing
 * glyphs survive the Latin font subset, so they render from a fallback face
 * whose advance width need not match; keeping the structure in plain ASCII
 * keeps the columns aligned wherever it lands.
 */
const PIPELINE: ReadonlyArray<{ text: string; tone?: string }> = [
  { text: "Hold shortcut  →  keyboard hook  →  widget shown (never focused)" },
  { text: "                                 →  16kHz mono WAV captured" },
  { text: "" },
  { text: "Key released   →  silence / amplitude gate" },
  {
    text: "                   |- Groq       →  Whisper large-v3-turbo, over the network",
    tone: "network",
  },
  {
    text: "                   |- Moonshine  →  in a separate process, on this machine",
    tone: "local",
  },
  {
    text: "               →  grammar cleanup, only if you turned it on",
    tone: "optional",
  },
  { text: "               →  personal dictionary replacement" },
  { text: "               →  clipboard save → paste → restore" },
  { text: "               →  row + WAV written to local SQLite" },
];

const TONES: Record<string, string> = {
  plain: "text-fg-muted",
  network: "font-medium text-accent-text",
  local: "font-medium text-fg",
  optional: "text-fg-subtle",
};

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      eyebrow="How it works"
      heading="Three steps, and one of them is speaking."
      lead="The gesture is the whole interface. There is no window to open, no box to paste out of, and nothing to click."
    >
      {/* Numbered markers earn their place here: this is a real sequence, and
          step two cannot happen before step one. */}
      <ol className="grid gap-4 lg:grid-cols-3">
        {STEPS.map((step, i) => (
          <Reveal as="li" key={step.n} delay={i * 80}>
            <Panel className="h-full">
              <span
                className={
                  "inline-flex h-8 items-center rounded-chip border " +
                  "border-accent/30 bg-accent-soft px-2.5 font-display " +
                  "text-[12px] font-semibold tracking-[0.08em] text-accent-text"
                }
              >
                {step.n}
              </span>
              <h3 className="mt-5 text-h3 text-fg">{step.title}</h3>
              <p className="mt-2 text-body text-fg-muted">{step.body}</p>
            </Panel>
          </Reveal>
        ))}
      </ol>

      <Reveal as="figure" className="mt-4">
        <div className="overflow-hidden rounded-card border border-line bg-surface-1 shadow-[var(--shadow-panel)]">
          <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-2/60 px-4 py-2.5">
            <span className="font-display text-[11px] uppercase tracking-[0.12em] text-fg-subtle">
              The actual pipeline
            </span>
            <span className="hidden font-display text-[11px] text-fg-subtle sm:block">
              the only branch that leaves your machine, highlighted
            </span>
          </div>

          <div className="scroll-x bg-deep p-5">
            <pre className="whitespace-pre font-mono text-[12.5px] leading-[1.75] text-fg-muted">
              {PIPELINE.map((line, i) => (
                <div key={i} className={TONES[line.tone ?? "plain"]}>
                  {line.text === ""
                    ? " "
                    : line.text.split("→").map((part, j) => (
                        <Fragment key={j}>
                          {j > 0 ? (
                            // Plain inline glyph, no fixed-width box: the box
                            // used to be 1ch, which the arrow overflows,
                            // swallowing the space after it ("→paste"). Every
                            // glyph in a monospace face already occupies one
                            // cell, so the columns line up without help.
                            <span className="text-accent-text">→</span>
                          ) : null}
                          {part}
                        </Fragment>
                      ))}
                </div>
              ))}
            </pre>
          </div>

          {/* The pipeline's terminus, made concrete. */}
          <div className="border-t border-line p-5">
            <InsertionLine
              label="editor"
              text="Ship the release notes before standup."
              caret="blink"
            />
          </div>
        </div>

        <figcaption className="measure mx-auto mt-5 text-center text-small text-fg-subtle">
          The text arrives in the window that already had focus. Nothing is
          typed character by character: insertion is a clipboard paste, and
          your clipboard is restored afterwards.
        </figcaption>
      </Reveal>
    </Section>
  );
}
