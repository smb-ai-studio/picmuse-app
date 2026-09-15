import { product } from "@/config/product";

type DownloadUrlInput = {
  contentId: string;
  cta_position: "hero" | "feature" | "showcase" | "download-page" | "footer";
  locale?: string;
  pageType?: string;
};

export function buildGooglePlayUrl({ contentId, cta_position, locale = product.defaultLocale, pageType }: DownloadUrlInput) {
  const url = new URL(product.android.storeUrl);
  url.searchParams.set("utm_source", product.utm.utm_source);
  url.searchParams.set("utm_medium", product.utm.utm_medium);
  url.searchParams.set("utm_campaign", product.utm.utm_campaign);
  url.searchParams.set("utm_content", contentId);
  url.searchParams.set("content_id", contentId);
  url.searchParams.set("locale", locale);
  url.searchParams.set("platform", "android");
  url.searchParams.set("cta_position", cta_position);
  if (pageType) {
    url.searchParams.set("page_type", pageType);
  }
  return url.toString();
}

export function storeClickPayload({ contentId, cta_position, locale = product.defaultLocale, pageType = "landing" }: DownloadUrlInput) {
  return {
    product_id: product.id,
    platform: "android",
    locale,
    content_id: contentId,
    page_type: pageType,
    cta_position
  };
}

