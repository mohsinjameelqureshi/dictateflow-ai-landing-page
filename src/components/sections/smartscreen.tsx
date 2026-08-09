import { hasChecksum, releaseLine, site } from "@/config/site";
import { Section } from "@/components/ui/section";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";
import { InsertionLine } from "@/components/ui/insertion-line";
import { ActionLink } from "@/components/ui/cta";
import { Reveal } from "@/components/ui/reveal";

/**
 * Users will hit a frightening Windows dialog. Explaining it before they see
 * it is the difference between a download and an uninstall, which is why this
 * lands after the reader has a reason to care and before the install steps.
 *
 * No red, no warning triangle, no amber. Styling it as a warning teaches the
 * reader to treat it as one.
 */
export function SmartScreen() {
  return (
    <Section
      id="smartscreen"
      eyebrow="Before you install"
      heading="Windows will warn you, and it is right to."
    >
      <div className="container-narrow">
        <Reveal>
          <Callout>
            <p className="text-body text-fg-muted">
              The installer is not code signed. A certificate costs a few
              hundred dollars a year, which is not justified for a personal
              project given away for free. Windows SmartScreen will say
              &ldquo;Windows protected your PC&rdquo;. Click{" "}
              <span className="font-sans font-semibold text-fg">More info</span>{" "}
              &rarr;{" "}
              <span className="font-sans font-semibold text-fg">Run anyway</span>
              .
            </p>
            <p className="mt-4 text-body text-fg-muted">
              That warning means &ldquo;nobody has paid to vouch for this
              file&rdquo;, not &ldquo;this file is known to be malicious&rdquo;.
              Every release lists a SHA256 checksum, and you can build it
              yourself from source in about five minutes.
            </p>

            {/* Omitted entirely while the checksum is unknown, rather than
                showing a placeholder hash. */}
            {hasChecksum ? (
              <div className="mt-6">
                <p className="text-micro text-fg-subtle">
                  SHA256 &middot; {site.installerName}
                </p>
                <CodeBlock
                  className="mt-2"
                  title="sha256"
                  code={site.sha256}
                  label="Copy the installer checksum"
                />
              </div>
            ) : null}
          </Callout>
        </Reveal>

        {/* The closing invitation: an empty line, caret blinking, waiting. */}
        <Reveal delay={120} className="mt-14">
          <div className="rounded-card border border-line bg-surface-1 p-6 text-center shadow-[var(--shadow-panel)] md:p-9">
            <InsertionLine caret="blink" className="mx-auto max-w-[440px]" />

            <p className="mx-auto mt-7 max-w-[42ch] text-pretty text-lead text-fg">
              Your next sentence goes wherever you were already working.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ActionLink
                href={site.downloadUrl}
                className="w-full sm:w-auto"
              >
                Download for Windows
              </ActionLink>
              <ActionLink
                href={site.githubUrl}
                variant="ghost"
                className="w-full sm:w-auto"
              >
                View the source
              </ActionLink>
            </div>

            <p className="mt-5 font-display text-[12px] tracking-tight text-fg-subtle">
              {releaseLine}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
