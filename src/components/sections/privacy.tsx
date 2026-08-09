import {
  ArrowDown,
  ArrowRight,
  AudioLines,
  FileText,
  KeyRound,
  Laptop,
  Mic,
  SlidersHorizontal,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { GhostLink } from "@/components/ui/cta";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

/** Everything that never crosses the boundary. */
const STAYS = [
  {
    icon: FileText,
    title: "Transcripts and history",
    detail: "SQLite, at %APPDATA%\\typeflow-ai",
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
    title: "Your Groq API key",
    detail: "Encrypted with Windows DPAPI, keyed to your account",
  },
] as const;

const NOT_COLLECTED = ["No telemetry", "No analytics", "No crash reporting"];

/**
 * The strongest section on the page, so it is the one place that gets a
 * diagram rather than a list.
 *
 * The claim is about a *boundary* — one thing crosses it and nothing else
 * does. Two lists side by side cannot make that claim; they just assert it
 * twice. So the machine is drawn as an actual enclosure, the four things that
 * stay sit inside it, and a single accent path leaves the frame. The argument
 * is the picture, and the emptiness on the outbound side is deliberate.
 */
export function Privacy() {
  return (
    <Section
      id="privacy"
      eyebrow="Privacy"
      air
      heading={
        <>
          One thing leaves your computer:{" "}
          <span className="text-accent-text">the audio clip.</span>
        </>
      }
      lead="That is the entire network surface. Everything else the app knows about you stays inside the box below."
    >
      <Reveal>
        <div className="grid items-center gap-0 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,260px)]">
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
                the audio clip
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
                one call
              </span>
            </div>
          </div>

          {/* ------------------------------------------- the destination -- */}
          <div className="relative overflow-hidden rounded-card border border-dashed border-accent/45 bg-surface-1 p-5 text-center md:p-6">
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
                Groq, to be transcribed
              </h3>
              <p className="mt-1.5 font-mono text-[11.5px] text-accent-text">
                whisper large-v3-turbo
              </p>
              <p className="mt-3 text-micro text-fg-muted">
                The clip is sent, transcribed, and that is the end of it.
              </p>
            </div>
          </div>
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
