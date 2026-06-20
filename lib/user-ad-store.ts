import { promises as fs } from "fs";
import path from "path";
import type { UserAd } from "@/lib/types";

const STORE_PATH = path.join(process.cwd(), "data", "user-ads.json");
const ADS_KEY = "hyd-afterglow:user-ads";

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

export async function readUserAds(): Promise<UserAd[]> {
  if (kvConfig()) {
    return parseAds(await kvCommand<string | null>(["GET", ADS_KEY]));
  }

  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    return parseAds(raw);
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
  if (kvConfig()) {
    await kvCommand<string>(["SET", ADS_KEY, JSON.stringify(ads)]);
    return;
  }

  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, `${JSON.stringify(ads, null, 2)}\n`, "utf8");
}
