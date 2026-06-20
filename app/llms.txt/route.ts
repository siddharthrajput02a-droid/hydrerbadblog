import { NextResponse } from "next/server";
import { hyderabadAreas } from "@/data/profiles";
import { siteConfig, slugifyArea } from "@/lib/utils";

export const dynamic = "force-static";

export function GET() {
  const areaLinks = hyderabadAreas
    .map((area) => `- ${area}: ${siteConfig.url}/hyderabad/${slugifyArea(area)}`)
    .join("\n");

  const body = `# ${siteConfig.name}

${siteConfig.description}

## Primary Crawlable Routes
- Home: ${siteConfig.url}
- Hyderabad city hub: ${siteConfig.url}/hyderabad
- Approved posted ads: ${siteConfig.url}/ads
- LLM discovery page: ${siteConfig.url}/llm-discovery
- XML sitemap: ${siteConfig.url}/sitemap.xml
- Sitemap index: ${siteConfig.url}/sitemap-index.xml
- AI discovery file: ${siteConfig.url}/ai.txt
- City sitemap: ${siteConfig.url}/sitemaps/city-sitemap.xml
- Area sitemap: ${siteConfig.url}/sitemaps/area-sitemap.xml
- Listing sitemap: ${siteConfig.url}/sitemaps/listing-sitemap.xml
- Image sitemap: ${siteConfig.url}/sitemaps/image-sitemap.xml

## Hyderabad Area Pages
${areaLinks}

## Content Notes
- Adult 18+ directory content.
- Public SEO pages are server-rendered with canonical URLs, metadata, Open Graph, Twitter Cards, and JSON-LD.
- Private utility pages such as admin, login, dashboard, my ads, and post ad are noindex.
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400"
    }
  });
}
