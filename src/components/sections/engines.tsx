import { Cloud, HardDriveDownload, Laptop, Scale } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Panel } from "@/components/ui/panel";
import { Callout } from "@/components/ui/callout";
import { Reveal } from "@/components/ui/reveal";

/**
 * The biggest product change, so it gets its own band directly under the
 * hero: transcription is no longer one path with a prerequisite, it is a
 * choice between two.
 *
 * Both engines are drawn as the same object with different values rather than
 * as a default and an alternative — the point of the section is that neither
 * one is the compromise. Every spec lives in a single array and is rendered
 * twice, which is what stops the two columns drifting apart the way a
 * hand-written table would.
 *
 * Moonshine is a speech-to-text model, and is never described here as a
 * language model running locally, because it is not one. The only language
 * model in the product is Groq's, in the cloud, behind an off-by-default
 * setting.
 */

const SPECS = [
  { label: "Where it runs", groq: "Groq's servers", moonshine: "Your machine" },
  {
    label: "Audio leaves your computer",
    groq: "Yes, the clip",
    moonshine: "Never",
  },
  { label: "Needs an API key", groq: "Yes, free", moonshine: "No" },
  {
    label: "Needs a connection",
    groq: "Every dictation",
    moonshine: "Once, for the model",
  },
  { label: "Languages", groq: "Around 99", moonshine: "English only" },
  {
    label: "One-time download",
    groq: "None",
    moonshine: "292 MB, default model",
  },
  {
    label: "Speed",
    groq: "1-2 seconds",
    moonshine: "About half the clip length",
  },
] as const;

const ENGINES = [
  {
    key: "groq",
    icon: Cloud,
    name: "Groq",
    kind: "cloud",
    chip: "Default",
    summary: (
      <>
        Sends your audio clip to Whisper{" "}
        <code className="font-mono text-code text-accent-text">
          large-v3-turbo
        </code>{" "}
        and sends text back.
      </>
    ),
  },
  {
    key: "moonshine",
    icon: Laptop,
    name: "Moonshine",
    kind: "on-device",
    chip: "No key, no account",
    summary: (
      <>
        A speech model running in a separate process on your own machine, with
        nothing in front of it.
      </>
    ),
  },
] as const;

/** Bigger is more accurate and slower. Numbers from the app's shared types. */
const MODELS = [
  {
    size: "Medium",
    download: "292 MB",
    wer: "6.65%",
    note: "Beats Whisper large-v3 at a sixth of the size.",
    isDefault: true,
  },
  {
    size: "Small",
    download: "159 MB",
    wer: "7.84%",
    note: "Close to Medium, for half the download.",
    isDefault: false,
  },
  {
    size: "Tiny",
    download: "51 MB",
    wer: "12.00%",
    note: "Fastest and smallest, noticeably weaker on names.",
    isDefault: false,
  },
] as const;

export function Engines() {
  return (
    <Section
      id="engines"
      eyebrow="Two engines"
      air
      heading={
        <>
          Cloud or local. <span className="text-accent-text">Your call.</span>
        </>
      }
      lead="Transcription is the one part of this app that can involve someone else's computer, so it is a choice rather than an assumption. Pick either in the title bar or in Settings, and switch whenever you like."
    >
      {/* ------------------------------------------------ the two engines -- */}
      <div className="grid gap-4 lg:grid-cols-2">
        {ENGINES.map((engine, i) => {
          const Icon = engine.icon;
          return (
            <Reveal key={engine.key} delay={i * 80}>
              <Panel className="flex h-full flex-col">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-fg-muted"
                    strokeWidth={1.5}
                  />
                  <h3 className="text-h3 text-fg">
                    {engine.name}{" "}
                    <span className="font-normal text-fg-subtle">
                      ({engine.kind})
                    </span>
                  </h3>
                  <span
                    className={
                      "ml-auto inline-flex h-6 shrink-0 items-center rounded-chip " +
                      "border border-accent/30 bg-accent-soft px-2 font-display " +
                      "text-[10.5px] font-semibold uppercase tracking-[0.08em] " +
                      "text-accent-text"
                    }
                  >
                    {engine.chip}
                  </span>
                </div>

                <p className="mt-3 text-body text-fg-muted">{engine.summary}</p>

                {/* A definition list rather than one shared table: the labels
                    repeat inside each card, which is what keeps a single card
                    readable on its own once the grid stacks at 360px. */}
                <dl className="mt-6 border-t border-line">
                  {SPECS.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-2.5"
                    >
                      <dt className="text-small text-fg-subtle">
                        {spec.label}
                      </dt>
                      <dd className="text-right text-small font-medium text-fg">
                        {spec[engine.key]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Panel>
            </Reveal>
          );
        })}
      </div>

      {/* --------------------------------------------- what the trade is -- */}
      <Reveal delay={120} className="mt-8">
        <div className="container-narrow grid gap-x-10 gap-y-5 sm:grid-cols-2">
          <p className="text-body text-fg-muted">
            <strong className="font-semibold text-fg">Groq</strong> is the
            default and the faster of the two on short dictations. It is also
            the only one of the pair that needs a key, and the only one that
            sends anything anywhere.
          </p>
          <p className="text-body text-fg-muted">
            <strong className="font-semibold text-fg">Moonshine</strong> costs
            a one-time download and slower transcription. Half real time means
            a 10 second dictation is roughly 5 seconds of local compute,
            against 1 to 2 seconds for the cloud. Longer clips close that gap.
          </p>
        </div>
      </Reveal>

      <Reveal delay={160} className="mt-10">
        <p className="measure mx-auto text-pretty text-center text-lead text-fg">
          Once the Moonshine model is downloaded, the app never contacts the
          network again. Airplane mode changes nothing about how it behaves.
        </p>
      </Reveal>

      {/* --------------------------------------------------- model sizes -- */}
      <Reveal delay={80} className="mt-16">
        <div className="overflow-hidden rounded-card border border-line bg-surface-1 shadow-[var(--shadow-panel)]">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line bg-surface-2/60 px-5 py-4 sm:px-7">
            <div>
              <h3 className="text-h3 text-fg">Three model sizes</h3>
              <p className="measure mt-1.5 text-small text-fg-muted">
                Bigger is more accurate and slower. Pick one in Settings.
              </p>
            </div>
            <span className="font-display text-[11px] uppercase tracking-[0.12em] text-fg-subtle">
              lower is better
            </span>
          </div>

          {/* gap-px over the hairline colour: three cells divided by the same
              1px rule as everything else, without three separate borders. */}
          <div className="grid gap-px bg-line sm:grid-cols-3">
            {MODELS.map((model) => (
              <div key={model.size} className="bg-surface-1 p-5 sm:p-7">
                <div className="flex items-center gap-2.5">
                  <h4 className="text-h3 text-fg">{model.size}</h4>
                  {model.isDefault ? (
                    <span className="rounded-full border border-line px-2 py-0.5 text-micro text-fg-subtle">
                      Default
                    </span>
                  ) : null}
                </div>

                <p className="mt-4 font-display text-stat tabular-nums text-fg">
                  {model.wer}
                </p>
                <p className="mt-2 text-micro text-fg-muted">
                  word error rate &middot; {model.download} download
                </p>

                <p className="mt-4 text-small text-fg-muted">{model.note}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-line p-5 sm:flex-row sm:p-7">
            <HardDriveDownload
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-fg-subtle"
              strokeWidth={1.5}
            />
            <p className="text-small text-fg-muted">
              Selecting a model you do not have starts the download, and the
              title bar shows the progress. Downloads are resumable and every
              file is checksum-verified, so a failed or corrupted download
              repairs itself on retry rather than leaving a broken model in
              place. Models live in{" "}
              <code className="font-mono text-code text-accent-text">
                %APPDATA%\dictateflow-ai\models
              </code>{" "}
              and survive app updates.
            </p>
          </div>
        </div>
      </Reveal>

      {/* -------------------------------------------------- English only -- */}
      <Reveal delay={120} className="mt-8">
        <div className="container-narrow">
          <Callout>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Scale
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-accent-text"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="text-h3 text-fg">
                  Moonshine is English only, and that is a licensing boundary
                  rather than a missing feature.
                </h3>
                <p className="mt-3 text-body text-fg-muted">
                  Its English weights are MIT licensed. Every other language is
                  released under a non-commercial licence, so this app does not
                  ship them.
                </p>
                <p className="mt-3 text-body text-fg-muted">
                  Switching to Moonshine does not overwrite your Groq language
                  setting. If you are set to Spanish and you try Moonshine, you
                  are still set to Spanish when you switch back.
                </p>
              </div>
            </div>
          </Callout>
        </div>
      </Reveal>
    </Section>
  );
}
