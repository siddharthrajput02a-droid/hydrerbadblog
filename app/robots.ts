import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/api", "/dashboard", "/my-ads", "/post-ad", "/login"]
    },
    sitemap: [`${siteConfig.url}/sitemap-index.xml`, `${siteConfig.url}/sitemap.xml`]
  };
}
