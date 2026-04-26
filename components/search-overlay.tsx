"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Loader2, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { fetchProfilesClient } from "@/lib/api";
import { profiles as localProfiles } from "@/data/profiles";
import type { Profile } from "@/lib/types";
import { currency } from "@/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function SearchOverlay({ open, onClose }: Props) {
  const [q, setQ] = useState("");
  const [remote, setRemote] = useState<Profile[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    fetchProfilesClient()
      .then((rows) => {
        if (!cancelled) setRemote(rows);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  const data = remote ?? localProfiles;

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return data.slice(0, 6);
    return data.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.area.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s) ||
        p.tagline.toLowerCase().includes(s)
    );
  }, [q, data]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-3 pt-[min(12vh,6rem)] sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            aria-label="Close search"
            onClick={onClose}
          />
          <motion.div
            className="relative z-[1] w-full max-w-2xl overflow-hidden rounded-[1.75rem] border border-[rgba(212,175,55,0.28)] bg-[linear-gradient(155deg,rgba(18,14,22,0.94),rgba(8,6,10,0.92))] shadow-[0_40px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <Search className="h-5 w-5 shrink-0 text-[var(--accent)]" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name, area, mood…"
                className="min-w-0 flex-1 bg-transparent text-lg text-[var(--foreground)] outline-none placeholder:text-[var(--muted-deep)]"
              />
              {loading ? <Loader2 className="h-5 w-5 shrink-0 animate-spin text-[var(--accent)]" aria-hidden /> : null}
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-[var(--muted)] transition hover:border-[rgba(212,175,55,0.35)] hover:text-[var(--foreground)]"
                onClick={onClose}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[min(60vh,520px)] overflow-y-auto px-3 py-3">
              <p className="px-2 pb-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                {q.trim() ? "Matches" : "Suggested"}
              </p>
              <ul className="flex flex-col gap-1.5">
                {results.map((p, i) => (
                  <motion.li
                    key={p.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={`/profile/${p.id}`}
                      onClick={onClose}
                      className="group flex items-center gap-3 rounded-2xl px-2 py-2.5 transition hover:bg-white/[0.04]"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-1 ring-[rgba(212,175,55,0.25)]">
                        <Image src={p.image} alt="" fill className="object-cover" sizes="56px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium tracking-tight text-[var(--foreground)]">
                          {p.name}
                          <span className="font-normal text-[var(--muted)]"> · {p.area}</span>
                        </div>
                        <div className="mt-0.5 truncate text-xs text-[var(--muted)]">{p.tagline}</div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="text-sm font-semibold text-[var(--accent-bright)]">{currency(p.price)}</div>
                        <div className="mt-0.5 inline-flex items-center gap-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--muted)] opacity-0 transition group-hover:opacity-100">
                          Open
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              {results.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-[var(--muted)]">No matches in this lounge yet.</p>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
