"use client";

import { useEffect, useState } from "react";
import { CinematicBackground } from "@/components/cinematic/cinematic-background";
import { FilmGrain } from "@/components/cinematic/film-grain";
import { LightParticles } from "@/components/cinematic/light-particles";
import type { CinematicSectionKey } from "@/lib/cinematic-assets";

export function HomeCinematicShell({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<CinematicSectionKey>("hero");

  useEffect(() => {
    const update = () => {
      const nodes = document.querySelectorAll<HTMLElement>("[data-cinematic]");
      if (!nodes.length) return;

      const vh = window.innerHeight;
      const focus = vh * 0.42;

      let best: CinematicSectionKey | null = null;
      let bestScore = -1;

      nodes.forEach((el) => {
        const key = el.dataset.cinematic as CinematicSectionKey | undefined;
        if (!key) return;
        const r = el.getBoundingClientRect();
        const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
        if (visible <= 0) return;
        const mid = r.top + r.height / 2;
        const dist = Math.abs(mid - focus);
        const score = visible / (1 + dist / vh);
        if (score > bestScore) {
          bestScore = score;
          best = key;
        }
      });

      if (best) setActive(best);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--background)]">
      <CinematicBackground active={active} />
      <FilmGrain />
      <LightParticles />
      <div className="relative z-10 pb-28 md:pb-12">{children}</div>
    </div>
  );
}
