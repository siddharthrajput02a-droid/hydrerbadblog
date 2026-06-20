import { sitemapIndexXml, xmlHeaders } from "@/lib/sitemap-utils";
import { siteConfig } from "@/lib/utils";

export const dynamic = "force-static";

export function GET() {
  const lastmod = new Date().toISOString();
  const xml = sitemapIndexXml([
    { loc: `${siteConfig.url}/sitemaps/city-sitemap.xml`, lastmod },
    { loc: `${siteConfig.url}/sitemaps/area-sitemap.xml`, lastmod },
    { loc: `${siteConfig.url}/sitemaps/listing-sitemap.xml`, lastmod },
    { loc: `${siteConfig.url}/sitemaps/image-sitemap.xml`, lastmod }
  ]);

  return new Response(xml, { headers: xmlHeaders });
}
