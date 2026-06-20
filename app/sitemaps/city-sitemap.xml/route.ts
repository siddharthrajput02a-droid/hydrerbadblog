import { siteConfig } from "@/lib/utils";
import { sitemapXml, xmlHeaders } from "@/lib/sitemap-utils";

export const dynamic = "force-static";

export function GET() {
  const lastmod = new Date().toISOString();
  const xml = sitemapXml([
    {
      loc: siteConfig.url,
      lastmod,
      changefreq: "daily",
      priority: 1
    },
    {
      loc: `${siteConfig.url}/hyderabad`,
      lastmod,
      changefreq: "daily",
      priority: 0.9
    },
    {
      loc: `${siteConfig.url}/ads`,
      lastmod,
      changefreq: "hourly",
      priority: 0.7
    },
    {
      loc: `${siteConfig.url}/llm-discovery`,
      lastmod,
      changefreq: "monthly",
      priority: 0.4
    }
  ]);

  return new Response(xml, { headers: xmlHeaders });
}
