import { Cloud, Laptop, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/ui/reveal";
import { CodeBlock } from "@/components/ui/code-block";
import { Callout } from "@/components/ui/callout";
import { Kbd } from "@/components/ui/kbd";
import { site } from "@/config/site";

const BUILD_COMMANDS = `git clone ${site.githubUrl}
cd dictateflow-ai
npm install     # postinstall runs electron-rebuild, do not skip it
npm run dev     # development, with hot reload
npm run dist    # produces the installer in release/`;

const GROQ_STEPS = [
  {
    n: "01",
    body: (
      <>
        Sign up at{" "}
        <a
          href="https://console.groq.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-code text-accent-text underline decoration-line underline-offset-4 hover:decoration-accent-text"
        >
          console.groq.com
        </a>
        . Free tier, no card required.
      </>
    ),
  },
  {
    n: "02",
    body: (
      <>
        Create an API key. It starts with{" "}
        <code className="font-mono text-code text-fg">gsk_</code>.
      </>
    ),
  },
  {
    n: "03",
    body: (
      <>
        Open Settings &rarr; API and paste it. It is encrypted immediately;
        copying that file to another machine gets you nothing, because DPAPI
        ties it to your Windows user account. The same key powers transforms
        unless you give it a Gemini key below.
      </>
    ),
  },
] as const;

/**
 * How to start, and how to build it yourself.
 *
 * The local path leads. "There is no setup" is a better first impression than
 * "go and get an API key", and the ordering is not just marketing: a reader
 * who only ever wanted the offline engine should never have to read the Groq
 * steps to find out they do not apply.
 */
export function Setup() {
  return (
    <Section
      id="setup"
      eyebrow="Setup"
      heading="Two paths, and one of them has no setup."
      lead="Install it, then pick an engine. There is no bundled key and no server in front of the API: on the cloud path you hold your own credentials, and on the local path there is nothing to hold."
    >
      <Reveal>
        <Panel className="flex flex-col gap-x-6 gap-y-3 sm:flex-row sm:items-baseline">
          <span
            className={
              "inline-flex h-8 shrink-0 items-center rounded-chip border " +
              "border-accent/30 bg-accent-soft px-2.5 font-display " +
              "text-[12px] font-semibold tracking-[0.08em] text-accent-text"
            }
          >
            00
          </span>
          <div>
            <h3 className="text-h3 text-fg">Run the installer</h3>
            <p className="mt-2 text-body text-fg-muted">
              It installs per-user and does not ask for administrator rights.
              Everything below is a choice you make afterwards, and you can
              change it whenever you like.
            </p>
          </div>
        </Panel>
      </Reveal>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {/* ------------------------------------------------- the local path -- */}
        <Reveal delay={80}>
          <Panel className="flex h-full flex-col">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <Laptop
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-fg-muted"
                strokeWidth={1.5}
              />
              <h3 className="text-h3 text-fg">Using Moonshine?</h3>
              <span
                className={
                  "ml-auto inline-flex h-6 shrink-0 items-center rounded-chip " +
                  "border border-accent/30 bg-accent-soft px-2 font-display " +
                  "text-[10.5px] font-semibold uppercase tracking-[0.08em] " +
                  "text-accent-text"
                }
              >
                No setup
              </span>
            </div>

            <p className="mt-4 text-body text-fg-muted">
              There is nothing to sign up for. Open Settings &rarr;
              Transcription, choose Moonshine, wait for the model to download,
              and dictate.
            </p>

            <p className="mt-auto pt-6 text-small text-fg-subtle">
              No key and no account. Once the download finishes, dictation
              touches nothing on the network.
            </p>
          </Panel>
        </Reveal>

        {/* ------------------------------------------------- the cloud path -- */}
        <Reveal delay={160}>
          <Panel className="flex h-full flex-col">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <Cloud
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-fg-muted"
                strokeWidth={1.5}
              />
              <h3 className="text-h3 text-fg">Using Groq?</h3>
              <span
                className={
                  "ml-auto inline-flex h-6 shrink-0 items-center rounded-chip " +
                  "border border-line px-2 font-display text-[10.5px] " +
                  "font-semibold uppercase tracking-[0.08em] text-fg-subtle"
                }
              >
                One free key
              </span>
            </div>

            <p className="mt-4 text-body text-fg-muted">
              You need a free API key. You talk to Groq directly with your own
              credentials.
            </p>

            <ol className="mt-5 border-t border-line">
              {GROQ_STEPS.map((step) => (
                <li
                  key={step.n}
                  className="flex gap-4 border-b border-line py-3.5 last:border-b-0 last:pb-0"
                >
                  <span
                    aria-hidden="true"
                    className="shrink-0 pt-0.5 font-display text-[12px] tabular-nums text-fg-subtle"
                  >
                    {step.n}
                  </span>
                  <p className="text-small text-fg-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </Panel>
        </Reveal>
      </div>

      {/* ------------------------------------------ optional, for transforms -- */}
      {/* Deliberately not a third column: it is not a third path, it is a
          preference inside one of them. Transforms already work on the Groq
          key from the panel above, so nobody has to read this to get going. */}
      <Reveal delay={200} className="mt-4">
        <Panel className="flex flex-col gap-x-6 gap-y-3 sm:flex-row sm:items-baseline">
          <span
            className={
              "inline-flex h-8 shrink-0 items-center rounded-chip border " +
              "border-line px-2.5 font-display text-[12px] font-semibold " +
              "tracking-[0.08em] text-fg-subtle"
            }
          >
            OPT
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h3 className="text-h3 text-fg">
                Use Gemini for transforms instead
              </h3>
              <Sparkles
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-fg-subtle"
                strokeWidth={1.5}
              />
            </div>
            <p className="mt-2 text-body text-fg-muted">
              Transforms run on your Groq key by default, so this is a
              preference and not a prerequisite. To use Google Gemini instead,
              get a free key at{" "}
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-code text-accent-text underline decoration-line underline-offset-4 hover:decoration-accent-text"
              >
                aistudio.google.com/apikey
              </a>{" "}
              and paste it into Settings &rarr; Transform. Whatever format
              Google hands you is fine: the app asks Google whether the key
              works rather than guessing from how it starts.
            </p>
          </div>
        </Panel>
      </Reveal>

      {/* -------------------------------------------------- the first run -- */}
      <Reveal delay={240} className="mt-10">
        <div className="container-narrow">
          <Callout>
            <h3 className="text-h3 text-fg">Then try it, in that order</h3>
            <ol className="mt-4 space-y-3">
              <li className="text-body text-fg-muted">
                <strong className="font-semibold text-fg">1.</strong> Open
                ChatGPT, Claude, or anything else with a text box. Hold{" "}
                <Kbd>Ctrl</Kbd> + <Kbd>Win</Kbd> and describe what you want,
                roughly and out loud. Release. It lands in the box.
              </li>
              <li className="text-body text-fg-muted">
                <strong className="font-semibold text-fg">2.</strong> Press{" "}
                <Kbd>Ctrl</Kbd> + <Kbd>Alt</Kbd> + <Kbd>E</Kbd>. The rough
                prompt becomes a structured one, in the box, before you hit
                send.
              </li>
            </ol>
            <p className="mt-4 text-small text-fg-subtle">
              That is both halves of the product in about fifteen seconds, and
              it is the fastest way to find out whether you want it.
            </p>
          </Callout>
        </div>
      </Reveal>

      <Reveal delay={100} className="mt-16">
        <div className="container-narrow">
          <div className="text-center">
            <h3 className="text-h3 text-fg">Or build it from source</h3>
            <p className="measure mx-auto mt-2 text-body text-fg-muted">
              Requires Node 20+ and Visual Studio Build Tools with the C++
              workload, for the native modules. It takes about five minutes.
            </p>
          </div>
          <CodeBlock
            className="mt-6"
            title="powershell"
            code={BUILD_COMMANDS}
            label="Copy the build commands"
          />
        </div>
      </Reveal>
    </Section>
  );
}
