import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = new URL("..", import.meta.url).pathname;
const read = (path) => readFileSync(join(root, path), "utf8");

test("site exposes the required first-step pages and no low-quality locale placeholders", () => {
  assert.ok(existsSync(join(root, "src/pages/en/index.astro")));
  assert.ok(existsSync(join(root, "src/pages/en/download.astro")));
  assert.ok(!existsSync(join(root, "src/pages/zh-tw/index.astro")));
  assert.ok(!existsSync(join(root, "src/pages/ko/index.astro")));
  assert.ok(!existsSync(join(root, "src/pages/ja/index.astro")));
  assert.ok(!existsSync(join(root, "src/pages/de/index.astro")));
  assert.ok(!existsSync(join(root, "src/pages/es/index.astro")));
});

test("product facts keep the Android Google Play destination and UTM defaults centralized", () => {
  const product = read("src/config/product.ts");
  assert.match(product, /com\.smb\.picmuse/);
  assert.match(product, /BoRui Software Limited/);
  assert.match(product, /https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.smb\.picmuse/);
  assert.match(product, /utm_source:\s*"picmuse_app"/);
  assert.match(product, /utm_medium:\s*"official_site"/);
  assert.match(product, /utm_campaign:\s*"seo_mvp"/);
});

test("download utility appends required UTM fields and content_id", () => {
  const download = read("src/utils/download.ts");
  assert.match(download, /utm_content/);
  assert.match(download, /contentId/);
  assert.match(download, /cta_position/);
});

test("homepage uses the approved first-step feature order and avoids web app promises", () => {
  const page = read("src/pages/en/index.astro");
  const product = read("src/config/product.ts");
  const order = [
    "AI Video Generator",
    "Image to Video",
    "AI Image Generator",
    "AI Photo Editor",
    "Trend Inspiration"
  ];
  let cursor = -1;
  for (const label of order) {
    const next = product.indexOf(label);
    assert.ok(next > cursor, `${label} should appear after the previous feature`);
    cursor = next;
  }
  assert.doesNotMatch(page, /try\s+online|generate\s+online|web\s+app/i);
});

test("pages include SEO metadata, canonical URLs, and JSON-LD hooks", () => {
  const layout = read("src/layouts/BaseLayout.astro");
  const home = read("src/pages/en/index.astro");
  const download = read("src/pages/en/download.astro");
  const seo = read("src/utils/seo.ts");
  assert.match(layout, /rel="canonical"/);
  assert.match(layout, /property="og:title"/);
  assert.match(layout, /application\/ld\+json/);
  assert.match(seo, /SoftwareApplication/);
  assert.match(home, /softwareApplicationJsonLd/);
  assert.match(download, /softwareApplicationJsonLd/);
});

test("site includes Google Tag Manager container in head and noscript fallback", () => {
  const product = read("src/config/product.ts");
  const layout = read("src/layouts/BaseLayout.astro");
  assert.match(product, /containerId:\s*"GTM-MNQDVZ6C"/);
  assert.match(layout, /www\.googletagmanager\.com\/gtm\.js\?id=/);
  assert.match(layout, /www\.googletagmanager\.com\/ns\.html\?id=/);
  assert.match(layout, /product\.analytics\.gtm\.containerId/);
});

test("GitHub Pages deployment is configured for picmuse.app", () => {
  const workflowPath = join(root, "../../.github/workflows/deploy-pages.yml");
  assert.ok(existsSync(workflowPath));
  assert.equal(read("public/CNAME").trim(), "picmuse.app");
  assert.ok(existsSync(join(root, "public/.nojekyll")));
  const workflow = readFileSync(workflowPath, "utf8");
  assert.match(workflow, /npm ci/);
  assert.match(workflow, /npm run build/);
  assert.match(workflow, /apps\/picmuse-site\/dist/);
});
