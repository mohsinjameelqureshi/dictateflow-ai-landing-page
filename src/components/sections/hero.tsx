import { ArrowRight, EyeOff, Scale, UserX, WifiOff } from "lucide-react";
import { releaseLine, site } from "@/config/site";
import { Kbd } from "@/components/ui/kbd";
import { ActionLink } from "@/components/ui/cta";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { HeroDemo } from "@/components/hero-demo";

/* "Bring your own Groq key" used to sit in this row. It is now true of only
   one of the two engines, and a blanket claim that overstates a prerequisite
   is worse than no claim: the offline path needs no key at all. The row
   carries the choice instead, which is also the strongest new thing to say. */
const TRUST = [
  { icon: Scale, label: "MIT licensed" },
  { icon: UserX, label: "No account required" },
  { icon: EyeOff, label: "No telemetry" },
  { icon: WifiOff, label: "Optional offline mode" },
] as const;

/**
 * A centred, single-column hero.
 *
 * The old two-column split gave the headline half the container, which capped
 * a two-line setting at 35px — well under the display size the type scale is
 * built for. Giving the h1 the full width lets it run to 60px, and the
 * demonstration reads better wide than tall anyway.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden="true" className="ambient" />

      <div className="container-page relative pb-20 pt-24 md:pb-28 md:pt-32">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Eyebrow>Local-first dictation</Eyebrow>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-6 max-w-[19ch] text-balance font-display text-display-hero text-fg">
              Hold a key. Speak. The words land where you were typing.
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="measure-lead mt-6 text-pretty text-lead text-fg-muted">
              Hold <Kbd>Ctrl</Kbd> + <Kbd>Win</Kbd>, speak, release. The text is
              pasted into whatever application had focus: editor, browser
              field, terminal.
            </p>
          </Reveal>

          {/* The second gesture, written to mirror the first line word for
              word: hold to put text in, tap to change the text that is
              already in. The parallel is the pitch. */}
          <Reveal delay={150}>
            <p className="measure-lead mt-4 text-pretty text-lead text-fg-muted">
              Tap <Kbd>Ctrl</Kbd> + <Kbd>Alt</Kbd> + <Kbd>E</Kbd> and a rule
              you wrote rewrites the text that is already there, in the same
              field, without switching windows.
            </p>
          </Reveal>

          {/* The engine line, and the reason it is a line rather than a badge
              in the trust row: the choice between cloud and on-device is the
              product's strongest claim, and a badge would not carry it. It
              also has to sit under both gestures, because it qualifies the
              first one and not the second. */}
          <Reveal delay={180}>
            <p className="measure-lead mt-4 text-pretty text-lead text-fg">
              Transcribe in the cloud, or{" "}
              <span className="text-accent-text">
                entirely on your own machine
              </span>
              . Your history, recordings and statistics stay there either way.
            </p>
          </Reveal>

          {/* The one badge on the page. It links, because a reader who
              notices it wants the section and not the fact. */}
          <Reveal delay={210}>
            <a
              href="#transform"
              className={
                "mt-9 inline-flex items-center gap-2.5 rounded-chip border " +
                "border-accent/30 bg-accent-soft py-1.5 pl-2.5 pr-3 " +
                "transition-colors duration-[var(--dur-press)] " +
                "ease-[var(--ease-out)] hover:border-accent/60"
              }
            >
              <span className="font-display text-[10.5px] font-semibold uppercase tracking-[0.1em] text-accent-text">
                New in 1.1.0
              </span>
              <span aria-hidden="true" className="h-3 w-px bg-accent/40" />
              <span className="text-small text-fg">Transform</span>
              <ArrowRight
                aria-hidden="true"
                className="h-3.5 w-3.5 text-accent-text"
                strokeWidth={2}
              />
            </a>
          </Reveal>

          <Reveal
            delay={240}
            className="mt-7 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
          >
            <ActionLink href={site.downloadUrl} className="w-full sm:w-auto">
              Download for Windows
            </ActionLink>
            <ActionLink
              href={site.githubUrl}
              variant="ghost"
              className="w-full sm:w-auto"
            >
              View the source
            </ActionLink>
          </Reveal>

          <Reveal delay={280}>
            <p className="mt-5 font-display text-[12px] tracking-tight text-fg-subtle">
              {releaseLine}
            </p>
          </Reveal>

          {/* One row on desktop with hairline dividers; a 2x2 grid on mobile,
              which is what actually fits at 360px. */}
          <Reveal delay={320} className="mt-12 w-full">
            <ul className="mx-auto grid max-w-[560px] grid-cols-2 gap-x-6 gap-y-4 sm:max-w-none sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-0">
              {TRUST.map(({ icon: Icon, label }, i) => (
                <li
                  key={label}
                  className="flex min-w-0 items-center gap-2 text-micro text-fg-muted sm:px-5 sm:first:pl-0 sm:last:pr-0"
                >
                  {i > 0 ? (
                    <span
                      aria-hidden="true"
                      className="hidden h-3.5 w-px shrink-0 bg-line sm:mr-5 sm:block"
                    />
                  ) : null}
                  <Icon
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-fg-subtle"
                    strokeWidth={1.5}
                  />
                  <span className="truncate">{label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={380} className="mx-auto mt-16 max-w-[920px] md:mt-20">
          <HeroDemo />
        </Reveal>
      </div>
    </section>
  );
}
