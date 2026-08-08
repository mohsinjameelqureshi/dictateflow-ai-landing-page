import { Plus } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

/**
 * Native <details>/<summary>, not a JS accordion: it is keyboard-operable and
 * findable by the browser's own page search for free, which matters more here
 * than a height transition.
 *
 * Every answer is verified against the product. None are invented.
 */
const FAQ = [
  {
    q: "Is it free?",
    a: "Yes, MIT licensed. You pay nothing for the app. Transcription runs on Groq's free tier with your own key — also free, no card required.",
  },
  {
    q: "Do I need an account?",
    a: "No. There is no login, no account, and no server run by this project.",
  },
  {
    q: "Where is my data?",
    a: "In a SQLite file and a recordings folder under %APPDATA%\\typeflow-ai. Export everything to plain JSON whenever you like.",
  },
  {
    q: "Is there a Mac or Linux version?",
    a: "No, and none is planned. The keyboard hook, the text insertion, and the packaging are all Windows-specific.",
  },
  {
    q: "Does it work offline?",
    a: "No. Transcription is a network call to Groq. The provider is behind an interface so a local model could be added later, but nothing is built today.",
  },
  {
    q: "How fast is it?",
    a: "1–2 seconds from releasing the key to text appearing. About 95% of that is network round-trip and free-tier queueing.",
  },
  {
    q: "Can it type into my admin terminal?",
    a: "No. Windows blocks a non-elevated process from sending input to an elevated one. The app tells you rather than silently failing.",
  },
  {
    q: "What happens to my clipboard?",
    a: "It is saved before the paste and restored after.",
  },
  {
    q: "Can I fix words it always gets wrong?",
    a: "Yes — the Dictionary is find-and-replace applied after transcription, and its entries also prime Whisper so some errors never happen.",
  },
  {
    q: "Is my API key safe?",
    a: "It is encrypted with Windows DPAPI via Electron's safeStorage, tied to your Windows account, and stored outside the database. It is never written to a backup export.",
  },
] as const;

export function Faq() {
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      heading="Questions with verified answers."
      lead="Nothing here is aspirational. If the answer is no, it says no."
    >
      <div className="container-narrow">
        <Reveal>
          <div className="overflow-hidden rounded-card border border-line bg-surface-1 shadow-[var(--shadow-panel)]">
            {FAQ.map((item, i) => (
              <details
                key={item.q}
                open={i === 0}
                className="group border-b border-line last:border-b-0"
              >
                <summary
                  className={
                    "flex list-none items-center justify-between gap-4 " +
                    "px-5 py-4 text-body font-medium text-fg md:px-7 " +
                    "transition-colors duration-[var(--dur-press)] " +
                    "ease-[var(--ease-out)] hover:bg-surface-2/60"
                  }
                >
                  {item.q}
                  <Plus
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className={
                      "h-4 w-4 shrink-0 text-fg-subtle " +
                      "transition-transform duration-[var(--dur-state)] " +
                      "ease-[var(--ease-out)] group-open:rotate-45"
                    }
                  />
                </summary>
                <p className="px-5 pb-5 text-body text-fg-muted md:px-7">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
