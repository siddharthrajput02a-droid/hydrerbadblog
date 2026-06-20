"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BadgeCheck, Ban, Loader2, RefreshCw } from "lucide-react";
import type { UserAd } from "@/lib/types";
import { UserAdCard } from "@/components/user-ad-card";

export function AdminAdsModeration() {
  const [ads, setAds] = useState<UserAd[]>([]);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState("");
  const [error, setError] = useState("");
  const [storage, setStorage] = useState("");

  const loadAds = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/ads", { cache: "no-store" });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Could not load posted ads.");
      }
      setAds(Array.isArray(payload.ads) ? payload.ads : []);
      setStorage(String(payload.storage || ""));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load posted ads.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAds();
  }, [loadAds]);

  const pending = useMemo(() => ads.filter((ad) => ad.status === "Pending"), [ads]);

  async function moderate(ad: UserAd, status: UserAd["status"]) {
    setWorkingId(ad.id);
    setError("");

    try {
      const response = await fetch(`/api/ads/${ad.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": pin
        },
        body: JSON.stringify({ status })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Could not update ad.");
      }

      const updated = payload.ad as UserAd;
      setAds((current) => current.map((item) => (item.id === updated.id ? updated : item)));
      setStorage(String(payload.storage || storage));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update ad.");
    } finally {
      setWorkingId("");
    }
  }

  return (
    <section className="luxury-glass overflow-hidden rounded-[2rem]">
      <div className="flex flex-col gap-4 border-b border-white/[0.08] px-5 py-5 md:px-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="headline-display text-2xl font-semibold text-[var(--foreground)]">Posted ads moderation</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Approve user-posted profile cards so they appear on the public ads page.
            </p>
            {storage ? (
              <p className="mt-3 inline-flex rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                Storage: {storage === "vercel-kv" ? "Vercel KV" : "local dev"}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            className="button-secondary inline-flex min-h-[42px] items-center justify-center gap-2 px-5 text-sm"
            onClick={() => void loadAds()}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr,auto] sm:items-center">
          <input
            className="input-surface"
            placeholder="Admin PIN (set ADMIN_PIN on Vercel)"
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-center text-sm font-semibold text-[var(--muted)]">
            {pending.length} pending
          </span>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-300/25 bg-red-500/10 p-4 text-sm text-red-100">{error}</div>
        ) : null}
      </div>

      {loading ? (
        <div className="flex min-h-44 items-center justify-center text-[var(--muted)]">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Loading posted ads
        </div>
      ) : null}

      {!loading && pending.length === 0 ? (
        <div className="px-5 py-10 text-center md:px-7">
          <h3 className="headline-display text-2xl font-semibold text-[var(--foreground)]">No pending ads</h3>
          <p className="mt-3 text-sm text-[var(--muted)]">New user-posted cards will appear here for review.</p>
        </div>
      ) : null}

      {!loading && pending.length > 0 ? (
        <div className="grid gap-5 p-5 md:grid-cols-2 md:p-7">
          {pending.map((ad) => (
            <UserAdCard
              key={ad.id}
              ad={ad}
              actions={
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full border border-red-300/20 bg-red-500/10 text-sm font-semibold text-red-100 transition hover:bg-red-500/15 disabled:opacity-60"
                    onClick={() => void moderate(ad, "Rejected")}
                    disabled={workingId === ad.id}
                  >
                    <Ban className="h-4 w-4" />
                    Reject
                  </button>
                  <button
                    type="button"
                    className="button-hyd-primary inline-flex min-h-[42px] items-center justify-center gap-2 text-sm disabled:opacity-60"
                    onClick={() => void moderate(ad, "Approved")}
                    disabled={workingId === ad.id}
                  >
                    {workingId === ad.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <BadgeCheck className="h-4 w-4" />}
                    Approve
                  </button>
                </div>
              }
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
