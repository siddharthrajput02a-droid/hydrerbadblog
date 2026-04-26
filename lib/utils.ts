import { hyderabadAreas, profiles } from "@/data/profiles";
import { Area, Profile } from "@/lib/types";

export const HYDERABAD_CITY = "Hyderabad";

export const siteConfig = {
  name: "Hyderabad Afterglow",
  url: "https://example.com",
  titleHome: "Premium Hyderabad Escort & Dating | Verified Profiles",
  description:
    "A Hyderabad-only premium dating, nightlife, and companion discovery frontend with refined profiles, local area pages, and SEO-first browsing."
};

export function slugifyArea(area: string) {
  return area.toLowerCase().replace(/\s+/g, "-");
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

export function currency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

export function areaSeo(area: Area) {
  return {
    title: `${area} Dating & Nightlife | Hyderabad Afterglow`,
    description: `Explore Hyderabad dating, nightlife partners, and premium companion discovery in ${area}. Browse elegant profiles, classy bios, and local area pages.`,
    canonical: `${siteConfig.url}/hyderabad/${slugifyArea(area)}`
  };
}
