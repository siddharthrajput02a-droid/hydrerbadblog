"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  Clock,
  Filter,
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Trash2
} from "lucide-react";
import { hyderabadAreas } from "@/data/profiles";
import { getAdOwnerId } from "@/lib/ad-owner";
import type { UserAd } from "@/lib/types";
import { UserAdCard } from "@/components/user-ad-card";

type StatusFilter = "All" | UserAd["status"];

const statusFilters: StatusFilter[] = ["All", "Pending", "Approved", "Rejected"];
const categories: UserAd["category"][] = ["Dinner Date", "Party Partner", "Travel Companion"];

function formFromAd(ad: UserAd) {
  return {
    title: ad.title,
    name: ad.name,
    age: String(ad.age),
    area: ad.area,
    category: ad.category,
    price: String(ad.price),
    phone: ad.phone,
    whatsapp: ad.whatsapp,
    image: ad.image,
    description: ad.description
  };
}

export function MyAdsClient() {
  const [ownerId, setOwnerId] = useState("");
  const [ads, setAds] = useState<UserAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState("");
  const [storage, setStorage] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [editingId, setEditingId] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    name: "",
    age: "",
    area: hyderabadAreas[0],
    category: categories[0],
    price: "",
    phone: "",
    whatsapp: "",
    image: "",
    description: ""
  });

  const loadAds = useCallback(async () => {
    const owner = getAdOwnerId();
    setOwnerId(owner);
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/ads?ownerId=${encodeURIComponent(owner)}`, { cache: "no-store" });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Could not load ads.");
      }
      setAds(Array.isArray(payload.ads) ? payload.ads : []);
      setStorage(String(payload.storage || ""));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load ads.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAds();
  }, [loadAds]);

  const stats = useMemo(
    () => ({
      total: ads.length,
      pending: ads.filter((ad) => ad.status === "Pending").length,
      approved: ads.filter((ad) => ad.status === "Approved").length
    }),
    [ads]
  );

  const visibleAds = useMemo(() => {
    if (statusFilter === "All") {
      return ads;
    }

    return ads.filter((ad) => ad.status === statusFilter);
  }, [ads, statusFilter]);

  async function deleteAd(id: string) {
    setDeleting(id);
    setError("");

    try {
      const response = await fetch(`/api/ads/${id}?ownerId=${encodeURIComponent(ownerId)}`, {
        method: "DELETE"
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Could not delete ad.");
      }
      setAds((current) => current.filter((ad) => ad.id !== id));
      setStorage(String(payload.storage || storage));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete ad.");
    } finally {
      setDeleting("");
    }
  }

  function startEdit(ad: UserAd) {
    setEditingId(ad.id);
    setEditForm(formFromAd(ad));
    setError("");
  }

  async function saveEdit() {
    if (!editingId) return;

    setSavingEdit(true);
    setError("");

    try {
      const response = await fetch(`/api/ads/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editForm,
          ownerId
        })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Could not update ad.");
      }

      const updated = payload.ad as UserAd;
      setAds((current) => current.map((ad) => (ad.id === updated.id ? updated : ad)));
      setStorage(String(payload.storage || storage));
      setEditingId("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update ad.");
    } finally {
      setSavingEdit(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Total ads", value: stats.total, icon: BadgeCheck },
          { label: "Pending", value: stats.pending, icon: Clock },
          { label: "Approved", value: stats.approved, icon: BadgeCheck }
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="glass-panel rounded-[1.25rem] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{label}</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--foreground)]">{value}</p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(236,72,153,0.12)] text-[#ff8fbd]">
                <Icon className="h-5 w-5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="pill">My Ads</p>
          <h2 className="headline-display mt-4 text-3xl font-semibold text-[var(--foreground)]">Posted profile cards</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            These ads are linked to this browser. On Vercel, saved ads persist through Vercel KV with no separate backend deploy.
          </p>
          {storage ? (
            <p className="mt-3 inline-flex rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              Storage: {storage === "vercel-kv" ? "Vercel KV" : "local dev"}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="button-hyd-secondary inline-flex min-h-[44px] items-center gap-2 text-sm"
            onClick={() => void loadAds()}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <Link href="/post-ad" className="button-hyd-primary inline-flex min-h-[44px] items-center gap-2 text-sm">
            <Plus className="h-4 w-4" />
            Post ad
          </Link>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-300/25 bg-red-500/10 p-4 text-sm text-red-100">{error}</div>
      ) : null}

      <div className="glass-panel flex flex-col gap-3 rounded-[1.25rem] p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
          <Filter className="h-4 w-4 text-[#ff8fbd]" />
          Status filter
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {statusFilters.map((status) => (
            <button
              key={status}
              type="button"
              className={`min-h-[40px] rounded-full px-4 text-sm font-semibold transition ${
                statusFilter === status
                  ? "bg-[#ff4d8d] text-white shadow-[0_10px_28px_rgba(255,77,141,0.28)]"
                  : "bg-white/[0.05] text-[var(--muted)] ring-1 ring-white/[0.08] hover:bg-white/[0.08] hover:text-[var(--foreground)]"
              }`}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {editingId ? (
        <div className="glass-panel rounded-[1.5rem] p-5 md:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Edit ad</p>
              <h3 className="headline-display mt-2 text-2xl font-semibold text-[var(--foreground)]">
                Update profile card
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">Saving changes sends the ad back to Pending review.</p>
            </div>
            <button
              type="button"
              className="button-hyd-secondary inline-flex min-h-[42px] items-center justify-center text-sm"
              onClick={() => setEditingId("")}
            >
              Cancel
            </button>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <input
              className="input-surface"
              placeholder="Ad title"
              value={editForm.title}
              onChange={(e) => setEditForm((current) => ({ ...current, title: e.target.value }))}
            />
            <input
              className="input-surface"
              placeholder="Display name"
              value={editForm.name}
              onChange={(e) => setEditForm((current) => ({ ...current, name: e.target.value }))}
            />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-4">
            <input
              className="input-surface"
              type="number"
              min={18}
              max={65}
              placeholder="Age"
              value={editForm.age}
              onChange={(e) => setEditForm((current) => ({ ...current, age: e.target.value }))}
            />
            <select
              className="input-surface"
              value={editForm.area}
              onChange={(e) => setEditForm((current) => ({ ...current, area: e.target.value as UserAd["area"] }))}
            >
              {hyderabadAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
            <select
              className="input-surface"
              value={editForm.category}
              onChange={(e) => setEditForm((current) => ({ ...current, category: e.target.value as UserAd["category"] }))}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              className="input-surface"
              type="number"
              min={1}
              placeholder="Price"
              value={editForm.price}
              onChange={(e) => setEditForm((current) => ({ ...current, price: e.target.value }))}
            />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <input
              className="input-surface"
              placeholder="Call number"
              value={editForm.phone}
              onChange={(e) => setEditForm((current) => ({ ...current, phone: e.target.value }))}
            />
            <input
              className="input-surface"
              placeholder="WhatsApp number"
              value={editForm.whatsapp}
              onChange={(e) => setEditForm((current) => ({ ...current, whatsapp: e.target.value }))}
            />
            <input
              className="input-surface"
              placeholder="Photo URL"
              value={editForm.image}
              onChange={(e) => setEditForm((current) => ({ ...current, image: e.target.value }))}
            />
          </div>

          <textarea
            className="input-surface mt-4 min-h-28 resize-none"
            placeholder="Description"
            value={editForm.description}
            onChange={(e) => setEditForm((current) => ({ ...current, description: e.target.value }))}
          />

          <button
            type="button"
            className="button-hyd-primary mt-4 inline-flex min-h-[48px] w-full items-center justify-center gap-2 text-sm disabled:opacity-60"
            onClick={() => void saveEdit()}
            disabled={savingEdit}
          >
            {savingEdit ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save changes
          </button>
        </div>
      ) : null}

      {loading ? (
        <div className="glass-panel flex min-h-56 items-center justify-center rounded-[1.5rem] text-[var(--muted)]">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Loading ads
        </div>
      ) : null}

      {!loading && ads.length === 0 ? (
        <div className="glass-panel rounded-[1.5rem] p-8 text-center">
          <h3 className="headline-display text-2xl font-semibold text-[var(--foreground)]">No ads posted yet</h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">
            Post your first profile card and it will appear here with contact actions and status.
          </p>
          <Link href="/post-ad" className="button-hyd-primary mt-6 inline-flex min-h-[48px] items-center gap-2 px-8">
            <Plus className="h-4 w-4" />
            Post first ad
          </Link>
        </div>
      ) : null}

      {!loading && ads.length > 0 && visibleAds.length === 0 ? (
        <div className="glass-panel rounded-[1.5rem] p-8 text-center">
          <h3 className="headline-display text-2xl font-semibold text-[var(--foreground)]">No {statusFilter} ads</h3>
          <p className="mt-3 text-sm text-[var(--muted)]">Switch the status filter to see the rest of your ads.</p>
        </div>
      ) : null}

      {!loading && visibleAds.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleAds.map((ad) => (
            <UserAdCard
              key={ad.id}
              ad={ad}
              actions={
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.05] text-sm font-semibold text-white transition hover:bg-white/[0.08]"
                    onClick={() => startEdit(ad)}
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    type="button"
                    className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full border border-red-300/20 bg-red-500/10 text-sm font-semibold text-red-100 transition hover:bg-red-500/15 disabled:opacity-60"
                    onClick={() => void deleteAd(ad.id)}
                    disabled={deleting === ad.id}
                  >
                    {deleting === ad.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    Delete
                  </button>
                </div>
              }
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
