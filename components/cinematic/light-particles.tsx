"use client";

import { motion, useReducedMotion } from "framer-motion";

const SEEDS = Array.from({ length: 42 }, (_, i) => ({
  id: i,
  x: (i * 17.3) % 100,
  y: (i * 23.7) % 100,
  s: 0.4 + (i % 5) * 0.15,
  d: 14 + (i % 9) * 2
}));

export function LightParticles() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden>
      {SEEDS.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.55)_0%,transparent_70%)] blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.s}rem`,
            height: `${p.s}rem`,
            opacity: 0.35
          }}
          animate={{
            y: [0, -28, 0],
            x: [0, 10, -6, 0],
            opacity: [0.15, 0.45, 0.2]
          }}
          transition={{
            duration: p.d,
            repeat: Infinity,
            ease: "easeInOut",
            delay: (p.id % 7) * 0.4
          }}
        />
      ))}
      <div className="absolute -left-1/4 top-0 h-[120%] w-1/2 rotate-12 bg-gradient-to-r from-transparent via-[rgba(236,72,153,0.03)] to-transparent blur-2xl" />
    </div>
  );
}
