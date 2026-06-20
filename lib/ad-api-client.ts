import type { AdStatus, UserAd } from "@/lib/types";

export type AdsResponse = {
  ads: UserAd[];
  storage: string;
  total?: number;
  limit?: number;
  offset?: number;
  nextOffset?: number | null;
  cached?: boolean;
  offline?: boolean;
};

export type AdMutationResponse = {
  ad: UserAd;
  storage: string;
};

export type DeleteAdResponse = {
  ok: true;
  storage: string;
};

export type FetchAdsParams = {
  ownerId?: string;
  status?: AdStatus;
  limit?: number;
  offset?: number;
};

export const adQueryKeys = {
  all: ["ads"] as const,
  admin: () => [...adQueryKeys.all, "admin"] as const,
  owner: (ownerId: string) => [...adQueryKeys.all, "owner", ownerId] as const
};

async function parseJson(response: Response) {
  return response.json().catch(() => ({}));
}

async function requestJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      Accept: "application/json",
      ...init?.headers
    }
  });
  const payload = await parseJson(response);

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload && "error" in payload
        ? String((payload as { error?: unknown }).error || "")
        : "";
    throw new Error(message || `Request failed with ${response.status}.`);
  }

  return payload as T;
}

export function fetchAds(params: FetchAdsParams = {}) {
  const search = new URLSearchParams();

  if (params.ownerId) {
    search.set("ownerId", params.ownerId);
  }
  if (params.status) {
    search.set("status", params.status);
  }
  if (typeof params.limit === "number") {
    search.set("limit", String(params.limit));
  }
  if (typeof params.offset === "number") {
    search.set("offset", String(params.offset));
  }

  const path = search.size ? `/api/ads?${search.toString()}` : "/api/ads";
  return requestJson<AdsResponse>(path);
}

export function createAd(payload: Record<string, unknown>) {
  return requestJson<AdMutationResponse>("/api/ads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export function updateAd(
  id: string,
  payload: Record<string, unknown>,
  options: { adminPin?: string } = {}
) {
  return requestJson<AdMutationResponse>(`/api/ads/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(options.adminPin ? { "x-admin-pin": options.adminPin } : {})
    },
    body: JSON.stringify(payload)
  });
}

export function deleteAd(id: string, ownerId: string) {
  const search = new URLSearchParams({ ownerId });

  return requestJson<DeleteAdResponse>(`/api/ads/${encodeURIComponent(id)}?${search.toString()}`, {
    method: "DELETE"
  });
}
