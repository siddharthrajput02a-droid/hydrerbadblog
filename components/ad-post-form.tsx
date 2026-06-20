"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BadgeCheck,
  Camera,
  CheckCircle2,
  Eye,
  IndianRupee,
  Loader2,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { hyderabadAreas } from "@/data/profiles";
import { adQueryKeys, createAd, type AdsResponse } from "@/lib/ad-api-client";
import { getAdOwnerId } from "@/lib/ad-owner";
import type { UserAd } from "@/lib/types";

const categories: UserAd["category"][] = ["Dinner Date", "Party Partner", "Travel Companion"];
const fallbackImage =
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1600&q=90";

function emptyForm() {
  return {
    title: "",
    name: "",
    age: "",
    area: hyderabadAreas[0],
    category: categories[0],
    price: "",
    phone: "",
    whatsapp: "",
    image: "",
    description: "",
    confirmedAdult: false
  };
}

export function AdPostForm() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(emptyForm);
  const [created, setCreated] = useState<UserAd | null>(null);
  const [storage, setStorage] = useState("");
  const [error, setError] = useState("");

  const completion = useMemo(() => {
    const fields = [
      form.title,
      form.name,
      form.age,
      form.area,
      form.category,
      form.price,
      form.phone,
      form.whatsapp,
      form.description,
      form.confirmedAdult
    ];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [form]);

  const createMutation = useMutation({
    mutationFn: (payload: ReturnType<typeof emptyForm>) =>
      createAd({
        ...payload,
        ownerId: getAdOwnerId()
      }),
    onMutate: () => {
      setError("");
      setCreated(null);
    },
    onSuccess: (payload) => {
      const ad = payload.ad;
      setCreated(ad);
      setStorage(String(payload.storage || ""));
      setForm(emptyForm());
      queryClient.setQueryData<AdsResponse>(adQueryKeys.owner(ad.ownerId), (current) => ({
        ads: [ad, ...(current?.ads ?? []).filter((item) => item.id !== ad.id)],
        storage: payload.storage || current?.storage || ""
      }));
      void queryClient.invalidateQueries({ queryKey: adQueryKeys.all });
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Ad could not be posted.");
    }
  });

  function submitAd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createMutation.mutate({ ...form });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr,1.35fr]">
      <aside className="glass-panel relative overflow-hidden rounded-[1.5rem] p-6 md:p-7">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.24),transparent_70%)] blur-3xl" />
        <p className="pill">Advertiser desk</p>
        <h2 className="headline-display mt-5 text-3xl font-semibold leading-tight text-[var(--foreground)]">
          Post a profile ad
        </h2>
        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
          Create a polished Hyderabad profile card with direct call, chat, and WhatsApp contact.
        </p>

        <div className="mt-6 rounded-2xl border border-white/[0.08] bg-black/20 p-4">
          <div className="flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              <Sparkles className="h-3.5 w-3.5 text-[#ff8fbd]" />
              Form strength
            </span>
            <span className="text-sm font-semibold text-[#e8d5a3]">{completion}%</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#ff4d8d,#c9a24d)] transition-all duration-500"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {[
            { icon: ShieldCheck, label: "18+ confirmation" },
            { icon: MapPin, label: "Hyderabad areas" },
            { icon: Phone, label: "Contact actions" },
            { icon: BadgeCheck, label: "Review status" }
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-[var(--foreground)]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgba(236,72,153,0.12)] text-[#ff8fbd]">
                <Icon className="h-4 w-4" />
              </span>
              {label}
            </div>
          ))}
        </div>

        {created ? (
          <div className="mt-6 rounded-2xl border border-emerald-300/25 bg-emerald-400/10 p-4 text-sm text-emerald-100">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="h-4 w-4" />
              Ad submitted
            </div>
            <Link href="/my-ads" className="mt-3 inline-flex font-semibold text-emerald-50 underline-offset-4 hover:underline">
              Open My Ads
            </Link>
            {storage ? (
              <p className="mt-2 text-xs text-emerald-100/70">
                Saved through {storage === "vercel-kv" ? "Vercel KV" : "local dev storage"}.
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-6 overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-[#090507]">
          <div className="relative h-56">
            <img
              src={form.image || fallbackImage}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
              <Eye className="h-3.5 w-3.5" />
              Live preview
            </span>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="headline-display text-2xl font-semibold text-white">{form.name || "Your name"}</h3>
              <p className="mt-1 text-sm text-white/70">
                Age {form.age || "18+"} | {form.area}
              </p>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-[var(--foreground)]">{form.title || "Profile ad title"}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                  {form.category}
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold text-[#e8d5a3]">
                {form.price ? `INR ${Number(form.price).toLocaleString("en-IN")}` : "INR"}
              </p>
            </div>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--muted)]">
              {form.description || "Your polished description will appear here as you type."}
            </p>
          </div>
        </div>
      </aside>

      <form className="glass-panel rounded-[1.5rem] p-5 shadow-[var(--shadow-soft)] md:p-7" onSubmit={submitAd}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Ad title</span>
            <input
              className="input-surface"
              placeholder="Premium evening profile"
              value={form.title}
              onChange={(e) => setForm((current) => ({ ...current, title: e.target.value }))}
              required
            />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Display name</span>
            <input
              className="input-surface"
              placeholder="Aarika"
              value={form.name}
              onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
              required
            />
          </label>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Age</span>
            <input
              className="input-surface"
              type="number"
              min={18}
              max={65}
              placeholder="24"
              value={form.age}
              onChange={(e) => setForm((current) => ({ ...current, age: e.target.value }))}
              required
            />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Area</span>
            <select
              className="input-surface"
              value={form.area}
              onChange={(e) => setForm((current) => ({ ...current, area: e.target.value as UserAd["area"] }))}
            >
              {hyderabadAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Category</span>
            <select
              className="input-surface"
              value={form.category}
              onChange={(e) => setForm((current) => ({ ...current, category: e.target.value as UserAd["category"] }))}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Price</span>
            <span className="relative block">
              <IndianRupee className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
              <input
                className="input-surface pl-10"
                type="number"
                min={1}
                placeholder="12000"
                value={form.price}
                onChange={(e) => setForm((current) => ({ ...current, price: e.target.value }))}
                required
              />
            </span>
          </label>
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Call number</span>
            <input
              className="input-surface"
              placeholder="+91..."
              value={form.phone}
              onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value }))}
              required
            />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">WhatsApp</span>
            <input
              className="input-surface"
              placeholder="91..."
              value={form.whatsapp}
              onChange={(e) => setForm((current) => ({ ...current, whatsapp: e.target.value }))}
              required
            />
          </label>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[1fr,12rem]">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Photo URL</span>
            <span className="relative block">
              <Camera className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
              <input
                className="input-surface pl-10"
                placeholder="https://images.unsplash.com/..."
                value={form.image}
                onChange={(e) => setForm((current) => ({ ...current, image: e.target.value }))}
              />
            </span>
          </label>
          <div className="hidden overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] md:block">
            {form.image ? (
              <img
                src={form.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full min-h-[4.9rem] w-full object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[4.9rem] items-center justify-center text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                Preview
              </div>
            )}
          </div>
        </div>

        <label className="mt-4 block space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Profile description</span>
          <textarea
            className="input-surface min-h-36 resize-none"
            placeholder="Write a polished profile description..."
            value={form.description}
            onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))}
            required
          />
        </label>

        <label className="mt-4 flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 text-sm leading-6 text-[var(--muted)]">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-white/20 bg-black"
            checked={form.confirmedAdult}
            onChange={(e) => setForm((current) => ({ ...current, confirmedAdult: e.target.checked }))}
            required
          />
          I confirm this listing is for adults 18+ and the contact details are mine to publish.
        </label>

        {error ? (
          <div className="mt-4 rounded-2xl border border-red-300/25 bg-red-500/10 p-4 text-sm text-red-100">{error}</div>
        ) : null}

        <button
          className="button-hyd-primary mt-5 inline-flex min-h-[52px] w-full items-center justify-center gap-2 text-base disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Post ad
        </button>
      </form>
    </div>
  );
}
