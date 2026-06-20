import { hyderabadAreas } from "@/data/profiles";
import { sitemapXml, xmlHeaders } from "@/lib/sitemap-utils";
import { siteConfig, slugifyArea } from "@/lib/utils";

export const dynamic = "force-static";

export function GET() {
  const lastmod = new Date().toISOString();
  const xml = sitemapXml(
    hyderabadAreas.map((area) => ({
      loc: `${siteConfig.url}/hyderabad/${slugifyArea(area)}`,
      lastmod,
      changefreq: "weekly",
      priority: 0.8
    }))
  );

  return new Response(xml, { headers: xmlHeaders });
}
