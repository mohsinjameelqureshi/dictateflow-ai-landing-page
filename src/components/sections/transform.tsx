import { Cloud, TextCursorInput, Undo2 } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/ui/reveal";
import { Kbd } from "@/components/ui/kbd";
import { GhostLink } from "@/components/ui/cta";
import { TransformDemo } from "@/components/transform-demo";
import { site } from "@/config/site";

/**
 * The second loop, and the reason this release exists.
 *
 * It sits directly after the dictation pipeline and directly before Privacy,
 * which is not an arbitrary slot: a transform is the one thing in the product
 * that can leave your machine even when you transcribe on-device, so the
 * reader has to meet it before they read the boundary diagram, not after.
 *
 * The demonstration leads and the copy follows. The claim here is entirely
 * about *where* the rewrite happens, and a picture of the same input box in
 * two states carries that faster than a paragraph can.
 *
 * Nothing on this page calls a transform smart, intelligent, or AI-powered.
 * It is a sentence the reader wrote, applied by a model the reader picked.
 */

const POINTS = [
  {
    icon: TextCursorInput,
    title: "Selection-aware",
    body: "Something selected? Only that gets rewritten. Nothing selected? The whole field. So you can fix one paragraph of a long draft without touching the rest of it.",
  },
  {
    icon: Undo2,
    title: "Your text is never lost",
    body: "Network down, rate limited, empty response, or you press Esc halfway through: the original goes straight back where it was. Your clipboard is restored too.",
  },
  {
    icon: Cloud,
    title: "Groq or Gemini, your choice",
    body: "Switch providers in Settings. The model list is read live from whichever you pick, so a retired model never sits in the dropdown waiting to fail.",
  },
] as const;

export function Transform() {
  return (
    <Section
      id="transform"
      eyebrow="New in 1.1.0"
      air
      heading={
        <>
          Rewrite what&rsquo;s{" "}
          <span className="text-accent-text">already there.</span>
        </>
      }
      lead="Dictation puts text into a field. A transform changes text that is already in one. Same idea, same absence of a window to switch to, pointed the other way."
    >
      <Reveal>
        <div className="mx-auto max-w-[820px]">
          <TransformDemo />
        </div>
      </Reveal>

      <Reveal delay={80} className="mt-5">
        <p className="measure mx-auto text-center text-small text-fg-subtle">
          One transform ships ready to use: <strong className="font-semibold text-fg">Enhance prompt</strong>, on{" "}
          <Kbd>Ctrl</Kbd> + <Kbd>Alt</Kbd> + <Kbd>E</Kbd>. Dictate a rough
          prompt into ChatGPT or Claude, press it, and the rough prompt becomes
          a good one, in the box, before you hit send.
        </p>
      </Reveal>

      {/* ------------------------------------------------- what a rule is -- */}
      <Reveal delay={100} className="mt-16">
        <div className="container-narrow grid gap-x-10 gap-y-5 sm:grid-cols-2">
          <p className="text-body text-fg-muted">
            <strong className="font-semibold text-fg">A rule is a
            sentence you write.</strong>{" "}
            &ldquo;Rewrite this as a clear prompt&rdquo;. &ldquo;Make this
            formal&rdquo;. &ldquo;Turn this into bullets&rdquo;. Bind it to a
            key combination and it is a transform. Add as many as you want.
          </p>
          <p className="text-body text-fg-muted">
            <strong className="font-semibold text-fg">Pressing it rewrites
            the field.</strong>{" "}
            The text is taken out of whatever input had focus, sent to the
            provider with your rule, and put back in its place. No window to
            switch to, nothing to copy, nothing to paste.
          </p>
        </div>
      </Reveal>

      {/* ------------------------------------------------ the three points -- */}
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {POINTS.map(({ icon: Icon, title, body }, i) => (
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
      </div>

      {/* ---------------------------------------------- the honest footing -- */}
      {/* Stated here rather than left for the privacy section to catch,
          because a reader who skims one band should not come away thinking
          this one runs on their machine. It does not. */}
      <Reveal delay={120} className="mt-10">
        <div className="container-narrow flex flex-col items-center gap-5 border-t border-line pt-8 sm:flex-row sm:justify-between">
          <p className="measure text-small text-fg-muted">
            <strong className="font-semibold text-fg">
              A transform is a network call.
            </strong>{" "}
            The text you transform goes to Groq or to Google, the same way
            dictation audio goes to Groq. If you transcribe on-device with
            Moonshine, this is the one action that leaves your machine, and the
            app says so in Settings rather than burying it.
          </p>

          <GhostLink href={site.releaseNotesUrl}>
            Read the 1.1.0 release notes
          </GhostLink>
        </div>
      </Reveal>
    </Section>
  );
}
