import {
  BarChart3,
  BookMarked,
  HardDriveDownload,
  Mic,
  PanelTop,
  Settings,
  WandSparkles,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Panel } from "@/components/ui/panel";
import { Callout } from "@/components/ui/callout";
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
    body: "Transcription engine and model, shortcut capture, microphone, theme, language, and your API key. Export transcripts, dictionary and settings to JSON; import skips duplicates, so re-importing is safe.",
  },
] as const;

/**
 * Shipped, but not a destination in the app's navigation — so a hairline list
 * rather than a card, which would put them at the same weight as the four
 * sections above.
 */
const ALSO = [
  {
    icon: PanelTop,
    clause: "Title-bar controls.",
    body: "An engine picker naming the model size, a microphone picker, and download progress that appears only while a download is running. Switching engines no longer means opening Settings.",
  },
  {
    icon: HardDriveDownload,
    clause: "In-app model downloads.",
    body: "Resumable and checksum-verified. A failed or corrupted download repairs itself on retry rather than leaving a broken model in place.",
  },
  {
    icon: Mic,
    clause: "The microphone is released between dictations.",
    body: "Choosing a specific microphone used to keep the Windows recording indicator and the mic's own LED lit while idle, which is indistinguishable from the app listening. It does not do that any more, and the claim is now literally true at the OS level.",
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

      {/* ------------------------------------------------ also in the app -- */}
      <Reveal delay={80} className="mt-16">
        <div className="container-narrow">
          <h3 className="text-h3 text-fg">Also in the app</h3>
          <ul className="mt-5 border-t border-line">
            {ALSO.map(({ icon: Icon, clause, body }) => (
              <li key={clause} className="flex gap-4 border-b border-line py-5">
                <Icon
                  aria-hidden="true"
                  className="mt-1 h-4 w-4 shrink-0 text-fg-subtle"
                  strokeWidth={1.75}
                />
                <p className="text-body text-fg-muted">
                  <strong className="font-semibold text-fg">{clause}</strong>{" "}
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* ------------------------------------------------ grammar cleanup -- */}
      {/* The full account rather than a feature bullet, because the reason it
          is off is more useful than the fact that it exists. */}
      <Reveal delay={100} className="mt-10">
        <div className="container-narrow">
          <Callout>
            <div className="flex flex-wrap items-center gap-3">
              <WandSparkles
                aria-hidden="true"
                className="h-5 w-5 text-accent-text"
                strokeWidth={1.5}
              />
              <h3 className="text-h3 text-fg">Grammar cleanup</h3>
              <span className="rounded-full border border-line px-2.5 py-0.5 text-micro text-fg-subtle">
                Experimental, off by default
              </span>
            </div>

            <p className="mt-4 text-body text-fg-muted">
              Sends the transcript to Groq&rsquo;s Llama 3.3 for grammar and
              punctuation, adding about 300ms. In testing, the model deleted a
              word from the same sentence on three separate runs, including
              when explicitly instructed never to delete a word. That is not
              disobedience: transcribed speech is genuinely ungrammatical, and
              making it read cleanly requires cutting something.
            </p>

            <p className="mt-4 text-body text-fg-muted">
              So it ships with a guard. Every cleaned result is aligned against
              the raw transcript, and a word that was{" "}
              <em className="not-italic font-semibold text-fg">removed</em> is
              distinguished from one that was{" "}
              <em className="not-italic font-semibold text-fg">replaced</em>.
              &ldquo;Have saw&rdquo; becoming &ldquo;have seen&rdquo; is a fix,
              not a loss. If a word goes missing, the whole pass is thrown away
              and your raw transcript is used instead. Cleanup can improve your
              text; it can never destroy it.
            </p>

            <p className="mt-4 text-small text-fg-subtle">
              Needs a Groq API key and a connection, including when you
              transcribe with Moonshine.
            </p>
          </Callout>
        </div>
      </Reveal>

      <Reveal delay={120} className="mt-16">
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
