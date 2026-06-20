import { hyderabadAreas, profiles } from "@/data/profiles";
import { siteConfig, slugifyArea } from "@/lib/utils";

export const dynamic = "force-static";

export function GET() {
  const areaLinks = hyderabadAreas
    .map((area) => `- ${area}: ${siteConfig.url}/hyderabad/${slugifyArea(area)}`)
    .join("\n");
  const listingLinks = profiles
    .slice(0, 12)
    .map((profile) => `- ${profile.name}: ${siteConfig.url}/profile/${profile.slug}`)
    .join("\n");

  const body = `# AI Discovery: ${siteConfig.name}

Purpose: machine-readable route and entity discovery for AI crawlers and assistants.

Primary Entity:
- Name: ${siteConfig.name}
- URL: ${siteConfig.url}
- Market: Hyderabad, Telangana, India
- Audience: Adults 18+

Canonical Route Hierarchy:
- City hub: ${siteConfig.url}/hyderabad
- Public ads: ${siteConfig.url}/ads
- LLM discovery page: ${siteConfig.url}/llm-discovery

Area Routes:
${areaLinks}

Sample Listing Routes:
${listingLinks}

Machine Files:
- Robots: ${siteConfig.url}/robots.txt
- Sitemap index: ${siteConfig.url}/sitemap-index.xml
- City sitemap: ${siteConfig.url}/sitemaps/city-sitemap.xml
- Area sitemap: ${siteConfig.url}/sitemaps/area-sitemap.xml
- Listing sitemap: ${siteConfig.url}/sitemaps/listing-sitemap.xml
- Image sitemap: ${siteConfig.url}/sitemaps/image-sitemap.xml
- LLM summary: ${siteConfig.url}/llms.txt
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400"
    }
  });
}
