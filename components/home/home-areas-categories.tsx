"use client";

import { motion } from "framer-motion";
import { MapPin, Tag } from "lucide-react";
import Link from "next/link";
import { slugifyArea } from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

interface Props {
  categories: string[];
  cities: string[];
}

const HYDERABAD_AREAS = [
  "Banjara Hills",
  "Jubilee Hills",
  "Gachibowli",
  "Hitech City",
  "Madhapur",
  "Kukatpally",
  "Begumpet",
  "Secunderabad",
];

export function HomeAreasAndCategories({ categories }: Props) {
  return (
    <section
      data-cinematic="featured"
      className="section-spacing relative overflow-hidden border-t border-[#ffd6e8]/80 py-10"
    >
      <div className="container-shell relative z-[1]">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Areas */}
          <motion.div {...fadeUp}>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#ffc4dc] bg-white/80 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#b0306a]">
              <MapPin className="h-3.5 w-3.5 text-[#ff4d8d]" />
              Browse by area
            </p>
            <h2 className="headline-display mt-5 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.08] text-[#2a1520]">
              Hyderabad neighbourhoods
            </h2>
            <div className="mt-7 flex flex-wrap gap-3">
              {HYDERABAD_AREAS.map((area, i) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                >
                  <Link
                    href={`/hyderabad/${slugifyArea(area)}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#ffd0e8] bg-white/85 px-4 py-2 text-sm font-medium text-[#4a3540] shadow-[0_4px_16px_rgba(255,77,141,0.08)] ring-1 ring-white/60 transition hover:border-[#ff4d8d]/50 hover:text-[#2a1520] hover:shadow-[0_6px_20px_rgba(255,77,141,0.18)]"
                  >
                    <MapPin className="h-3.5 w-3.5 text-[#ff4d8d]" aria-hidden />
                    {area}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#ffc4dc] bg-white/80 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#b0306a]">
              <Tag className="h-3.5 w-3.5 text-[#ff4d8d]" />
              Browse by category
            </p>
            <h2 className="headline-display mt-5 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.08] text-[#2a1520]">
              What are you looking for?
            </h2>
            <div className="mt-7 flex flex-wrap gap-3">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                >
                  <Link
                    href={`/hyderabad?category=${encodeURIComponent(cat)}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#ffd0e8] bg-white/85 px-5 py-2.5 text-sm font-semibold text-[#4a3540] shadow-[0_4px_16px_rgba(255,77,141,0.08)] ring-1 ring-white/60 transition hover:border-[#ff4d8d]/50 hover:bg-[linear-gradient(120deg,#fff0f6,#fff8fb)] hover:text-[#2a1520] hover:shadow-[0_6px_20px_rgba(255,77,141,0.18)]"
                  >
                    <Tag className="h-3.5 w-3.5 text-[#ff4d8d]" aria-hidden />
                    {cat}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
