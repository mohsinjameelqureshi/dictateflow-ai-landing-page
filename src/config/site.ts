/**
 * Single source of truth for every value the owner still has to supply.
 * Brief §0. Change these here and nowhere else.
 *
 * Placeholders are written literally as `TODO_*`. Nothing derives a
 * half-valid URL from a missing base: `isConfigured` gates every CTA, so it
 * is impossible to ship the site with a dead primary button by accident.
 */

const githubUrl = "https://github.com/mohsinjameelqureshi/dictateflow-ai";
const siteUrl = "https://dictateflow-ai.mohsinjameel.dev";

/**
 * The one flag. Every CTA reads this — one behaviour, no per-button logic.
 */
export const isConfigured = !githubUrl.startsWith("TODO_");

/** True once the owner supplies a canonical origin for OG + canonical tags. */
export const hasSiteUrl = siteUrl.startsWith("https://");

/**
 * Used only for `metadataBase` and the sitemap, both of which need an
 * absolute origin to resolve against. Never rendered to the reader.
 */
export const canonicalOrigin = hasSiteUrl ? siteUrl : "https://example.invalid";

export const site = {
  name: "DictateFlow AI",
  /** Brief §1 — use verbatim wherever a short description is needed. */
  tagline: "Local-first desktop dictation for Windows.",
  description:
    "Hold a shortcut, speak, release. The text appears in whatever app had focus. Transcribe in the cloud or fully offline on your own machine. Your history, recordings and statistics never leave it. Free and open source.",
  /**
   * The one above is 216 characters, which Google truncates at roughly 155,
   * cutting off "Free and open source" - the strongest differentiator. This
   * shorter cut is used for the meta description only; OG and schema keep the
   * full text, where there is no such limit. It also carries the category
   * words a searcher actually types, which the headline voice does not.
   */
  searchDescription:
    "Free, open-source voice typing for Windows. Hold a shortcut, speak, release: the text appears in any app. Fully offline speech to text, or cloud.",
  author: "Mohsin Jameel Qureshi",
  license: "MIT",

  githubUrl,
  siteUrl,
  releasesUrl: `${githubUrl}/releases`,
  issuesUrl: `${githubUrl}/issues`,
  /** Never a hardcoded filename — the release page always has the current one. */
  downloadUrl: `${githubUrl}/releases`,
  securityUrl: `${githubUrl}/blob/main/SECURITY.md`,
  contributingUrl: `${githubUrl}/blob/main/CONTRIBUTING.md`,
  licenseUrl: `${githubUrl}/blob/main/LICENSE`,

  version: "1.0.0",
  installerName: "dictateflow-ai.exe",
  installerSize: "109 MB",
  platform: "Windows x64",

  /**
   * Matches `Get-FileHash .\dictateflow-ai.exe` (uppercase, as PowerShell prints
   * it) so a reader can compare the two strings by eye. While it is
   * `TODO_SHA256` the checksum row is omitted entirely rather than showing a
   * fake hash (brief §6.7).
   */
  sha256: "EA25E5771F7A21B7DCAF2CC6AEC7D6979665BA20300AA4D1E2537AE2CB7D1C1F",
  contactEmail: "qureshimohsinjameel@gmail.com",
} as const;

export const hasChecksum = !site.sha256.startsWith("TODO_");
export const hasContactEmail = !site.contactEmail.startsWith("TODO_");

/** Rendered under the primary CTA. Brief §6.2. */
export const releaseLine = `v${site.version} · ${site.platform} · ${site.installerSize} · unsigned installer`;
