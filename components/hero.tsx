"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, MapPin, ShieldCheck, Users } from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const stats = [
  { value: "2,400+", label: "Verified profiles" },
  { value: "8",      label: "Hyderabad areas"  },
  { value: "4.8★",   label: "Avg. rating"      },
];

const trust = [
  { icon: ShieldCheck, label: "100% Verified"    },
  { icon: BadgeCheck,  label: "Discreet Service" },
  { icon: Users,       label: "Real Profiles"    },
];

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#0a0608]">

      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(255,77,141,0.16),transparent_65%)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(201,162,77,0.1),transparent_65%)] blur-3xl" />

      <div className="container-shell relative z-10 grid min-h-[100svh] items-center py-28 lg:py-32">

        {/* ── LEFT: text content ── */}
        <div className="flex flex-col justify-center">

          {/* eyebrow pills */}
          <motion.div {...fade(0)} className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,77,141,0.45)] bg-[rgba(255,77,141,0.12)] px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#ffb7d6] backdrop-blur-md">
              <MapPin className="h-3 w-3 text-[#ff4d8d]" />
              Hyderabad · Premium Directory
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.7rem] font-semibold text-white/60 backdrop-blur-md">
              <BadgeCheck className="h-3 w-3 text-[#ff4d8d]" />
              Verified
            </span>
          </motion.div>

          {/* headline */}
          <motion.h1
            {...fade(0.08)}
            className="headline-display mt-7 text-[clamp(2.4rem,5.5vw,4.2rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white"
          >
            Escort services in{" "}
            <span className="relative inline-block">
              <span className="text-gradient-rose">Hyderabad</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-[#ff4d8d] to-transparent"
              />
            </span>
          </motion.h1>

          {/* primary subtext */}
          <motion.p {...fade(0.14)} className="mt-6 text-[1.05rem] leading-[1.85] text-white/60">
            Handpicked, verified call girls and escort profiles across Banjara Hills, Jubilee Hills,
            Hitech City and more — curated for discretion, elegance, and unforgettable evenings.
          </motion.p>

          {/* secondary paragraph */}
          <motion.p {...fade(0.18)} className="mt-4 text-[0.95rem] leading-[1.85] text-white/40">
            Whether you need an independent escort for a private dinner, a travel companion for a weekend
            trip, or a premium call girl service at your hotel in Hyderabad — our platform connects you
            with real, verified women who match your taste and budget. Browse by area, category, or price
            and book with complete confidence.
          </motion.p>

          {/* trust badges */}
          <motion.div {...fade(0.22)} className="mt-7 flex flex-wrap gap-3">
            {trust.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-xs font-medium text-white/55 backdrop-blur-md">
                <Icon className="h-3.5 w-3.5 text-[#ff4d8d]" />
                {label}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div {...fade(0.26)} className="mt-8 flex flex-wrap gap-3">
            <Link href="/hyderabad" className="button-hyd-primary inline-flex min-h-[52px] items-center gap-2 px-8 text-base">
              Explore profiles
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/login" className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-8 text-base font-semibold text-white backdrop-blur-md transition hover:border-white/35 hover:bg-white/10">
              Member login
            </Link>
          </motion.div>

          {/* stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38, duration: 0.5 }}
            className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-8"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-semibold tracking-tight text-white">{s.value}</p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.16em] text-white/40">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>



      </div>

      {/* bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />
    </section>
  );
}
