"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function HomeCta() {
  return (
    <section
      data-cinematic="cta"
      className="section-spacing relative overflow-hidden border-t border-white/[0.06] py-16"
    >
      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,77,141,0.12),transparent_65%)] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(201,162,77,0.08),transparent_65%)] blur-3xl" />

      <div className="container-shell relative z-[1]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.25rem] border border-white/[0.08] bg-white/[0.04] p-10 shadow-[0_32px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-14"
        >
          <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,77,141,0.14),transparent_70%)] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(201,162,77,0.1),transparent_72%)] blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,77,141,0.45)] bg-[rgba(255,77,141,0.12)] px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#ffb7d6] backdrop-blur-md">
                Arrive quietly
              </p>
              <h2 className="headline-display mt-7 text-[clamp(1.95rem,3.4vw,2.85rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-white">
                The night is arranged —{" "}
                <span className="text-gradient-rose">your move is the last detail</span>
              </h2>
              <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.85] text-white/55">
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
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-6 text-center text-base font-semibold text-white backdrop-blur-md transition hover:border-white/35 hover:bg-white/10"
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
