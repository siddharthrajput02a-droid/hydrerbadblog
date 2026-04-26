"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ProfileCard } from "@/components/profile-card";
import type { Profile } from "@/lib/types";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export function HomeFeaturedGrid({ profiles }: { profiles: Profile[] }) {
  return (
    <section
      data-cinematic="featured"
      className="section-spacing relative overflow-hidden border-t border-[#ffd6e8]/80 py-8"
    >
      <div className="container-shell relative z-[1]">
        <motion.div {...fadeUp} className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#ffc4dc] bg-white/80 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#b0306a]">
              Featured profiles
            </p>
            <h2 className="headline-display mt-5 text-[clamp(1.9rem,3.8vw,3rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-[#2a1520]">
              Hyderabad&apos;s finest — <span className="text-gradient-rose">verified &amp; available</span>
            </h2>
          </div>
          <Link
            href="/hyderabad"
            className="button-hyd-secondary inline-flex min-h-[44px] shrink-0 items-center gap-2 text-sm"
          >
            Full directory
            <ArrowUpRight className="h-4 w-4 opacity-80" />
          </Link>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {profiles.map((profile, i) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProfileCard profile={profile} variant="rose" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
