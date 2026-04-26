"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { hyderabadAreas } from "@/data/profiles";
import { AdDraft } from "@/lib/types";
import { currency } from "@/lib/utils";

const initialAds: AdDraft[] = [
  {
    id: "ad-1",
    title: "Brunch-date energy for Jubilee Hills mornings",
    area: "Jubilee Hills",
    category: "Dinner Date",
    price: 12000,
    description: "Warm, polished, and ideal for sunlit brunch plans and slow afternoon conversation.",
    status: "Approved"
  },
  {
    id: "ad-2",
    title: "City-drive companion in Gachibowli",
    area: "Gachibowli",
    category: "Travel Companion",
    price: 9800,
    description: "Graceful presence with a calm, thoughtful vibe for Hyderabad day trips.",
    status: "Pending"
  }
];

export function DashboardShell() {
  const [ads, setAds] = useState<AdDraft[]>(initialAds);
  const [form, setForm] = useState({
    title: "",
    area: "Banjara Hills",
    category: "Dinner Date",
    price: "",
    description: ""
  });

  function submitAd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAds((current) => [
      {
        id: `ad-${current.length + 1}`,
        title: form.title,
        area: form.area as AdDraft["area"],
        category: form.category,
        price: Number(form.price),
        description: form.description,
        status: "Pending"
      },
      ...current
    ]);
    setForm({
      title: "",
      area: "Banjara Hills",
      category: "Dinner Date",
      price: "",
      description: ""
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
      <section className="glass-panel rounded-[2rem] p-6 shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="pill">My listings</p>
            <h2 className="headline-display mt-4 text-2xl font-semibold text-[var(--foreground)]">Your Hyderabad profiles</h2>
          </div>
          <div className="rounded-full border border-rose-100/80 bg-white/70 px-4 py-2 text-sm text-[var(--muted)] shadow-sm">
            {ads.length} listings
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {ads.map((ad) => (
            <div key={ad.id} className="surface-outline rounded-2xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-medium text-[var(--foreground)]">{ad.title}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {ad.area} · {ad.category}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-base font-semibold text-[#c9a24d]">{currency(ad.price)}</div>
                  <div className="mt-1 text-sm text-[var(--muted)]">{ad.status}</div>
                </div>
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{ad.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-[2rem] p-6 shadow-[var(--shadow-soft)]">
        <p className="pill">Add new profile</p>
        <h2 className="headline-display mt-4 text-2xl font-semibold text-[var(--foreground)]">Create a daylight listing</h2>
        <form className="mt-6 space-y-4" onSubmit={submitAd}>
          <input
            className="input-surface"
            placeholder="Profile title"
            value={form.title}
            onChange={(e) => setForm((current) => ({ ...current, title: e.target.value }))}
            required
          />
          <div className="grid gap-4 md:grid-cols-2">
            <select
              className="input-surface"
              value={form.area}
              onChange={(e) => setForm((current) => ({ ...current, area: e.target.value }))}
            >
              {hyderabadAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
            <select
              className="input-surface"
              value={form.category}
              onChange={(e) => setForm((current) => ({ ...current, category: e.target.value }))}
            >
              <option value="Dinner Date">Dinner Date</option>
              <option value="Party Partner">Party Partner</option>
              <option value="Travel Companion">Travel Companion</option>
            </select>
          </div>
          <input
            className="input-surface"
            type="number"
            placeholder="Price in INR"
            value={form.price}
            onChange={(e) => setForm((current) => ({ ...current, price: e.target.value }))}
            required
          />
          <textarea
            className="input-surface min-h-36 resize-none"
            placeholder="Write a classy, romantic, non-explicit profile description"
            value={form.description}
            onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))}
            required
          />
          <button className="button-primary w-full" type="submit">
            Save profile
          </button>
        </form>
      </section>
    </div>
  );
}
