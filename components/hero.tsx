import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";

const stats = [
  { value: "2,400+", label: "Profiles" },
  { value: "24/7", label: "Call support" },
  { value: "16", label: "City areas" }
];

const trust = [
  { icon: ShieldCheck, label: "18+ verified" },
  { icon: BadgeCheck, label: "Private booking" },
  { icon: Users, label: "Real profiles" }
];

const bookingSteps = [
  { icon: Phone, label: "Call", value: "Quick connect" },
  { icon: MessageCircle, label: "Chat", value: "Confirm details" },
  { icon: CalendarCheck, label: "Book", value: "Private schedule" }
];

const HERO_VIDEO =
  "/images/Xvideos_teens_analyzed_-_red_dress_helena_dickens_for_anal_anal-porn_teen-porn_SD.mp4";
const HERO_POSTER = "/images/profile-1.svg";
const CALL_NUMBER = "+910000000000";

export function Hero() {
  return (
    <section data-cinematic="hero" className="viewport-screen relative isolate z-[1] overflow-hidden bg-black">
      <video
        aria-hidden
        autoPlay
        loop
        muted
        playsInline
        poster={HERO_POSTER}
        preload="metadata"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-85 saturate-[1.12]"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,255,255,0.08),transparent_24%)]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.5)_24%,rgba(0,0,0,0.22)_52%,rgba(0,0,0,0.52)_78%,rgba(0,0,0,0.82)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.14)_34%,rgba(0,0,0,0.1)_52%,#000_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,transparent_0%,rgba(0,0,0,0.08)_38%,rgba(0,0,0,0.46)_82%)]" />

      <div className="container-shell viewport-screen relative z-10 grid place-items-center pb-[calc(3rem+var(--safe-area-inset-bottom))] pt-[calc(6.5rem+var(--safe-area-inset-top))] text-center sm:pb-[calc(4rem+var(--safe-area-inset-bottom))] sm:pt-[calc(7rem+var(--safe-area-inset-top))] lg:pb-[calc(5rem+var(--safe-area-inset-bottom))] lg:pt-[calc(7.5rem+var(--safe-area-inset-top))]">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center">
          <h1 className="headline-display mt-7 max-w-[13ch] text-center text-[clamp(2.45rem,7vw,5.8rem)] font-semibold leading-[0.98] tracking-normal text-white">
            Call escorts in <span className="text-gradient-rose">Hyderabad</span>
          </h1>

          <p className="mx-auto mt-6 hidden max-w-2xl text-center text-[1.02rem] leading-[1.8] text-white/72 sm:block sm:text-[1.08rem]">
            Browse verified profiles by area and book privately by call or chat.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {trust.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.08] px-3.5 py-1.5 text-xs font-medium text-white/68"
              >
                <Icon className="h-3.5 w-3.5 text-[#ff4d8d]" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href={`tel:${CALL_NUMBER}`} className="button-hyd-primary inline-flex min-h-[52px] items-center gap-2 px-8 text-base">
              <Phone className="h-4 w-4" />
              Call now
            </Link>
            <Link
              href="/hyderabad"
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-8 text-base font-semibold text-white transition hover:border-white/35 hover:bg-white/10"
            >
              Book profiles
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/post-ad"
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-[rgba(255,77,141,0.45)] bg-[rgba(255,77,141,0.14)] px-8 text-base font-semibold text-[#ffd6e8] transition hover:border-[rgba(255,77,141,0.62)] hover:bg-[rgba(255,77,141,0.18)]"
            >
              <Sparkles className="h-4 w-4" />
              Post ad
            </Link>
          </div>

          <div className="mx-auto mt-9 grid w-full max-w-2xl gap-2 rounded-[1.25rem] border border-white/10 bg-[#12080e]/82 p-2 text-left shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:grid-cols-3">
            {bookingSteps.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex min-h-[72px] items-center gap-3 rounded-2xl bg-white/[0.045] px-4 py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff4d8d]/15 text-[#ff8fbd]">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{label}</span>
                  <span className="block text-xs text-white/48">{value}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-7 border-t border-white/10 pt-7 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-semibold tracking-tight text-white">{s.value}</p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.16em] text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0608] to-transparent" />
    </section>
  );
}
