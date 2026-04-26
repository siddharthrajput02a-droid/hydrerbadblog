"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function HomeSearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/hyderabad?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/hyderabad");
    }
  };

  return (
    <section className="relative z-10 px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-2xl items-center gap-3 rounded-full border border-[#ffd0e8] bg-white/85 px-5 py-3 shadow-[0_16px_48px_rgba(255,77,141,0.14)] backdrop-blur-md ring-1 ring-white/60"
      >
        <Search className="h-5 w-5 shrink-0 text-[#ff4d8d]" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by area, category, or name…"
          className="min-w-0 flex-1 bg-transparent text-sm text-[#2a1520] placeholder:text-[#9a6b82] focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-[linear-gradient(120deg,#ff4d8d,#ff7eb3)] px-5 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(255,77,141,0.3)] transition hover:shadow-[0_10px_28px_rgba(255,77,141,0.45)]"
        >
          Search
        </button>
      </form>
    </section>
  );
}
