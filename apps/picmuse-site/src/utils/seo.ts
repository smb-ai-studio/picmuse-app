import { product } from "@/config/product";

export type SeoInput = {
  title: string;
  description: string;
  path: string;
};

export function canonicalUrl(path: string) {
  return new URL(path, product.domain).toString();
}

export function softwareApplicationJsonLd(path = "/en/") {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.brandName,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Android",
    url: canonicalUrl(path),
    downloadUrl: product.android.storeUrl,
    softwareVersion: "Android production app",
    contentRating: product.contentRating.minimumAge,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock"
    },
    publisher: {
      "@type": "Organization",
      name: product.legalName
    },
    identifier: product.android.packageName
  };
}

