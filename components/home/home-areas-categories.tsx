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
      className="section-spacing relative overflow-hidden border-t border-white/[0.06] py-10"
    >
      {/* ambient glows matching hero */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,77,141,0.12),transparent_65%)] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(201,162,77,0.08),transparent_65%)] blur-3xl" />

      <div className="container-shell relative z-[1]">
        <div className="grid gap-12 lg:grid-cols-2">

          {/* Areas */}
          <motion.div {...fadeUp}>
            <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,77,141,0.45)] bg-[rgba(255,77,141,0.12)] px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#ffb7d6] backdrop-blur-md">
              <MapPin className="h-3 w-3 text-[#ff4d8d]" />
              Browse by area
            </p>
            <h2 className="headline-display mt-5 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.08] text-white">
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
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/70 backdrop-blur-md transition hover:border-[rgba(255,77,141,0.5)] hover:bg-[rgba(255,77,141,0.12)] hover:text-white"
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
            <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,77,141,0.45)] bg-[rgba(255,77,141,0.12)] px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#ffb7d6] backdrop-blur-md">
              <Tag className="h-3 w-3 text-[#ff4d8d]" />
              Browse by category
            </p>
            <h2 className="headline-display mt-5 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.08] text-white">
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
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-white/70 backdrop-blur-md transition hover:border-[rgba(255,77,141,0.5)] hover:bg-[rgba(255,77,141,0.12)] hover:text-white"
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
