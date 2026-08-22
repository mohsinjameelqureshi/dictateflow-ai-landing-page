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
    a: "Yes, MIT licensed. You pay nothing for the app. The local engine costs nothing to run. The cloud engine runs on Groq's free tier with your own key, which is also free and needs no card.",
  },
  {
    q: "Do I need an API key?",
    a: "For Groq, for transforms, and for optional grammar cleanup. Moonshine, the local engine, needs no key and no account at all, so dictating on it needs nothing from you. One free Groq key covers all three.",
  },
  {
    q: "Does it work offline?",
    a: "Dictation does, on the Moonshine engine. After a one-time model download, dictating makes no network requests, so airplane mode changes nothing. On Groq every dictation is a network call. Transforms and grammar cleanup are always network calls, on either engine.",
  },
  {
    q: "Does Moonshine run a language model on my machine?",
    a: "No. Moonshine is a speech-to-text model: it turns audio into text and does nothing else. Every language model this app touches runs in the cloud, on hardware belonging to Groq or Google: transforms use one, and optional grammar cleanup uses another. Nothing that writes English runs on your machine.",
  },
  {
    q: "Why is Moonshine English only?",
    a: "Licensing, not capability. Its English weights are MIT licensed; every other language is released under a non-commercial licence, so this app does not ship them. Switching to Moonshine does not overwrite your Groq language setting.",
  },
  {
    q: "How big is the local model, and where does it go?",
    a: "292 MB for the default Medium model, 159 MB for Small, 51 MB for Tiny. They download inside the app, resume if interrupted, are checksum-verified, and live in %APPDATA%\\dictateflow-ai\\models, where they survive app updates.",
  },
  {
    q: "How fast is it?",
    a: "On Groq, 1-2 seconds from releasing the key to text appearing, about 95% of which is network round-trip and free-tier queueing. On Moonshine, roughly half the length of what you spoke: a 10 second dictation is about 5 seconds of local compute.",
  },
  {
    q: "What is a transform?",
    a: "A rule you write, bound to a shortcut. Press the shortcut and the text in your current input field is rewritten according to that rule, in place, without switching windows. One ships ready to use: Enhance prompt, on Ctrl + Alt + E.",
  },
  {
    q: "How is a transform different from dictation?",
    a: "Dictation is your voice going in. A transform works on text that is already there, whether you dictated it, typed it or pasted it.",
  },
  {
    q: "What happens to my text if the AI call fails?",
    a: "It goes back exactly where it was. That covers a dead network, a rate limit, an empty response, and pressing Esc part way through. Your clipboard is restored too.",
  },
  {
    q: "Does a transform rewrite everything, or just what I selected?",
    a: "Your selection if you have one, the whole field if you do not. In a document with nothing selected that means the whole document, so select first when the field is large.",
  },
  {
    q: "Which AI does a transform use?",
    a: "Groq or Google Gemini, your choice, set in Settings. The model list comes live from whichever you pick, so a retired model never sits in the dropdown waiting to fail.",
  },
  {
    q: "My Gemini key does not start with AIza. Is it valid?",
    a: "Probably. Google issues keys beginning AQ. as well as AIza, and this app accepts both. Rather than guessing at the format, it asks Google whether your key works and tells you the answer: there is a Check it works button on the key card.",
  },
  {
    q: "How fast is a transform?",
    a: "Typically a bit over a second. Gemini transforms run with thinking disabled, because a rewrite is not a reasoning task, and that alone roughly halves the wait.",
  },
  {
    q: "Are transforms private?",
    a: "No, and the app does not pretend otherwise. The text you transform is sent to the provider you chose, the same way dictation audio is sent to Groq. If you transcribe on-device with Moonshine, a transform is the one action that leaves your machine, and Settings says so rather than burying it.",
  },
  {
    q: "Are transforms saved to my history?",
    a: "No. They are counted per rule, so you can see which ones you actually use, but they are deliberately kept out of the dictation history: words per minute is measured against recording length, and a transform has no recording.",
  },
  {
    q: "Can a transform shortcut clash with my dictation shortcut?",
    a: "The app will not let it. It refuses any combination that contains another one. If dictation is Ctrl + Win, then Ctrl + Win + E is rejected, because pressing it would start a recording before the E registered. You are told which shortcut is in the way.",
  },
  {
    q: "Do I need an account?",
    a: "No. There is no login, no account, and no server run by this project.",
  },
  {
    q: "Where is my data?",
    a: "In a SQLite file and a recordings folder under %APPDATA%\\dictateflow-ai. Export everything to plain JSON whenever you like.",
  },
  {
    q: "Is there a Mac or Linux version?",
    a: "No, and none is planned. The keyboard hook, the text insertion, and the packaging are all Windows-specific.",
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
    a: "Yes. The Dictionary is find-and-replace applied after transcription, on either engine, and its entries also prime Whisper so some errors never happen on the cloud path.",
  },
  {
    q: "Are my API keys safe?",
    a: "Both of them are encrypted with Windows DPAPI via Electron's safeStorage, tied to your Windows account, and stored outside the database. The app's own interface cannot read them back: it can ask whether a key exists, not what it is. Neither is ever written to a backup export. If you only dictate on Moonshine there is no key to protect.",
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
