"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  cinematicPosters,
  cinematicVideos,
  type CinematicSectionKey
} from "@/lib/cinematic-assets";

type Props = {
  active: CinematicSectionKey;
};

export function CinematicBackground({ active }: Props) {
  const reduceMotion = useReducedMotion();
  const [loaded, setLoaded] = useState<Partial<Record<CinematicSectionKey, boolean>>>({});
  const videoRefs = useRef<Partial<Record<CinematicSectionKey, HTMLVideoElement | null>>>({});

  const keys = useMemo(() => Object.keys(cinematicVideos) as CinematicSectionKey[], []);

  useEffect(() => {
    const v = videoRefs.current[active];
    if (!v || reduceMotion) return;
    v.play().catch(() => {
      /* autoplay may be blocked */
    });
  }, [active, reduceMotion]);

  useEffect(() => {
    keys.forEach((k) => {
      const el = videoRefs.current[k];
      if (!el || k === active) return;
      el.pause();
    });
  }, [active, keys]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {keys.map((key) => {
        const isOn = key === active;
        const poster = cinematicPosters[key];
        return (
          <motion.div
            key={key}
            className="absolute inset-0 overflow-hidden"
            initial={false}
            animate={{
              opacity: isOn ? 1 : 0,
              scale: isOn ? 1 : 1.04
            }}
            transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {!reduceMotion ? (
              <motion.div
                className="h-full w-full"
                animate={isOn ? { scale: [1, 1.06] } : { scale: 1.05 }}
                transition={
                  isOn
                    ? { duration: 22, ease: "linear", repeat: Infinity, repeatType: "reverse" }
                    : { duration: 0.3 }
                }
              >
                <video
                  ref={(el) => {
                    videoRefs.current[key] = el;
                  }}
                  className="h-full w-full object-cover"
                  src={cinematicVideos[key]}
                  poster={poster}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  onLoadedData={() => setLoaded((s) => ({ ...s, [key]: true }))}
                />
              </motion.div>
            ) : (
              <div className="relative h-full w-full">
                <Image
                  src={poster}
                  alt=""
                  fill
                  className="object-cover brightness-[0.55] contrast-[1.08] saturate-[1.05]"
                  sizes="100vw"
                  priority={key === "hero"}
                />
              </div>
            )}
          </motion.div>
        );
      })}

      {/* Layered depth: vignette + wine + gold bloom */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_20%,rgba(212,175,55,0.07),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_90%,rgba(120,20,40,0.35),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-[#0a090c]/72 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1a0a12]/85 via-transparent to-[#0f1628]/70" />
      <div className="absolute inset-0 opacity-[0.14] mix-blend-screen bg-[linear-gradient(105deg,rgba(212,175,55,0.25)_0%,transparent_40%,rgba(236,72,153,0.12)_100%)]" />

      {/* Readability floor */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.55)_45%,rgba(0,0,0,0.88)_100%)]" />

      {!loaded[active] && !reduceMotion ? (
        <div className="absolute inset-0">
          <Image
            src={cinematicPosters[active]}
            alt=""
            fill
            className="object-cover brightness-[0.5]"
            sizes="100vw"
            priority
          />
        </div>
      ) : null}
    </div>
  );
}
