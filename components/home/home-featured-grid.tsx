import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ProfileCard } from "@/components/profile-card";
import type { Profile } from "@/lib/types";

export function HomeFeaturedGrid({ profiles }: { profiles: Profile[] }) {
  return (
    <section
      data-cinematic="featured"
      className="section-spacing relative overflow-hidden border-t border-white/10 bg-[#0a0608] py-8"
    >
      <div className="container-shell relative z-[1]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,77,141,0.45)] bg-[rgba(255,77,141,0.12)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#ffb7d6]">
              Featured profiles
            </p>
            <h2 className="headline-display mt-5 text-[clamp(1.9rem,3.8vw,3rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-white">
              Hyderabad&apos;s finest — <span className="text-gradient-rose">verified &amp; available</span>
            </h2>
          </div>
          <Link
            href="/hyderabad"
            className="button-hyd-secondary inline-flex min-h-[44px] shrink-0 items-center gap-2 text-sm"
          >
            Full directory
            <ArrowUpRight className="h-4 w-4 opacity-80" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} variant="rose" />
          ))}
        </div>
      </div>
    </section>
  );
}
