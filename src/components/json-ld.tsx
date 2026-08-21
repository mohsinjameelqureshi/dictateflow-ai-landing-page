import { canonicalOrigin, hasSiteUrl, site } from "@/config/site";

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
    /* Only what the site itself claims. No minimum Windows build is stated
       anywhere on the page, so none is asserted here. */
    softwareRequirements: site.platform,
    fileSize: site.installerSize,
    downloadUrl: site.downloadUrl,
    license: "https://opensource.org/licenses/MIT",
    isAccessibleForFree: true,
    author: { "@type": "Person", name: site.author },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    ...(hasSiteUrl
      ? { url: site.siteUrl, image: `${canonicalOrigin}/opengraph-image.png` }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
