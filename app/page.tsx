import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { HomeAreasAndCategories } from "@/components/home/home-areas-categories";
import { HomeCta } from "@/components/home/home-cta";
import { HomeFeaturedGrid } from "@/components/home/home-featured-grid";
import { HomeHyderabadShell } from "@/components/home/home-hyderabad-shell";
import { HomeSearchBar } from "@/components/home/home-search-bar";
import { LocalSeoHyderabad } from "@/components/home/local-seo-hyderabad";
import { MobileLoungeFab } from "@/components/mobile-lounge-fab";
import { cityFaqs } from "@/data/hyderabad-seo";
import { getCategories, getCities, getProfiles } from "@/lib/api";
import {
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  localBusinessJsonLd,
  organizationJsonLd,
  webPageJsonLd,
  websiteJsonLd
} from "@/lib/seo";
import { HYDERABAD_CITY, siteConfig } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.titleHome,
  description: siteConfig.description,
  path: "/",
  keywords: [
    "Hyderabad escort",
    "Hyderabad dating",
    "verified profiles Hyderabad",
    "Banjara Hills",
    "Jubilee Hills",
    "Hitech City",
    "premium dating Hyderabad"
  ]
});

export default async function HomePage() {
  const [featuredProfiles, categories, cities] = await Promise.all([
    getProfiles({ city: HYDERABAD_CITY, limit: 8 }),
    getCategories(),
    getCities()
  ]);

  const schemas = [
    organizationJsonLd(),
    websiteJsonLd(),
    webPageJsonLd({
      name: siteConfig.titleHome,
      description: siteConfig.description,
      path: "/"
    }),
    localBusinessJsonLd(),
    faqJsonLd(cityFaqs),
    breadcrumbJsonLd([{ name: "Home", path: "/" }])
  ];

  return (
    <HomeHyderabadShell>
      <Hero />
      {/* <HomeSearchBar /> */}
      <HomeFeaturedGrid profiles={featuredProfiles} />
      <HomeAreasAndCategories categories={categories} cities={cities} />
      <HomeCta />
      <LocalSeoHyderabad />
      <MobileLoungeFab />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
    </HomeHyderabadShell>
  );
}
