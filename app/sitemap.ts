import type { MetadataRoute } from "next";
import { hyderabadAreas, profiles } from "@/data/profiles";
import { siteConfig, slugifyArea } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${siteConfig.url}/hyderabad`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9
    },
    {
      url: `${siteConfig.url}/ads`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.7
    },
    {
      url: `${siteConfig.url}/llm-discovery`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4
    }
  ];

  const areaRoutes: MetadataRoute.Sitemap = hyderabadAreas.map((area) => ({
    url: `${siteConfig.url}/hyderabad/${slugifyArea(area)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8
  }));

  const profileRoutes: MetadataRoute.Sitemap = profiles.map((profile) => ({
    url: `${siteConfig.url}/profile/${profile.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75
  }));

  return [...staticRoutes, ...areaRoutes, ...profileRoutes];
}
