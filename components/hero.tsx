"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const stats = [
  { value: "2,400+", label: "Profiles" },
  { value: "24/7", label: "Call support" },
  { value: "8", label: "City areas" },
];

const trust = [
  { icon: ShieldCheck, label: "18+ verified" },
  { icon: BadgeCheck, label: "Private booking" },
  { icon: Users, label: "Real profiles" },
];

const bookingSteps = [
  { icon: Phone, label: "Call", value: "Quick connect" },
  { icon: MessageCircle, label: "Chat", value: "Confirm details" },
  { icon: CalendarCheck, label: "Book", value: "Private schedule" },
];

const HERO_IMAGE =
  "https://cdni.pornpics.com/460/7/247/41717599/41717599_053_5bbe.jpg";

const CALL_NUMBER = "+910000000000";

export function Hero() {
  return (
    <section
      data-cinematic="hero"
      className="relative z-[1] -mt-[76px] min-h-screen overflow-hidden bg-black pt-[76px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-contain bg-[center_top] bg-no-repeat opacity-90 saturate-[1.08]"
        style={{ backgroundImage: `url("${HERO_IMAGE}")` }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0.72)_26%,rgba(0,0,0,0.38)_52%,rgba(0,0,0,0.72)_78%,#000_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#000_0%,rgba(0,0,0,0.42)_20%,rgba(0,0,0,0.14)_48%,#000_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,transparent_0%,rgba(0,0,0,0.12)_34%,rgba(0,0,0,0.55)_78%)]" />

      <div className="container-shell relative z-10 grid min-h-[calc(100svh-76px)] place-items-center py-20 text-center sm:py-24 lg:py-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center">
      

          <motion.h1
            {...fade(0.08)}
            className="headline-display mt-7 max-w-[13ch] text-center text-[clamp(2.45rem,7vw,5.8rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-white"
          >
            Call escorts in <span className="text-gradient-rose">Hyderabad</span>
          </motion.h1>

          <motion.p
            {...fade(0.14)}
            className="mx-auto mt-6 max-w-2xl text-center text-[1.02rem] leading-[1.8] text-white/72 sm:text-[1.08rem]"
          >
            Browse verified companion profiles, choose your area, and book privately by call or chat.
            A clean Hyderabad directory for adults who want fast, discreet plans.
          </motion.p>

          <motion.div {...fade(0.18)} className="mt-7 flex flex-wrap justify-center gap-3">
            {trust.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-white/68 backdrop-blur-md"
              >
                <Icon className="h-3.5 w-3.5 text-[#ff4d8d]" />
                {label}
              </span>
            ))}
          </motion.div>

          <motion.div {...fade(0.24)} className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href={`tel:${CALL_NUMBER}`}
              className="button-hyd-primary inline-flex min-h-[52px] items-center gap-2 px-8 text-base"
            >
              <Phone className="h-4 w-4" />
              Call now
            </Link>
            <Link
              href="/hyderabad"
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-8 text-base font-semibold text-white backdrop-blur-md transition hover:border-white/35 hover:bg-white/10"
            >
              Book profiles
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/post-ad"
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-[rgba(255,77,141,0.45)] bg-[rgba(255,77,141,0.12)] px-8 text-base font-semibold text-[#ffd6e8] backdrop-blur-md transition hover:border-[rgba(255,77,141,0.62)] hover:bg-[rgba(255,77,141,0.18)]"
            >
              <Sparkles className="h-4 w-4" />
              Post ad
            </Link>
          </motion.div>

          <motion.div
            {...fade(0.3)}
            className="mx-auto mt-9 grid w-full max-w-2xl gap-2 rounded-[1.25rem] border border-white/10 bg-[#12080e]/75 p-2 text-left shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:grid-cols-3"
          >
            {bookingSteps.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex min-h-[72px] items-center gap-3 rounded-2xl bg-white/[0.045] px-4 py-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff4d8d]/15 text-[#ff8fbd]">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{label}</span>
                  <span className="block text-xs text-white/48">{value}</span>
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.42, duration: 0.5 }}
            className="mt-8 flex flex-wrap justify-center gap-7 border-t border-white/10 pt-7 text-center"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-semibold tracking-tight text-white">{s.value}</p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.16em] text-white/40">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0608] to-transparent" />
    </section>
  );
}
