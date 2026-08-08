import { hasSiteUrl, site } from "@/config/site";

/**
 * Brief §8. Only fields that are true — notably no `aggregateRating`, because
 * there are no ratings, and no download counts, because there are none to
 * report.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    description: site.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Windows",
    softwareVersion: site.version,
    license: "https://opensource.org/licenses/MIT",
    isAccessibleForFree: true,
    author: { "@type": "Person", name: site.author },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    ...(hasSiteUrl ? { url: site.siteUrl } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
