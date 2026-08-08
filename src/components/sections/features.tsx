import {
  BarChart3,
  BookMarked,
  Mic,
  Settings,
  WandSparkles,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/ui/reveal";
import { Heatmap } from "@/components/heatmap";

/**
 * The real navigation of the app, so the site and the app agree. Icons are
 * the ones the app itself uses — bare marks in muted ink, never in a coloured
 * circle or a tinted tile, which would add a colour surface per feature and
 * turn a quiet grid into a SaaS grid.
 */
const FEATURES = [
  {
    icon: Mic,
    title: "Dictation",
    body: "Every session in your history, grouped by day. Play back the original recording, copy it, favorite it, delete it, or search the lot.",
  },
  {
    icon: BarChart3,
    title: "Insights",
    body: "Words per minute over recording time, total words, sessions, and a day streak with your best. All of it derived from local history.",
  },
  {
    icon: BookMarked,
    title: "Dictionary",
    body: "Find-and-replace rules applied after transcription, so grog becomes Groq once and stays fixed. Entries also seed Whisper's vocabulary hint, which prevents some errors rather than correcting them.",
  },
  {
    icon: Settings,
    title: "Settings and data",
    body: "Shortcut capture, microphone, theme, language, and your API key. Export transcripts, dictionary and settings to JSON; import skips duplicates, so re-importing is safe.",
  },
] as const;

export function Features() {
  return (
    <Section
      id="features"
      eyebrow="Inside the app"
      heading="Four sections, and one of them is empty."
      lead="This is the app's real navigation. Nothing here is a mock-up of something planned."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {FEATURES.map(({ icon: Icon, title, body }, i) => (
          <Reveal key={title} delay={i * 70}>
            <Panel className="h-full">
              <Icon
                aria-hidden="true"
                className="h-5 w-5 text-fg-muted"
                strokeWidth={1.5}
              />
              <h3 className="mt-5 text-h3 text-fg">{title}</h3>
              <p className="mt-2 text-body text-fg-muted">{body}</p>
            </Panel>
          </Reveal>
        ))}

        {/* Muted, present, obviously not shipped. */}
        <Reveal delay={280} className="md:col-span-2">
          <Panel tone="sunken" className="opacity-70 shadow-none">
            <div className="flex flex-wrap items-center gap-3">
              <WandSparkles
                aria-hidden="true"
                className="h-5 w-5 text-fg-subtle"
                strokeWidth={1.5}
              />
              <h3 className="text-h3 text-fg-muted">Transform</h3>
              <span className="rounded-full border border-line px-2.5 py-0.5 text-micro text-fg-subtle">
                Coming later
              </span>
            </div>
            <p className="measure mt-3 text-body text-fg-subtle">
              A scaffolded destination for future post-transcription rules. It
              is in the app and it is empty. Nothing runs there yet.
            </p>
          </Panel>
        </Reveal>
      </div>

      <Reveal delay={80} className="mt-16">
        <div className="overflow-hidden rounded-card border border-line bg-surface-1 shadow-[var(--shadow-panel)]">
          <div className="border-b border-line bg-surface-2/60 px-5 py-4 sm:px-7">
            <h3 className="text-h3 text-fg">The Insights heatmap</h3>
            <p className="measure mt-1.5 text-small text-fg-muted">
              Daily activity, in the same contribution-style grid the app draws
              from your local history.
            </p>
          </div>
          <div className="p-5 sm:p-7">
            <Heatmap />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
