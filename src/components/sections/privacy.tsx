import { ArrowUpRight, HardDrive } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { GhostLink } from "@/components/ui/cta";
import { site } from "@/config/site";

const STAYS = [
  <>
    Transcripts and history &mdash; SQLite, at{" "}
    <code className="font-mono text-code text-fg">%APPDATA%\typeflow-ai</code>
  </>,
  <>Recordings &mdash; WAV files, in the same folder</>,
  <>Settings and your personal dictionary</>,
  <>
    Your Groq API key &mdash; encrypted with Windows DPAPI, keyed to your
    Windows account
  </>,
];

/**
 * The strongest section on the page.
 *
 * Two ledgers rather than a table: the asymmetry — one row against four — is
 * the argument, and equal rows would flatten it. The "leaves" side is
 * deliberately mostly empty. It is not padded out to balance the heights,
 * because the emptiness is the point.
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
      lead="That is the entire network surface. No account, no cloud database, no telemetry, no analytics, no crash reporting."
    >
      <div className="grid items-start gap-4 lg:grid-cols-5">
        {/* Leaves — one item, and the space around it does the arguing. */}
        <Reveal className="lg:col-span-2">
          <div className="relative h-full overflow-hidden rounded-card border border-line border-l-2 border-l-accent bg-surface-1 p-6 shadow-[var(--shadow-panel)] md:p-7">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-accent-soft opacity-50"
            />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center gap-2.5">
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-[18px] w-[18px] text-accent-text"
                  strokeWidth={2}
                />
                <h3 className="font-display text-[13px] uppercase tracking-[0.1em] text-accent-text">
                  Leaves
                </h3>
              </div>

              <ul className="mt-6 space-y-3 text-body text-fg">
                <li>The audio clip, sent to Groq to be transcribed.</li>
              </ul>

              <p className="mt-6 text-small text-fg-subtle">
                Nothing else. There is no second item on this list.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Stays — four items, itemised. */}
        <Reveal delay={100} className="lg:col-span-3">
          <div className="h-full rounded-card border border-line bg-surface-1 p-6 shadow-[var(--shadow-panel)] md:p-7">
            <div className="flex items-center gap-2.5">
              <HardDrive
                aria-hidden="true"
                className="h-[18px] w-[18px] text-fg-muted"
                strokeWidth={1.75}
              />
              <h3 className="font-display text-[13px] uppercase tracking-[0.1em] text-fg-muted">
                Stays on your machine
              </h3>
            </div>

            <ul className="mt-6 divide-y divide-[var(--line)]">
              {STAYS.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 py-3.5 text-body text-fg-muted first:pt-0 last:pb-0"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[9px] block h-1.5 w-1.5 shrink-0 rounded-full bg-fg-subtle"
                  />
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal delay={160} className="mt-8 text-center">
        <GhostLink href={site.securityUrl}>
          Read the threat model in SECURITY.md
        </GhostLink>
      </Reveal>
    </Section>
  );
}
