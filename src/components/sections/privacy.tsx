import {
  ArrowDown,
  ArrowRight,
  AudioLines,
  CloudOff,
  FileText,
  KeyRound,
  Laptop,
  Mic,
  SlidersHorizontal,
  WandSparkles,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { GhostLink } from "@/components/ui/cta";
import { Callout } from "@/components/ui/callout";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

/** Everything that never crosses the boundary, on either engine. */
const STAYS = [
  {
    icon: FileText,
    title: "Transcripts and history",
    detail: "SQLite, at %APPDATA%\\dictateflow-ai",
  },
  {
    icon: Mic,
    title: "Recordings",
    detail: "WAV files, in the same folder",
  },
  {
    icon: SlidersHorizontal,
    title: "Settings and dictionary",
    detail: "Your rules, your vocabulary",
  },
  {
    icon: KeyRound,
    title: "Your API keys",
    detail: "Groq, and Gemini if you use it. Encrypted with Windows DPAPI",
  },
] as const;

const NOT_COLLECTED = ["No telemetry", "No analytics", "No crash reporting"];

/**
 * The strongest section on the page, so it is the one place that gets a
 * diagram rather than a list.
 *
 * The claim is about a *boundary*. It used to be that exactly one thing
 * crossed it; now the number is zero or one depending on the engine, which is
 * a better claim but a harder picture. The enclosure and the four things
 * inside it are unchanged — they never cross on either engine — and the
 * outbound side became a pair: an empty destination for Moonshine and the
 * audio clip for Groq. The emptiness of the first card is the argument, so it
 * is drawn at the same weight as the second rather than as a footnote.
 */
export function Privacy() {
  return (
    <Section
      id="privacy"
      eyebrow="Privacy"
      air
      heading={
        <>
          What leaves your computer{" "}
          <span className="text-accent-text">depends on the engine.</span>
        </>
      }
      lead="Everything the app knows about you stays inside the box below, whichever engine you pick. What crosses the line is a dictation clip, or nothing at all. Two optional features cross it separately, and they are named underneath."
    >
      <Reveal>
        <div className="grid items-center gap-0 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,280px)]">
          {/* ---------------------------------------------- the machine -- */}
          <div className="relative rounded-card border border-line bg-surface-1 p-5 pt-7 shadow-[var(--shadow-panel)] md:p-7 md:pt-8">
            {/* The label sits astride the top border, so the panel reads as a
                labelled enclosure rather than another card. */}
            <span className="absolute -top-3 left-5 inline-flex items-center gap-2 rounded-chip border border-line bg-surface-2 px-2.5 py-1 md:left-7">
              <Laptop
                aria-hidden="true"
                className="h-3.5 w-3.5 text-fg-muted"
                strokeWidth={1.75}
              />
              <span className="font-display text-[11px] uppercase tracking-[0.12em] text-fg-muted">
                Your machine
              </span>
            </span>

            <ul className="grid gap-2.5 sm:grid-cols-2">
              {STAYS.map(({ icon: Icon, title, detail }) => (
                <li
                  key={title}
                  className="rounded-control border border-line bg-surface-2/50 p-3.5"
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-fg-muted"
                      strokeWidth={1.75}
                    />
                    <h3 className="text-small font-medium text-fg">{title}</h3>
                  </div>
                  <p className="mt-1.5 text-micro text-fg-subtle">{detail}</p>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-small text-fg-muted">
              None of this is uploaded, synced, or backed up anywhere. There is
              no account and no server run by this project.
            </p>
          </div>

          {/* ------------------------------------------- the one crossing -- */}
          {/* Horizontal on desktop, vertical when the layout stacks. The path
              is decorative; the relationship is stated in the text either
              side of it. */}
          <div
            aria-hidden="true"
            className="flex items-center justify-center py-6 lg:w-[164px] lg:flex-col lg:px-3 lg:py-0"
          >
            <div className="flex flex-col items-center gap-2 lg:w-full">
              <span className="whitespace-nowrap font-display text-[11px] uppercase tracking-[0.1em] text-accent-text">
                nothing, or one clip
              </span>

              <div className="flex items-center gap-1.5 lg:w-full">
                {/* Mobile: a short vertical run. Desktop: a full-width dash. */}
                <span
                  className={cn(
                    "hidden h-px flex-1 lg:block",
                    "bg-[repeating-linear-gradient(90deg,var(--accent)_0_6px,transparent_6px_11px)]",
                  )}
                />
                <ArrowRight
                  className="hidden h-4 w-4 shrink-0 text-accent lg:block"
                  strokeWidth={2.25}
                />

                <span
                  className={cn(
                    "block h-10 w-px lg:hidden",
                    "bg-[repeating-linear-gradient(180deg,var(--accent)_0_6px,transparent_6px_11px)]",
                  )}
                />
              </div>

              <ArrowDown
                className="h-4 w-4 text-accent lg:hidden"
                strokeWidth={2.25}
              />

              <span className="whitespace-nowrap font-display text-[10.5px] uppercase tracking-[0.08em] text-fg-subtle">
                per engine
              </span>
            </div>
          </div>

          {/* ------------------------------------------ the destinations -- */}
          <div className="grid gap-3">
            {/* Moonshine. Deliberately the emptier card, and deliberately
                first: it is the stronger claim of the two. */}
            <div className="rounded-card border border-line bg-surface-1 p-5 text-center">
              <CloudOff
                aria-hidden="true"
                className="mx-auto h-5 w-5 text-fg-muted"
                strokeWidth={1.75}
              />
              <h3 className="mt-3 text-small font-medium text-fg">
                With Moonshine, nothing
              </h3>
              <p className="mt-3 text-micro text-fg-muted">
                After the one-time model download, dictating makes no network
                requests at all.
              </p>
            </div>

            {/* Groq. The one card on the page that is allowed to look like a
                destination outside the enclosure. */}
            <div className="relative overflow-hidden rounded-card border border-dashed border-accent/45 bg-surface-1 p-5 text-center">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-accent-soft opacity-60"
              />
              <div className="relative">
                <AudioLines
                  aria-hidden="true"
                  className="mx-auto h-5 w-5 text-accent-text"
                  strokeWidth={1.75}
                />
                <h3 className="mt-3 text-small font-medium text-fg">
                  With Groq, the audio clip
                </h3>
                <p className="mt-1.5 font-mono text-[11.5px] text-accent-text">
                  whisper large-v3-turbo
                </p>
                <p className="mt-3 text-micro text-fg-muted">
                  Sent, transcribed, and that is the end of it. That is the
                  entire network surface.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ------------------------------------- the two honest asterisks -- */}
      {/* Omitting these would make the offline claim overstated, which is the
          only way this section can actually fail. Transform is the newer of
          the two and by far the more likely to be used, so it is named first
          and in full rather than folded into the sentence about cleanup. */}
      <Reveal delay={100} className="mt-10">
        <div className="container-narrow">
          <Callout>
            <div className="flex flex-col gap-4 sm:flex-row">
              <WandSparkles
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-accent-text"
                strokeWidth={1.5}
              />
              <div>
                <p className="text-body text-fg-muted">
                  <strong className="font-semibold text-fg">
                    Two asterisks, and the diagram above covers dictation only.
                  </strong>{" "}
                  Two things in the app talk to a language model, and neither
                  one runs on your machine.
                </p>

                <p className="mt-4 text-body text-fg-muted">
                  <strong className="font-semibold text-fg">
                    A transform sends the text you are rewriting
                  </strong>{" "}
                  to Groq or to Google Gemini, whichever you picked. Press the
                  shortcut while transcribing with Moonshine and that is the
                  one action in the whole product that leaves your computer.
                  The app states this in Settings rather than burying it.
                </p>

                <p className="mt-4 text-body text-fg-muted">
                  <strong className="font-semibold text-fg">
                    Grammar cleanup is a Groq call
                  </strong>{" "}
                  regardless of which engine transcribed. Turning it on while
                  using Moonshine gives up the offline guarantee for that one
                  step. It is off by default.
                </p>

                <p className="mt-4 text-small text-fg-subtle">
                  Neither one is on unless you turn it on or press its
                  shortcut. Leave both alone on Moonshine and the app makes no
                  network requests at all.
                </p>
              </div>
            </div>
          </Callout>
        </div>
      </Reveal>

      {/* -------------------------------------------------- the two keys -- */}
      <Reveal delay={110} className="mt-4">
        <div className="container-narrow">
          <Callout>
            <div className="flex flex-col gap-4 sm:flex-row">
              <KeyRound
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-accent-text"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="text-h3 text-fg">Two keys, both encrypted</h3>
                <p className="mt-3 text-body text-fg-muted">
                  The app stores a Groq key and, optionally, a Google Gemini
                  key for transforms. Both are encrypted with Windows DPAPI and
                  tied to your Windows account, stored outside the database,
                  and never readable by the app&rsquo;s own interface: it can
                  ask whether a key exists, not what it is. Neither key is ever
                  included in an export.
                </p>
                <p className="mt-4 text-body text-fg-muted">
                  Keys are checked by asking the provider, not by
                  pattern-matching them. Any format either company issues is
                  accepted, and what you get back is the provider&rsquo;s own
                  verdict on whether your key works.
                </p>
              </div>
            </div>
          </Callout>
        </div>
      </Reveal>

      {/* ------------------------------------------------------ closing -- */}
      <Reveal
        delay={120}
        className="mt-10 flex flex-col items-center gap-5 border-t border-line pt-8 sm:flex-row sm:justify-between"
      >
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {NOT_COLLECTED.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-small text-fg-muted"
            >
              <span
                aria-hidden="true"
                className="block h-1.5 w-1.5 rounded-full bg-fg-subtle"
              />
              {item}
            </li>
          ))}
        </ul>

        <GhostLink href={site.securityUrl}>
          Read the threat model in SECURITY.md
        </GhostLink>
      </Reveal>
    </Section>
  );
}
