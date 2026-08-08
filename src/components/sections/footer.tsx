import { isConfigured, site } from "@/config/site";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { CtaTodoNote } from "@/components/ui/cta";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: site.githubUrl, label: "GitHub" },
  { href: site.releasesUrl, label: "Releases" },
  { href: site.issuesUrl, label: "Issues" },
  { href: site.securityUrl, label: "SECURITY.md" },
  { href: site.contributingUrl, label: "CONTRIBUTING.md" },
  { href: site.licenseUrl, label: "LICENSE" },
] as const;

/**
 * No newsletter signup, no social icons beyond GitHub. The theme toggle lives
 * here rather than in the nav: it is a preference, not a destination, and the
 * bar already carries two calls to action.
 */
export function Footer() {
  return (
    <footer className="seam border-t border-line bg-deep">
      <div className="container-page py-14 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2.5 font-sans text-[15px] font-semibold tracking-tight text-fg">
              <Logo size={28} className="h-7 w-7" />
              {site.name}
            </div>
            <p className="mt-4 max-w-[34ch] text-small text-fg-muted">
              {site.tagline}
            </p>
            <p className="mt-2 font-display text-[12px] text-fg-subtle">
              v{site.version} &middot; {site.license} &copy; 2026 {site.author}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-3 md:grid-cols-2">
              {LINKS.map((link) => (
                <li key={link.label}>
                  {isConfigured ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "text-small text-fg-muted",
                        "transition-colors duration-[var(--dur-press)] ease-[var(--ease-out)]",
                        "hover:text-fg",
                      )}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <span className="text-small text-fg-subtle">
                      {link.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <CtaTodoNote />
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
