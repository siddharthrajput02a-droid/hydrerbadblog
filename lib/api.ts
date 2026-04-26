import { profiles } from "@/data/profiles";
import type { Profile } from "@/lib/types";
import { HYDERABAD_CITY, slugifyArea } from "@/lib/utils";

type GetProfilesParams = {
  city?: string;
  area?: string;
  limit?: number;
};

export async function getProfiles(params: GetProfilesParams = {}): Promise<Profile[]> {
  const { city, area, limit } = params;

  let rows = [...profiles];

  if (city && city.toLowerCase() !== HYDERABAD_CITY.toLowerCase()) {
    rows = [];
  }

  if (area) {
    rows = rows.filter((profile) => slugifyArea(profile.area) === area);
  }

  if (typeof limit === "number") {
    rows = rows.slice(0, Math.max(0, limit));
  }

  return rows;
}

export async function getCategories(): Promise<string[]> {
  return [...new Set(profiles.map((profile) => profile.category))];
}

export async function getCities(): Promise<string[]> {
  return [HYDERABAD_CITY];
}

export async function fetchProfilesClient(): Promise<Profile[]> {
  return profiles;
}
