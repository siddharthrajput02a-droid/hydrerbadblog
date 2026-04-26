"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function HomeCta() {
  return (
    <section
      data-cinematic="cta"
      className="section-spacing relative overflow-hidden border-t border-[#ffd6e8]/70 py-16"
    >
      <div className="container-shell relative z-[1]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.25rem] border border-[#ffd0e8] bg-white/85 p-10 shadow-[0_32px_100px_rgba(255,77,141,0.16)] backdrop-blur-md md:p-14"
        >
          <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,77,141,0.2),transparent_70%)] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,182,210,0.35),transparent_72%)] blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[#ffc4dc] bg-white/90 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#b0306a]">
                Arrive quietly
              </p>
              <h2 className="headline-display mt-7 text-[clamp(1.95rem,3.4vw,2.85rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-[#2a1520]">
                The night is arranged —{" "}
                <span className="text-gradient-rose">your move is the last detail</span>
              </h2>
              <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.85] text-[#5c4150]">
                Cross into the full Hyderabad lounge: filters, areas, and profiles in one flowing grid — still
                cinematic, never noisy.
              </p>
            </div>
            <div className="flex flex-col gap-3.5 sm:flex-row lg:flex-col lg:items-stretch">
              <Link
                href="/hyderabad"
                className="button-hyd-primary inline-flex min-h-[48px] items-center justify-center gap-2 text-center text-base"
              >
                View Hyderabad profiles
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="button-hyd-secondary inline-flex min-h-[48px] items-center justify-center text-center text-base"
              >
                Request access
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
