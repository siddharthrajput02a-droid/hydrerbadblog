import type { Metadata } from "next";
import Link from "next/link";
import { ProfileCard } from "@/components/profile-card";
import { getProfiles } from "@/lib/api";
import { hyderabadAreas } from "@/data/profiles";
import { HYDERABAD_CITY, siteConfig, slugifyArea } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Hyderabad Lounge",
  description:
    "Explore premium companion discovery across Banjara Hills, Jubilee Hills, Gachibowli, Hitech City, Madhapur, Kukatpally, Begumpet, and Secunderabad — cinematic profiles and elegant local pages.",
  alternates: {
    canonical: `${siteConfig.url}/hyderabad`
  },
  keywords: [
    "Hyderabad dating",
    "Hyderabad companions",
    "Hyderabad companion discovery",
    "dating in Banjara Hills",
    "Jubilee Hills"
  ]
};

export default async function HyderabadPage() {
  const topProfiles = await getProfiles({ city: HYDERABAD_CITY, limit: 8 });
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Hyderabad companion discovery",
    about: "Premium companion discovery across Hyderabad",
    url: `${siteConfig.url}/hyderabad`
  };

  return (
    <>
      <section className="section-spacing relative overflow-hidden bg-[var(--background)]">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[min(50%,380px)] w-[min(90%,720px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_70%)] blur-3xl" />
        <div className="container-shell relative">
          <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(212,175,55,0.2)] bg-[linear-gradient(155deg,rgba(18,14,22,0.92),rgba(6,4,8,0.96))] p-9 shadow-[0_32px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl md:p-12 lg:p-14">
            <div className="pointer-events-none absolute -right-20 top-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.12),transparent_70%)] blur-3xl" />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Hyderabad city hub</p>
            <h1 className="headline-display mt-6 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--foreground)] md:mt-7 md:text-5xl lg:text-6xl">
              The lattice — <span className="text-gradient">every chapter, one lounge</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
              Browse cinematic profiles and neighborhood pages across Hyderabad. This hub links the most searched districts
              with SEO-ready landing pages — ready for your API.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
              {hyderabadAreas.map((area) => (
                <Link
                  key={area}
                  href={`/hyderabad/${slugifyArea(area)}`}
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-[0_16px_48px_rgba(0,0,0,0.4)] ring-1 ring-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-[rgba(212,175,55,0.35)] hover:shadow-[0_28px_80px_rgba(92,26,46,0.35)]"
                >
                  <div className="headline-display text-lg font-semibold text-[var(--foreground)]">{area}</div>
                  <div className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Local profiles & mood</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.25)] to-transparent" aria-hidden />

      <section className="section-spacing relative overflow-hidden bg-[var(--background)]">
        <div className="container-shell space-y-12 md:space-y-14">
          <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-8">
            <div className="max-w-3xl space-y-4 md:space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Featured</p>
              <h2 className="headline-display text-[clamp(1.85rem,3.2vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--foreground)]">
                Presence in glass and gold — pick a card, slow down
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-[1.05rem]">
                A curated first look — open any card for the full profile. Depth, motion, and restraint stay consistent across
                the grid.
              </p>
            </div>
            <div className="shrink-0 rounded-full border border-[rgba(212,175,55,0.22)] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-[var(--muted)] backdrop-blur-sm">
              {topProfiles.length} featured
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -left-4 top-1/3 h-48 w-48 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.14),transparent_70%)] blur-2xl md:-left-8" />
            <div className="pointer-events-none absolute -right-8 bottom-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_70%)] blur-3xl" />
            <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:gap-10 xl:grid-cols-3 2xl:grid-cols-4">
              {topProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
