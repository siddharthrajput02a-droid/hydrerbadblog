"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Profile } from "@/lib/types";
import { currency } from "@/lib/utils";

type RailTone = "midnight" | "rose";

export function FeaturedProfileRail({ profiles, tone = "rose" }: { profiles: Profile[]; tone?: RailTone }) {
  const loop = [...profiles, ...profiles];
  const fade =
    tone === "rose"
      ? "from-[#fff0f6] via-[#fff0f6]/92 to-transparent"
      : "from-[var(--background)] via-[var(--background)]/90 to-transparent";

  return (
    <div className="relative mt-14 -mx-4 md:-mx-0">
      <div className={`pointer-events-none absolute inset-y-0 left-0 z-[2] w-16 bg-gradient-to-r ${fade} md:w-24`} />
      <div className={`pointer-events-none absolute inset-y-0 right-0 z-[2] w-16 bg-gradient-to-l ${fade} md:w-24`} />

      <div className="overflow-x-auto snap-x snap-mandatory pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] md:overflow-hidden [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-5 pr-5 max-md:pl-4 md:gap-6 md-rail-infinite md:hover:[animation-play-state:paused]">
          {loop.map((profile, idx) => (
            <LuxuryCarouselCard key={`${profile.id}-${idx}`} profile={profile} tone={tone} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LuxuryCarouselCard({ profile, tone }: { profile: Profile; tone: RailTone }) {
  const cardClass =
    tone === "rose"
      ? "rounded-[20px] border border-[#ffd0e8] bg-white/90 shadow-[0_20px_60px_rgba(255,77,141,0.16)] ring-1 ring-white/80 hover:border-[#ffb7d6] hover:shadow-[0_32px_90px_rgba(255,77,141,0.28)]"
      : "rounded-[1.35rem] border border-[rgba(212,175,55,0.22)] bg-[linear-gradient(165deg,rgba(22,18,26,0.92),rgba(8,6,10,0.75))] shadow-[0_24px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.04] hover:border-[rgba(236,72,153,0.35)] hover:shadow-[0_36px_100px_rgba(92,26,46,0.45)]";

  return (
    <Link
      href={`/profile/${profile.id}`}
      className={`group relative flex w-[min(78vw,300px)] shrink-0 snap-center flex-col overflow-hidden transition duration-500 ease-out hover:-translate-y-1 hover:scale-[1.04] md:w-[280px] ${cardClass}`}
    >
      <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,20%),rgba(255,255,255,0.08),transparent_55%)]" />
      </span>
      <span className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 blur-sm transition duration-700 group-hover:animate-shimmer group-hover:opacity-100" />

      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={profile.image}
          alt={`${profile.name}`}
          fill
          className="object-cover transition duration-[1.1s] ease-out group-hover:scale-[1.07]"
          sizes="300px"
        />
        <div
          className={
            tone === "rose"
              ? "absolute inset-0 bg-gradient-to-t from-[#2a1520]/82 via-[#ff4d8d]/10 to-transparent"
              : "absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"
          }
        />
        <div
          className={
            tone === "rose"
              ? "absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-[#ff4d8d]/18 opacity-80"
              : "absolute inset-0 bg-gradient-to-br from-[rgba(212,175,55,0.12)] via-transparent to-[rgba(236,72,153,0.15)] opacity-60"
          }
        />

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="headline-display text-xl font-semibold tracking-tight text-white drop-shadow-sm">{profile.name}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-white/80">
                {profile.area} · {profile.city}
              </p>
            </div>
            <span
              className={
                tone === "rose"
                  ? "inline-flex items-center gap-1 rounded-full border border-white/60 bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#b0306a] shadow-md backdrop-blur-md"
                  : "inline-flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-xs font-semibold text-[#f5e5ba] ring-1 ring-[rgba(212,175,55,0.35)] backdrop-blur-md"
              }
            >
              <Star className={tone === "rose" ? "h-3.5 w-3.5 fill-[#ffb7d6] text-[#ff4d8d]" : "h-3.5 w-3.5 fill-[#c9a24d] text-[#c9a24d]"} />
              {profile.rating}
            </span>
          </div>
        </div>
      </div>

      <div
        className={
          tone === "rose"
            ? "relative border-t border-[#ffe4f0] bg-white/95 px-5 py-4 backdrop-blur-md"
            : "relative border-t border-white/[0.06] px-5 py-4 backdrop-blur-md"
        }
      >
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className={tone === "rose" ? "font-semibold tracking-wide text-[#ff4d8d]" : "font-semibold tracking-wide text-[var(--accent-bright)]"}>
            {currency(profile.price)}
          </span>
          <span className={tone === "rose" ? "text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#9a6b82]" : "text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]"}>
            Preview
          </span>
        </div>
        <div className="mt-3 grid max-h-0 grid-cols-2 gap-2 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:max-h-24 group-hover:opacity-100">
          <span className="rounded-xl bg-white/[0.04] px-3 py-2 text-center text-[0.7rem] font-medium text-[var(--muted)] ring-1 ring-white/[0.06]">
            Tonight
          </span>
          <span className="rounded-xl bg-white/[0.04] px-3 py-2 text-center text-[0.7rem] font-medium text-[var(--muted)] ring-1 ring-white/[0.06]">
            Message
          </span>
        </div>
      </div>
    </Link>
  );
}
