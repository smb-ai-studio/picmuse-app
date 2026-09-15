import type { APIRoute } from "astro";
import { product } from "@/config/product";

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\nSitemap: ${product.domain}/sitemap.xml\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });

