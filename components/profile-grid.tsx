"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ProfileCard } from "@/components/profile-card";
import { FilterBar } from "@/components/filter-bar";
import { Profile } from "@/lib/types";

export function ProfileGrid({ items }: { items: Profile[] }) {
  const [selectedArea, setSelectedArea] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceBand, setPriceBand] = useState("All");

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesArea = selectedArea === "All" || item.area === selectedArea;
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesPrice =
        priceBand === "All" ||
        (priceBand === "Under10000" && item.price < 10000) ||
        (priceBand === "10000to15000" && item.price >= 10000 && item.price <= 15000) ||
        (priceBand === "Above15000" && item.price > 15000);

      return matchesArea && matchesCategory && matchesPrice;
    });
  }, [items, priceBand, selectedArea, selectedCategory]);

  return (
    <div className="relative space-y-10 md:space-y-12">
      <div className="pointer-events-none absolute left-1/2 top-[18%] -z-10 h-[min(480px,55vh)] w-[min(100%,640px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,220,232,0.45)_0%,rgba(224,195,252,0.12)_45%,transparent_70%)] blur-3xl" />

      <FilterBar
        selectedArea={selectedArea}
        selectedCategory={selectedCategory}
        priceBand={priceBand}
        onAreaChange={setSelectedArea}
        onCategoryChange={setSelectedCategory}
        onPriceBandChange={setPriceBand}
      />

      <div className="flex flex-col gap-6 border-b border-rose-100/50 pb-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-8">
        <div className="max-w-3xl space-y-3 md:space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b89aa8]">Directory</p>
          <h3 className="headline-display text-[clamp(1.75rem,3.2vw,2.65rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--foreground)]">
            Discover elegant companionship in Hyderabad
          </h3>
          <p className="max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-[1.05rem]">
            Filter by area, mood, or budget — each card opens your full daylight profile. Generous spacing keeps browsing
            calm and premium.
          </p>
        </div>
        <div className="shrink-0 rounded-full border border-white/60 bg-white/75 px-5 py-2.5 text-sm font-medium text-[var(--muted)] shadow-[0_8px_28px_rgba(255,200,210,0.12)] backdrop-blur-sm">
          {filtered.length} profiles shown
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/50 bg-white/70 px-8 py-14 text-center shadow-[0_10px_40px_rgba(255,105,135,0.12)] backdrop-blur-md">
          <h4 className="headline-display text-xl font-semibold text-[var(--foreground)]">No profiles match these filters</h4>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">Try widening the area or relaxing price and category.</p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:gap-10 xl:grid-cols-3 2xl:grid-cols-4">
        {filtered.map((profile, index) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
          >
            <ProfileCard profile={profile} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
