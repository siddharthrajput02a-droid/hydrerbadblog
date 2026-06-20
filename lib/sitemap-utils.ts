export type XmlImage = {
  loc: string;
  title?: string;
  caption?: string;
};

export type XmlSitemapUrl = {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
  images?: XmlImage[];
};

export const xmlHeaders = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400"
};

export function xmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderImage(image: XmlImage) {
  return [
    "    <image:image>",
    `      <image:loc>${xmlEscape(image.loc)}</image:loc>`,
    image.title ? `      <image:title>${xmlEscape(image.title)}</image:title>` : "",
    image.caption ? `      <image:caption>${xmlEscape(image.caption)}</image:caption>` : "",
    "    </image:image>"
  ]
    .filter(Boolean)
    .join("\n");
}

function renderUrl(item: XmlSitemapUrl) {
  return [
    "  <url>",
    `    <loc>${xmlEscape(item.loc)}</loc>`,
    item.lastmod ? `    <lastmod>${xmlEscape(item.lastmod)}</lastmod>` : "",
    item.changefreq ? `    <changefreq>${item.changefreq}</changefreq>` : "",
    typeof item.priority === "number" ? `    <priority>${item.priority.toFixed(2)}</priority>` : "",
    ...(item.images || []).map(renderImage),
    "  </url>"
  ]
    .filter(Boolean)
    .join("\n");
}

export function sitemapXml(urls: XmlSitemapUrl[]) {
  const usesImages = urls.some((url) => url.images?.length);
  const imageNamespace = usesImages ? ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"' : "";

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${imageNamespace}>
${urls.map(renderUrl).join("\n")}
</urlset>`;
}

export function sitemapIndexXml(sitemaps: { loc: string; lastmod?: string }[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map((item) =>
    [
      "  <sitemap>",
      `    <loc>${xmlEscape(item.loc)}</loc>`,
      item.lastmod ? `    <lastmod>${xmlEscape(item.lastmod)}</lastmod>` : "",
      "  </sitemap>"
    ]
      .filter(Boolean)
      .join("\n")
  )
  .join("\n")}
</sitemapindex>`;
}
