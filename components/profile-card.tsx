import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  MapPin,
  Phone,
  Send,
  Star
} from "lucide-react";
import type { Profile } from "@/lib/types";
import { currency } from "@/lib/utils";

export type ProfileCardVariant = "midnight" | "rose";

const DEFAULT_PHONE = "+910000000000";
const DEFAULT_WHATSAPP = "910000000000";

function profileMessage(profile: Profile) {
  return encodeURIComponent(`Hi, I am interested in ${profile.name} from ${profile.area}.`);
}

function ProfileContactActions({ profile, tone }: { profile: Profile; tone: ProfileCardVariant }) {
  const message = profileMessage(profile);
  const base =
    "inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full px-2.5 text-[0.72rem] font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const dark =
    "bg-white text-[#170911] shadow-[0_10px_28px_rgba(255,255,255,0.16)] ring-1 ring-white/50 hover:bg-[#ffe7f1] focus-visible:outline-[rgba(255,255,255,0.8)]";
  const soft =
    "bg-[#2a1520] text-white shadow-[0_10px_28px_rgba(42,21,32,0.16)] ring-1 ring-[#ffbfd9] hover:bg-[#441f32] focus-visible:outline-[#ff4d8d]";

  return (
    <div className="mt-4 grid grid-cols-3 gap-2">
      <a href={`tel:${DEFAULT_PHONE}`} className={`${base} ${tone === "rose" ? soft : dark}`}>
        <Phone className="h-3.5 w-3.5 shrink-0" />
        Call
      </a>
      <Link href={`/profile/${profile.slug}`} className={`${base} ${tone === "rose" ? soft : dark}`}>
        <ArrowRight className="h-3.5 w-3.5 shrink-0" />
        View
      </Link>
      <a
        href={`https://wa.me/${DEFAULT_WHATSAPP}?text=${message}`}
        target="_blank"
        rel="noreferrer"
        className={`${base} ${
          tone === "rose"
            ? "bg-[#25d366] text-[#04120a] hover:brightness-110 focus-visible:outline-[#25d366]"
            : "bg-[#25d366] text-[#04120a] hover:brightness-110 focus-visible:outline-[#25d366]"
        }`}
      >
        <Send className="h-3.5 w-3.5 shrink-0" />
        WhatsApp
      </a>
    </div>
  );
}

function ProfileCardMidnight({ profile }: { profile: Profile }) {
  return (
    <article
      className="group relative overflow-hidden rounded-[1.35rem] border border-[rgba(212,175,55,0.22)] bg-[linear-gradient(165deg,rgba(22,18,26,0.92),rgba(8,6,10,0.78))] shadow-[0_28px_90px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.04] transition duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:border-[rgba(236,72,153,0.38)] hover:shadow-[0_40px_120px_rgba(92,26,46,0.42)]"
    >
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_circle_at_50%_20%,rgba(255,255,255,0.1),transparent_55%)] opacity-0 transition duration-500 group-hover:opacity-100" />

      <span className="pointer-events-none absolute -left-[40%] top-0 h-full w-[45%] rotate-12 bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-0 blur-md transition duration-700 group-hover:translate-x-[220%] group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.55)] to-transparent opacity-70" />

      <Link
        href={`/profile/${profile.slug}`}
        className="relative block h-72 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(212,175,55,0.55)] md:h-[19.5rem]"
      >
        <Image
          src={profile.image}
          alt={`${profile.name} in ${profile.area}, Hyderabad`}
          fill
          className="object-cover transition duration-[1.05s] ease-out group-hover:scale-[1.07]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 28vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050304]/95 via-[#120810]/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(212,175,55,0.08)] via-transparent to-[rgba(236,72,153,0.12)]" />

        <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 transition duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/[0.1] bg-black/50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/85 backdrop-blur-xl">
            <span className="inline-flex items-center gap-1.5">
              <CalendarClock className="h-4 w-4 text-[#f5e5ba]" />
              Tonight
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#f5e5ba]">
              <Send className="h-4 w-4" />
              WhatsApp ready
            </span>
          </div>
        </div>
      </Link>

      <div className="relative rounded-b-[1.35rem] border-t border-white/[0.06] bg-[linear-gradient(180deg,rgba(14,11,16,0.92),rgba(6,4,8,0.96))] px-5 pb-6 pt-5 backdrop-blur-xl md:px-6 md:pb-7 md:pt-6">
        <Link
          href={`/profile/${profile.slug}`}
          className="headline-display block text-xl font-semibold leading-tight tracking-tight text-[var(--foreground)] transition hover:text-[#e8d5a3] md:text-[1.4rem]"
        >
          {profile.name}
        </Link>
        <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-[var(--muted)]">
          <span className="font-medium text-[#c4b8c0]">Age {profile.age}</span>
          <span className="text-white/15" aria-hidden>
            &middot;
          </span>
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
            <span className="truncate">{profile.area}</span>
          </span>
        </p>

        <p className="mt-3 line-clamp-1 text-sm italic leading-relaxed text-[#c9b4c0]">{profile.tagline}</p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
          <span className="rounded-full bg-white/[0.04] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted)] ring-1 ring-white/[0.08]">
            {profile.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm text-[#e8d5a3]">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-semibold text-[var(--foreground)]">{profile.rating}</span>
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <span className="text-lg font-semibold tracking-tight text-[var(--accent-bright)] md:text-xl">{currency(profile.price)}</span>
        </div>

        <ProfileContactActions profile={profile} tone="midnight" />
      </div>
    </article>
  );
}

function ProfileCardRose({ profile }: { profile: Profile }) {
  return (
    <article className="group relative overflow-hidden rounded-[20px] border border-[#ffd0e8] bg-white/85 shadow-[0_20px_60px_rgba(255,77,141,0.14)] ring-1 ring-white/80 transition duration-400 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_28px_80px_rgba(255,77,141,0.28)]">
      <Link
        href={`/profile/${profile.slug}`}
        className="relative block h-72 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4d8d] md:h-[19.5rem]"
      >
        <Image
          src={profile.image}
          alt={`${profile.name} in ${profile.area}, Hyderabad`}
          fill
          className="object-cover transition duration-[1.05s] ease-out group-hover:scale-[1.08]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 28vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a1520]/88 via-[#ff4d8d]/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-[#ff4d8d]/15 opacity-90" />

        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/90 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#c9185a] shadow-md backdrop-blur-sm">
          <BadgeCheck className="h-3.5 w-3.5 text-[#ff4d8d]" aria-hidden />
          Verified
        </span>
      </Link>

      <div className="relative border-t border-[#ffe0f0] bg-gradient-to-b from-white/95 to-[#fff8fb] px-5 pb-6 pt-5 md:px-6 md:pb-7 md:pt-6">
        <Link
          href={`/profile/${profile.slug}`}
          className="headline-display block text-xl font-semibold leading-tight tracking-tight text-[#2a1520] transition hover:text-[#c9185a] md:text-[1.35rem]"
        >
          {profile.name}
        </Link>
        <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-[#6b5060]">
          <span className="font-semibold text-[#5c4150]">Age {profile.age}</span>
          <span className="text-[#e8bcd0]" aria-hidden>
            &middot;
          </span>
          <span className="inline-flex min-w-0 items-center gap-1.5 font-medium text-[#4a3540]">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#ff4d8d]" aria-hidden />
            <span className="truncate">{profile.area}, Hyderabad</span>
          </span>
        </p>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#705660]">{profile.tagline}</p>

        <div className="mt-5 flex min-h-[48px] items-center justify-between gap-3 border-t border-[#ffe4f0] pt-4">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#9a6b82]">{profile.category}</span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#b0306a]">
            <Star className="h-4 w-4 fill-[#ffb7d6] text-[#ff4d8d]" aria-hidden />
            {profile.rating}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <span className="text-lg font-semibold tracking-tight text-[#ff4d8d] md:text-xl">{currency(profile.price)}</span>
        </div>

        <ProfileContactActions profile={profile} tone="rose" />
      </div>
    </article>
  );
}

export function ProfileCard({ profile, variant = "midnight" }: { profile: Profile; variant?: ProfileCardVariant }) {
  if (variant === "rose") {
    return <ProfileCardRose profile={profile} />;
  }
  return <ProfileCardMidnight profile={profile} />;
}
