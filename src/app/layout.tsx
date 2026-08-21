import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { canonicalOrigin, hasSiteUrl, site } from "@/config/site";
import "./globals.css";

/* The "Developer Mono" pairing: JetBrains Mono for anything that should read
   as machine-adjacent — display headings, eyebrows, stats, keycaps, code, the
   insertion line — and IBM Plex Sans for everything a person reads at length.
   next/font/google self-hosts both at build time, so the browser makes no
   request to Google and the page has no third-party runtime traffic. */
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/* One string, three places. These had already drifted apart once. */
const pageTitle = `${site.name}: Local-first dictation for Windows`;

export const metadata: Metadata = {
  // Always set, so absolute OG/canonical URLs are deterministic. While
  // `siteUrl` is a TODO this resolves to a reserved .invalid host — obviously
  // a placeholder — rather than Next's silent http://localhost:3000 fallback,
  // which looks real enough to ship by accident.
  metadataBase: new URL(canonicalOrigin),
  title: pageTitle,
  icons: {
    icon: "/icon-32.png",
    apple: "/apple-touch-icon.png",
  },
  description: site.searchDescription,
  applicationName: site.name,
  authors: [{ name: site.author }],
  keywords: [
    "dictation",
    "speech to text",
    "Windows",
    "local-first",
    "offline dictation",
    "on-device speech to text",
    "open source",
    "Whisper",
    "Moonshine",
  ],
  ...(hasSiteUrl ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    type: "website",
    siteName: site.name,
    title: pageTitle,
    description: site.description,
    ...(hasSiteUrl ? { url: "/" } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: site.description,
  },
};

/* Runs before first paint.
   1. Stamps `js` on <html>, which is what arms the scroll-reveal styles. With
      JavaScript off the class never lands and nothing is ever hidden, so the
      full page is present for crawlers and no-JS readers.
   2. Resolves the colour theme so there is no flash of the wrong one. Dark is
      the default; an explicit choice stamps data-theme, and "system" leaves
      the attribute off so prefers-color-scheme decides. */
const bootScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("dictateflow-theme");if(t==="light"||t==="dark"){d.setAttribute("data-theme",t)}else{d.removeAttribute("data-theme")}}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jetbrains.variable} ${plex.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
