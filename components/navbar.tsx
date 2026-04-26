"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { SearchOverlay } from "@/components/search-overlay";

const navItems = [
  { href: "/", label: "Lounge" },
  { href: "/hyderabad", label: "Hyderabad" },
  { href: "/dashboard", label: "Members" },
  { href: "/admin/dashboard", label: "House" },
  { href: "/login", label: "Enter" }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-[box-shadow,background,border-color] duration-500 ${
          scrolled
            ? "border-[rgba(212,175,55,0.18)] bg-[rgba(6,5,8,0.78)] shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
            : "border-transparent bg-[rgba(6,5,8,0.35)] backdrop-blur-xl"
        }`}
      >
        <div className="container-shell flex items-center justify-between gap-4 py-3.5 md:py-4">
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl bg-[linear-gradient(145deg,rgba(212,175,55,0.5),rgba(92,26,46,0.85))] shadow-[0_12px_40px_rgba(201,162,77,0.2)] ring-1 ring-[rgba(212,175,55,0.35)]">
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_55%)]" />
            </div>
            <div className="min-w-0">
              <div className="text-[0.62rem] uppercase tracking-[0.32em] text-[var(--muted)]">Hyderabad</div>
              <div className="truncate font-semibold tracking-tight text-[var(--foreground)]">Nocturne</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-[var(--muted)] md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link transition-colors hover:text-[var(--foreground)]">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-[rgba(212,175,55,0.22)] bg-white/[0.03] text-[var(--foreground)] shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition hover:border-[rgba(212,175,55,0.45)] hover:bg-white/[0.06] md:inline-flex"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-[1.15rem] w-[1.15rem]" />
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[rgba(212,175,55,0.22)] bg-white/[0.03] text-[var(--foreground)] shadow-[0_8px_32px_rgba(0,0,0,0.35)] md:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-[rgba(212,175,55,0.15)] bg-[rgba(6,5,8,0.96)] px-4 py-4 backdrop-blur-2xl md:hidden">
            <button
              type="button"
              className="mb-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-[rgba(212,175,55,0.22)] bg-white/[0.04] py-3 text-[var(--foreground)]"
              onClick={() => {
                setSearchOpen(true);
                setOpen(false);
              }}
            >
              <Search className="h-4 w-4" />
              Search the lounge
            </button>
            <div className="flex flex-col gap-1 text-[var(--foreground)]">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-3 text-base transition hover:bg-white/[0.05]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
