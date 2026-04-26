"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

/** Sticky mobile CTA — matches light homepage (hidden md+). */
export function MobileLoungeFab() {
  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[60] flex justify-center px-0 pt-2 md:hidden">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.45 }}
        className="pointer-events-auto w-full max-w-lg border-t border-gray-200 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_32px_rgba(15,23,42,0.08)] backdrop-blur-md"
      >
        <Link
          href="/hyderabad"
          className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-[0.95rem] font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Explore profiles
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
        </Link>
      </motion.div>
    </div>
  );
}
