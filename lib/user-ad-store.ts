import { promises as fs } from "fs";
import path from "path";
import type { UserAd } from "@/lib/types";

const STORE_PATH = path.join(process.cwd(), "data", "user-ads.json");
const ADS_KEY = "hyd-afterglow:user-ads";
const ADS_CACHE_TTL_MS = 10 * 1000;

let adsMemoryCache: { ads: UserAd[]; expiresAt: number } | null = null;

type KvResponse<T> = {
  result?: T;
  error?: string;
};

function kvConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ""),
    token
  };
}

export function getUserAdStoreMode() {
  return kvConfig() ? "vercel-kv" : "local-json";
}

async function kvCommand<T>(command: unknown[]): Promise<T> {
  const config = kvConfig();
  if (!config) {
    throw new Error("KV is not configured.");
  }

  const response = await fetch(`${config.url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify([command]),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`KV request failed with ${response.status}.`);
  }

  const [payload] = (await response.json()) as KvResponse<T>[];
  if (payload?.error) {
    throw new Error(payload.error);
  }

  return payload?.result as T;
}

function parseAds(raw: unknown): UserAd[] {
  if (!raw) {
    return [];
  }

  const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
  return Array.isArray(parsed) ? parsed : [];
}

function cloneAds(ads: UserAd[]) {
  return ads.map((ad) => ({ ...ad }));
}

function readAdsCache() {
  if (!adsMemoryCache || adsMemoryCache.expiresAt <= Date.now()) {
    return null;
  }

  return cloneAds(adsMemoryCache.ads);
}

function writeAdsCache(ads: UserAd[]) {
  adsMemoryCache = {
    ads: cloneAds(ads),
    expiresAt: Date.now() + ADS_CACHE_TTL_MS
  };
}

export async function readUserAds(): Promise<UserAd[]> {
  const cached = readAdsCache();
  if (cached) {
    return cached;
  }

  if (kvConfig()) {
    const ads = parseAds(await kvCommand<string | null>(["GET", ADS_KEY]));
    writeAdsCache(ads);
    return cloneAds(ads);
  }

  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    const ads = parseAds(raw);
    writeAdsCache(ads);
    return cloneAds(ads);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") {
      await writeUserAds([]);
      return [];
    }
    throw error;
  }
}

export async function writeUserAds(ads: UserAd[]) {
  const nextAds = cloneAds(ads);

  if (kvConfig()) {
    await kvCommand<string>(["SET", ADS_KEY, JSON.stringify(nextAds)]);
    writeAdsCache(nextAds);
    return;
  }

  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, `${JSON.stringify(nextAds, null, 2)}\n`, "utf8");
  writeAdsCache(nextAds);
}
