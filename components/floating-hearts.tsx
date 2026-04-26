"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";

const COUNT = 20;

function heartStyle(i: number): CSSProperties {
  const leftPct = ((i * 47 + i * i * 3) % 920) / 10 + 4;
  const duration = 14 + (i % 7) * 2.2;
  const delay = (i * 0.55) % 10;
  const sizePx = 16 + (i % 5) * 5;
  const drift = -35 + (i % 11) * 9;
  const driftEnd = drift + 25 + (i % 4) * 12;
  const rot = -14 + (i % 9) * 4;
  const opacity = 0.28 + (i % 4) * 0.06;

  return {
    left: `${leftPct}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    ["--heart-size" as string]: `${sizePx}px`,
    ["--heart-x0" as string]: `${drift}px`,
    ["--heart-x1" as string]: `${driftEnd}px`,
    ["--heart-rot" as string]: `${rot}deg`,
    ["--heart-op" as string]: String(opacity)
  };
}

export function FloatingHearts() {
  const indices = useMemo(() => Array.from({ length: COUNT }, (_, i) => i), []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
      aria-hidden
    >
      {indices.map((i) => (
        <span
          key={i}
          className="floating-heart"
          style={{
            ...heartStyle(i),
            color: i % 3 === 0 ? "rgba(224, 195, 252, 0.82)" : i % 3 === 1 ? "rgba(255, 77, 109, 0.55)" : "rgba(255, 150, 170, 0.5)"
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full opacity-95">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </span>
      ))}
    </div>
  );
}
