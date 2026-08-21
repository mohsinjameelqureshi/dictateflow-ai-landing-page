import type { MetadataRoute } from "next";
import { canonicalOrigin, hasSiteUrl } from "@/config/site";

export const dynamic = "force-static";

/**
 * One page, one entry. While `siteUrl` is still a TODO the sitemap is empty
 * rather than listing a placeholder origin that would be wrong everywhere it
 * is read.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!hasSiteUrl) return [];

  return [
    {
      url: `${canonicalOrigin}/`,
      lastModified: new Date("2026-08-21"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
