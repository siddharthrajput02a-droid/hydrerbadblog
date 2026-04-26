"use client";

import { ShieldCheck, Sparkles, Star } from "lucide-react";

export function HeroMedia() {
  return (
    <div className="relative w-full max-w-[540px]">
      <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-indigo-100/70 blur-3xl" />

      <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white/90 p-6 shadow-[0_24px_70px_rgba(37,99,235,0.16)]">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-900">Hyderabad Spotlight</p>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-100">
            Live
          </span>
        </div>

        <div className="grid gap-3">
          {[
            { icon: ShieldCheck, title: "Verified profile checks", note: "Trust-first curation" },
            { icon: Star, title: "Top rated picks", note: "Quality signals surfaced" },
            { icon: Sparkles, title: "Mobile-ready journey", note: "Fast discovery flow" }
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3"
            >
              <item.icon className="h-4 w-4 text-blue-600" aria-hidden />
              <div>
                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
