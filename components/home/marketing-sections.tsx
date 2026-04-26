"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Crown,
  Lock,
  MapPin,
  Quote,
  Sparkles,
  Unlock
} from "lucide-react";
import { useState } from "react";
import { FeaturedProfileRail } from "@/components/home/featured-profile-rail";
import { ProfileCard } from "@/components/profile-card";
import { hyderabadAreas } from "@/data/profiles";
import type { Profile } from "@/lib/types";
import { slugifyArea } from "@/lib/utils";

const areaVisuals: Record<string, { image: string; tone: string }> = {
  "Banjara Hills": {
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1400&q=80",
    tone: "from-[#2a1018]/90 via-[#120810]/70 to-[#050304]/95"
  },
  "Jubilee Hills": {
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
    tone: "from-[#101828]/88 via-[#0a0c12]/75 to-[#050304]/95"
  },
  Gachibowli: {
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80",
    tone: "from-[#0f172a]/90 via-[#0c1018]/72 to-[#050304]/95"
  }
};

const cinematicKeys = {
  featured: "featured" as const,
  elite: "elite" as const,
  banjara: "cityBanjara" as const,
  jubilee: "cityJubilee" as const,
  gachibowli: "cityGachibowli" as const,
  vip: "vip" as const,
  cta: "cta" as const
};

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }
};

function testimonialInitial(who: string) {
  const name = who.split("·")[0]?.trim() ?? "?";
  return name.charAt(0).toUpperCase();
}

export function MarketingSections({ featured }: { featured: Profile[] }) {
  const elite = featured.slice(0, 3);
  const [vipOpen, setVipOpen] = useState(false);

  return (
    <>
      <section
        data-cinematic={cinematicKeys.featured}
        className="section-spacing relative overflow-hidden border-t border-[#ffd6e8]/80 pb-8 pt-4"
      >
        <div className="container-shell relative z-[1]">
          <motion.div {...fadeUp}>
            <div className="section-eyebrow-line max-w-2xl [&::after]:bg-gradient-to-r [&::after]:from-[#ff4d8d]/35 [&::after]:to-transparent">
              <p className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#ffc4dc] bg-white/80 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#b0306a] shadow-[0_8px_28px_rgba(255,77,141,0.12)]">
                Tonight&apos;s thread
              </p>
            </div>
            <div className="mt-8 flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="headline-display max-w-[min(100%,28rem)] text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#2a1520] lg:max-w-3xl">
                Featured Hyderabad profiles — <span className="text-gradient-rose">soft glow, real neighborhoods</span>
              </h2>
              <Link
                href="/hyderabad"
                className="button-hyd-secondary inline-flex min-h-[44px] items-center gap-2 text-sm"
              >
                Full directory
                <ArrowUpRight className="h-4 w-4 opacity-80" />
              </Link>
            </div>
          </motion.div>

          <FeaturedProfileRail profiles={featured} tone="rose" />
        </div>
      </section>

      <section
        data-cinematic={cinematicKeys.elite}
        className="section-spacing relative overflow-hidden border-t border-[#ffd6e8]/80 py-6"
      >
        <div className="pointer-events-none absolute left-[8%] top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,77,141,0.16),transparent_68%)] blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,182,210,0.35),transparent_70%)] blur-3xl" />

        <div className="container-shell relative z-[1]">
          <motion.div {...fadeUp} className="max-w-3xl">
            <div className="section-eyebrow-line [&::after]:bg-gradient-to-r [&::after]:from-[#ff4d8d]/35 [&::after]:to-transparent">
              <p className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#ffc4dc] bg-white/80 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#b0306a]">
                <Crown className="h-3.5 w-3.5 text-[#ff4d8d]" />
                Elite Hyderabad
              </p>
            </div>
            <h2 className="headline-display mt-8 text-[clamp(2rem,4.2vw,3.4rem)] font-semibold leading-[1.05] text-[#2a1520]">
              Editorial portraits — <span className="text-gradient-rose">large format, quiet power</span>
            </h2>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-[1.85] text-[#5c4150]">
              Asymmetry on purpose. Depth in the negative space. Each card behaves like an object on a velvet table — weight,
              reflection, restraint.
            </p>
          </motion.div>

          <div className="relative mt-16">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-6">
              {elite[0] ? (
                <motion.div
                  {...fadeUp}
                  className="relative z-[2] lg:col-span-7 lg:row-span-2"
                >
                  <div className="relative -rotate-1 lg:pl-4">
                    <span className="pointer-events-none absolute -left-6 top-10 hidden h-32 w-32 rounded-full bg-[rgba(212,175,55,0.12)] blur-2xl lg:block" />
                    <ProfileCard profile={elite[0]} variant="rose" />
                  </div>
                </motion.div>
              ) : null}

              <div className="flex flex-col gap-8 lg:col-span-5">
                {elite.slice(1).map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: 0.08 * (i + 1), ease: [0.22, 1, 0.36, 1] }}
                    className={i === 0 ? "relative z-[1] rotate-[0.5deg] lg:translate-x-4" : "relative z-[0] -translate-y-4 lg:translate-x-0"}
                  >
                    <ProfileCard profile={p} variant="rose" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {(["Banjara Hills", "Jubilee Hills", "Gachibowli"] as const).map((area, idx) => (
        <section
          key={area}
          data-cinematic={
            area === "Banjara Hills"
              ? cinematicKeys.banjara
              : area === "Jubilee Hills"
                ? cinematicKeys.jubilee
                : cinematicKeys.gachibowli
          }
          className="section-spacing relative overflow-hidden border-t border-[#ffd6e8]/70 py-4"
        >
          <div className="pointer-events-none absolute inset-0">
            <Image
              src={areaVisuals[area].image}
              alt=""
              fill
              className="object-cover opacity-[0.22] mix-blend-luminosity"
              sizes="100vw"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${areaVisuals[area].tone}`} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(0,0,0,0.85),transparent)]" />
          </div>

          <div className="container-shell relative z-[1]">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
              <motion.div {...fadeUp} className="max-w-xl lg:w-[42%] lg:shrink-0">
                <p className="pill inline-flex">
                  <MapPin className="h-3.5 w-3.5 text-[var(--accent-bright)]" />
                  City chapter
                </p>
                <h3 className="headline-display mt-7 text-[clamp(1.85rem,3.5vw,2.75rem)] font-semibold leading-[1.08] text-[var(--foreground)]">
                  {area}
                </h3>
                <p className="section-copy mt-5">
                  Lights fall differently here — {area === "Banjara Hills"
                    ? "old money avenues, hushed courtyards, and slow champagne hours."
                    : area === "Jubilee Hills"
                      ? "skyline glass, rooftop breeze, and conversations that never rush."
                      : "corporate pulse by day, velvet hours after — precision meets warmth."}
                </p>
                <Link
                  href={`/hyderabad/${slugifyArea(area)}`}
                  className="button-hyd-secondary mt-8 inline-flex min-h-[44px] items-center gap-2 text-sm"
                >
                  Enter {area.split(" ")[0]}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="relative min-h-[280px] flex-1 lg:min-h-[360px]"
              >
                <div className="absolute -right-6 top-6 h-[118%] w-[min(92vw,520px)] overflow-hidden rounded-[2rem] border border-[rgba(212,175,55,0.22)] shadow-[0_40px_120px_rgba(0,0,0,0.55)] lg:-right-12 lg:top-0">
                  <Image
                    src={areaVisuals[area].image}
                    alt={`${area} atmosphere`}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 92vw, 520px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                    <p className="max-w-[14rem] text-sm leading-relaxed text-white/80">
                      Background shifts with each district — tone, grain, and pacing follow the neighborhood mood.
                    </p>
                    <span className="rounded-full bg-black/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#f5e5ba] ring-1 ring-[rgba(212,175,55,0.35)] backdrop-blur-md">
                      {idx + 1} / 3
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-14 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex w-max gap-4 md:gap-5">
                {hyderabadAreas.slice(0, 6).map((a) => (
                  <Link
                    key={a}
                    href={`/hyderabad/${slugifyArea(a)}`}
                    className="w-[200px] shrink-0 snap-start rounded-2xl border border-[#ffd6e8] bg-white/80 px-4 py-4 text-sm text-[#6b5060] shadow-[0_8px_28px_rgba(255,77,141,0.08)] ring-1 ring-white/60 backdrop-blur-md transition hover:border-[#ff4d8d]/40 hover:text-[#2a1520] md:w-[220px]"
                  >
                    <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#ff4d8d]">Route</span>
                    <span className="mt-2 block font-medium text-[#2a1520]">{a}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section data-cinematic={cinematicKeys.vip} className="section-spacing relative overflow-hidden border-t border-[#ffd6e8]/70 py-8">
        <div className="container-shell relative z-[1]">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#ffc4dc] bg-white/80 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#b0306a]">
              <Lock className="h-3.5 w-3.5 text-[#ff4d8d]" />
              Private tier
            </p>
            <h2 className="headline-display mt-8 text-[clamp(2rem,3.8vw,3rem)] font-semibold leading-[1.08] text-[#2a1520]">
              The back room — <span className="text-gradient-rose">members witness more</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[1.05rem] leading-[1.85] text-[#5c4150]">
              A velvet rope for the curious. Blurred by design until you choose to step through — no harsh reveals, only a
              slow unfurl.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65 }}
            className="relative mx-auto mt-14 max-w-4xl overflow-hidden rounded-[2rem] border border-[#ffd0e8] bg-white/80 p-10 shadow-[0_32px_100px_rgba(255,77,141,0.15)] backdrop-blur-md md:p-14"
          >
            <div
              className={`relative transition-all duration-700 ease-out ${vipOpen ? "blur-0" : "blur-xl"}`}
              aria-hidden={!vipOpen}
            >
              <div className="grid gap-6 md:grid-cols-3">
                {featured.slice(0, 3).map((p) => (
                  <div key={p.id} className="rounded-2xl border border-[#ffe4f0] bg-white/90 p-4 shadow-[0_16px_48px_rgba(255,77,141,0.1)] ring-1 ring-white/80">
                    <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded-xl">
                      <Image src={p.image} alt="" fill className="object-cover" sizes="200px" />
                    </div>
                    <p className="headline-display text-lg font-semibold text-[#2a1520]">{p.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#6b5060]">{p.area}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-center text-sm leading-relaxed text-[#5c4150]">
                Priority routing · same-day confirmations · concierge-thread messaging (demo overlay — wire your auth layer).
              </p>
            </div>

            {!vipOpen ? (
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.05),rgba(255,240,246,0.92))] p-6 text-center">
                <Sparkles className="h-8 w-8 text-[#ff4d8d]" />
                <p className="max-w-xs text-sm text-[#6b5060]">Members-only preview is blurred until unlocked.</p>
              </div>
            ) : null}

            <div className="relative mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setVipOpen((v) => !v)}
                className="button-hyd-primary inline-flex min-h-[48px] items-center gap-2 px-10"
              >
                {vipOpen ? (
                  <>
                    <Lock className="h-4 w-4" />
                    Seal room
                  </>
                ) : (
                  <>
                    <Unlock className="h-4 w-4" />
                    Unlock preview
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-spacing relative overflow-hidden border-t border-[#ffd6e8]/70 pt-4">
        <div className="container-shell relative z-[1]">
          <motion.div {...fadeUp}>
            <div className="section-eyebrow-line max-w-3xl [&::after]:bg-gradient-to-r [&::after]:from-[#ff4d8d]/35 [&::after]:to-transparent">
              <p className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#ffc4dc] bg-white/80 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#b0306a]">
                Whispers
              </p>
            </div>
            <h2 className="headline-display mt-6 max-w-3xl text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-[1.08] text-[#2a1520]">
              Voices from the velvet line
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                quote: "It feels less like browsing and more like being seated — lighting, motion, restraint.",
                who: "Aanya · Hitech City"
              },
              {
                quote: "The cards have weight. On mobile it still feels expensive — swipe, snap, no clutter.",
                who: "Rahul · Jubilee Hills"
              },
              {
                quote: "Hyderabad chapters with different moods? Finally. I linger on Banjara longer than I should.",
                who: "Meera · Banjara Hills"
              }
            ].map((t, i) => (
              <motion.div
                key={t.who}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative overflow-hidden rounded-3xl border border-[#ffe4f0] bg-white/85 p-7 shadow-[0_20px_60px_rgba(255,77,141,0.1)] ring-1 ring-white/80"
              >
                <Quote className="absolute right-5 top-5 h-9 w-9 text-[rgba(255,77,141,0.15)]" />
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#ff4d8d,#ffb7d6)] text-lg font-semibold text-white shadow-lg ring-2 ring-white/40">
                    {testimonialInitial(t.who)}
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-[0.9375rem] leading-[1.8] text-[#3d2530]">&ldquo;{t.quote}&rdquo;</p>
                    <p className="mt-5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#9a6b82]">{t.who}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section data-cinematic={cinematicKeys.cta} className="section-spacing relative overflow-hidden border-t border-[#ffd6e8]/70 pb-24 pt-6">
        <div className="container-shell relative z-[1]">
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-[2.25rem] border border-[#ffd0e8] bg-white/85 p-10 shadow-[0_32px_100px_rgba(255,77,141,0.16)] backdrop-blur-md md:p-14"
          >
            <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,77,141,0.2),transparent_70%)] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,182,210,0.35),transparent_72%)] blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-[#ffc4dc] bg-white/90 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#b0306a]">
                  Arrive quietly
                </p>
                <h2 className="headline-display mt-7 text-[clamp(1.95rem,3.4vw,2.85rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-[#2a1520] md:text-4xl">
                  The night is arranged — <span className="text-gradient-rose">your move is the last detail</span>
                </h2>
                <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.85] text-[#5c4150]">
                  Cross into the full Hyderabad lounge: filters, areas, and profiles in one flowing grid — still cinematic,
                  never noisy.
                </p>
              </div>
              <div className="flex flex-col gap-3.5 sm:flex-row lg:flex-col lg:items-stretch">
                <Link href="/hyderabad" className="button-hyd-primary inline-flex min-h-[48px] items-center justify-center text-center text-base">
                  View Hyderabad profiles
                </Link>
                <Link href="/login" className="button-hyd-secondary inline-flex min-h-[48px] items-center justify-center text-center text-base">
                  Request access
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
