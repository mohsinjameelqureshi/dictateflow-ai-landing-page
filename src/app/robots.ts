import type { MetadataRoute } from "next";
import { canonicalOrigin, hasSiteUrl } from "@/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    // Only advertise a sitemap once there is a real origin to build it from.
    ...(hasSiteUrl ? { sitemap: `${canonicalOrigin}/sitemap.xml` } : {}),
  };
}
