"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { HeroMedia } from "@/components/home/hero-media";

const fade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }
};

export function Hero() {
  return (
    <section className="relative border-b border-gray-100 bg-white pt-24 pb-14 md:pt-28 md:pb-20">
      <div className="container-shell px-3 md:px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="order-2 max-w-xl text-center lg:order-1 lg:text-left">
            <motion.span {...fade} className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" aria-hidden />
              Hyderabad · verified profiles
            </motion.span>

            <motion.h1
              {...fade}
              transition={{ ...fade.transition, delay: 0.05 }}
              className="mt-6 text-balance font-semibold tracking-tight text-gray-900 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] md:mt-8"
            >
              Find trusted companions in{" "}
              <span className="text-blue-600">Hyderabad</span>
            </motion.h1>

            <motion.p
              {...fade}
              transition={{ ...fade.transition, delay: 0.1 }}
              className="mx-auto mt-4 max-w-lg text-pretty text-base leading-relaxed text-gray-600 md:mx-0 md:text-lg"
            >
              Browse curated profiles by area, compare at a glance, and move forward with confidence — fast on mobile,
              clear on desktop.
            </motion.p>

            <motion.div
              {...fade}
              transition={{ ...fade.transition, delay: 0.15 }}
              className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <Link
                href="/hyderabad"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
              >
                Explore profiles
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
              <Link
                href="/login"
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-6 text-base font-semibold text-gray-800 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 sm:w-auto"
              >
                Member login
              </Link>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="mt-10 grid gap-6 border-t border-gray-100 pt-8 sm:grid-cols-3"
            >
              {[
                ["Local", "Area-first discovery"],
                ["Verified", "Quality signals"],
                ["Responsive", "Built for mobile"]
              ].map(([k, v]) => (
                <div key={k} className="text-center sm:text-left">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">{k}</dt>
                  <dd className="mt-1 text-sm font-medium text-gray-800">{v}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 flex justify-center lg:order-2 lg:justify-end"
          >
            <HeroMedia />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
