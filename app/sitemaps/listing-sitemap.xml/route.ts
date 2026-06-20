import { profiles } from "@/data/profiles";
import { sitemapXml, xmlHeaders } from "@/lib/sitemap-utils";
import { siteConfig } from "@/lib/utils";

export const dynamic = "force-static";

export function GET() {
  const lastmod = new Date().toISOString();
  const xml = sitemapXml(
    profiles.map((profile) => ({
      loc: `${siteConfig.url}/profile/${profile.slug}`,
      lastmod,
      changefreq: "weekly",
      priority: 0.75
    }))
  );

  return new Response(xml, { headers: xmlHeaders });
}
