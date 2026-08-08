import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

/**
 * A plain list: muted ink, hairline rules, no icons, no cards, no badges, and
 * emphatically no warning red. This is confidence, not an apology — the
 * product's credibility comes from documenting its limits rather than hiding
 * them, so the section sits on the page and not in a footer.
 *
 * No item ends with a workaround or a "but" that softens it.
 */
const LIMITS = [
  {
    clause: "It cannot type into elevated windows.",
    body: "Windows blocks a non-elevated process from sending input to one running as administrator — this is UIPI, not a bug. Dictating into an admin terminal shows “Can't type into this window”.",
  },
  {
    clause: "It needs a network connection.",
    body: "Expect 1–2 seconds between releasing the key and text appearing. Roughly 95% of that is network round-trip and free-tier queueing, not transcription.",
  },
  {
    clause: "Grammar cleanup is off by default.",
    body: "An LLM pass over Whisper's output measurably deletes words — it has to cut something to make ungrammatical input read cleanly. The raw transcript is always stored and always shown.",
  },
  {
    clause: "Very short or very quiet clips are dropped.",
    body: "Anything under 400ms or below the amplitude floor returns “Didn't catch that”, because Whisper invents confident text out of silence.",
  },
  {
    clause: "Windows only.",
    body: "The keyboard hook, the insertion path, and the packaging are all Windows-specific. There is no macOS or Linux build and none is planned.",
  },
  {
    clause: "The installer is not code signed.",
    body: "SmartScreen warns the first time you run it. Every release lists a SHA256 checksum instead.",
  },
] as const;

export function Limits() {
  return (
    <Section
      id="limits"
      eyebrow="Known limits"
      heading="What it does not do."
      lead="Six things, stated plainly. This list is a feature of the page, not a disclaimer at the bottom of it."
    >
      <div className="container-narrow">
        <ol className="border-t border-line">
          {LIMITS.map((limit, i) => (
            <Reveal
              as="li"
              key={limit.clause}
              delay={Math.min(i, 5) * 60}
              className="flex gap-5 border-b border-line py-6"
            >
              <span
                aria-hidden="true"
                className="shrink-0 pt-0.5 font-display text-[12px] tabular-nums text-fg-subtle"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-body text-fg-muted">
                <strong className="font-semibold text-fg">
                  {limit.clause}
                </strong>{" "}
                {limit.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
