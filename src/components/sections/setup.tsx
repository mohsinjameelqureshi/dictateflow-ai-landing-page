import { Section } from "@/components/ui/section";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/ui/reveal";
import { CodeBlock } from "@/components/ui/code-block";
import { site } from "@/config/site";

const BUILD_COMMANDS = `git clone ${site.githubUrl}
cd dictateflow-ai
npm install     # postinstall runs electron-rebuild, do not skip it
npm run dev     # development, with hot reload
npm run dist    # produces the installer in release/`;

const STEPS = [
  {
    n: "01",
    title: "Run the installer",
    body: <>It installs per-user and does not ask for administrator rights.</>,
  },
  {
    n: "02",
    title: "Get a free Groq API key",
    body: (
      <>
        At{" "}
        <a
          href="https://console.groq.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-code text-accent-text underline decoration-line underline-offset-4 hover:decoration-accent-text"
        >
          console.groq.com
        </a>
        . Free tier, no card required. It starts with{" "}
        <code className="font-mono text-code text-fg">gsk_</code>.
      </>
    ),
  },
  {
    n: "03",
    title: "Paste it into Settings → Transcription",
    body: (
      <>
        It is encrypted immediately. Copying that file to another machine gets
        you nothing: DPAPI ties it to your Windows user account.
      </>
    ),
  },
] as const;

/** How to start, and how to build it yourself. */
export function Setup() {
  return (
    <Section
      id="setup"
      eyebrow="Setup"
      heading="Three steps, and one of them is getting a key."
      lead="There is no bundled key and no server in front of the API. You hold your own credentials."
    >
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
