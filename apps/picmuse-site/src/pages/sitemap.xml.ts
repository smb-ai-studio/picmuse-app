import type { APIRoute } from "astro";
import { canonicalUrl } from "@/utils/seo";

const pages = ["/en/", "/en/download/"];

export const GET: APIRoute = () => {
  const urls = pages
    .map((path) => `<url><loc>${canonicalUrl(path)}</loc><changefreq>weekly</changefreq></url>`)
    .join("");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "X-Robots-Tag": "index"
    }
  });
};
