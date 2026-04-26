"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

export function MagneticWrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.35 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - (r.left + r.width / 2)) * 0.12;
    const py = (e.clientY - (r.top + r.height / 2)) * 0.12;
    x.set(px);
    y.set(py);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
