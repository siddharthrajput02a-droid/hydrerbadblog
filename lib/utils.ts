import { hyderabadAreas, profiles } from "@/data/profiles";
import { areaSeoCopy } from "@/data/hyderabad-seo";
import { Area, Profile } from "@/lib/types";

export const HYDERABAD_CITY = "Hyderabad";

function normalizeSiteUrl(value: string | undefined) {
  return (value || "https://hyderabad-afterglow.com").replace(/\/$/, "");
}

export const siteConfig = {
  name: "Hyderabad Afterglow",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  titleHome: "Hyderabad Escort & Companion Directory | Verified 18+ Profiles",
  description:
    "Explore a Hyderabad-only adult companion directory with verified 18+ profiles, local area pages, privacy-focused browsing, and SEO-ready city coverage."
};

export function slugifyArea(area: string) {
  return area
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getAreaLabel(areaSlug: string): Area | undefined {
  return hyderabadAreas.find((area) => slugifyArea(area) === areaSlug);
}

export function getProfilesByArea(area: Area) {
  return profiles.filter((profile) => profile.area === area);
}

export function getProfileBySlug(slug: string): Profile | undefined {
  return profiles.find((profile) => profile.slug === slug);
}

export function getProfileBySlugOrId(slugOrId: string): Profile | undefined {
  return profiles.find((profile) => profile.slug === slugOrId || profile.id === slugOrId);
}

export function currency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

export function areaSeo(area: Area) {
  const copy = areaSeoCopy[area];

  return {
    title: `${area} Escort & Companion Profiles in Hyderabad`,
    description: `${copy.intro} Browse verified 18+ companion profiles, local links, FAQs, and privacy-focused contact options for ${area}, Hyderabad.`,
    canonical: `${siteConfig.url}/hyderabad/${slugifyArea(area)}`,
    keywords: [
      `${area} escorts`,
      `${area} companion profiles`,
      `${area} Hyderabad dating`,
      `${area} call girl directory`,
      `verified profiles ${area}`
    ]
  };
}
