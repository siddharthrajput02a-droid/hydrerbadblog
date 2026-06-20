import type { Metadata } from "next";
import Link from "next/link";
import { ProfileCard } from "@/components/profile-card";
import { cityFaqs } from "@/data/hyderabad-seo";
import { hyderabadAreas } from "@/data/profiles";
import { getProfiles } from "@/lib/api";
import {
  breadcrumbJsonLd,
  buildMetadata,
  collectionPageJsonLd,
  faqJsonLd,
  localBusinessJsonLd,
  webPageJsonLd
} from "@/lib/seo";
import { HYDERABAD_CITY, slugifyArea } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Hyderabad Escort & Companion Areas Directory",
  description:
    "Browse all Hyderabad adult companion location pages, including Banjara Hills, Jubilee Hills, Hitech City, Gachibowli, Madhapur, Kondapur, Kukatpally, Begumpet, and more.",
  path: "/hyderabad",
  keywords: [
    "Hyderabad escort directory",
    "Hyderabad companion areas",
    "Banjara Hills companions",
    "Jubilee Hills escorts",
    "Hitech City companions",
    "Financial District companions"
  ]
});

export default async function HyderabadPage() {
  const topProfiles = await getProfiles({ city: HYDERABAD_CITY, limit: 8 });
  const pageDescription =
    "Premium adult companion discovery across Hyderabad neighborhoods with area pages, profile links, and local FAQs.";
  const schemas = [
    webPageJsonLd({
      name: "Hyderabad escort and companion areas",
      description: pageDescription,
      path: "/hyderabad"
    }),
    collectionPageJsonLd({
      name: "Hyderabad companion discovery",
      description: pageDescription,
      path: "/hyderabad",
      itemUrls: hyderabadAreas.map((area) => `/hyderabad/${slugifyArea(area)}`)
    }),
    localBusinessJsonLd(),
    faqJsonLd(cityFaqs),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Hyderabad", path: "/hyderabad" }
    ])
  ];

  return (
    <>
      <section className="section-spacing relative overflow-hidden bg-[var(--background)]">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[min(50%,380px)] w-[min(90%,720px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_70%)] blur-3xl" />
        <div className="container-shell relative">
          <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(212,175,55,0.2)] bg-[linear-gradient(155deg,rgba(18,14,22,0.92),rgba(6,4,8,0.96))] p-9 shadow-[0_32px_100px_rgba(0,0,0,0.55)] md:p-12 lg:p-14">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Hyderabad city hub</p>
            <h1 className="headline-display mt-6 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-normal text-[var(--foreground)] md:mt-7 md:text-5xl lg:text-6xl">
              Hyderabad escort and companion areas
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
              Browse premium adult companion location pages across Hyderabad. Each area page includes unique local copy,
              FAQs, profile links, nearby-area navigation, canonical metadata, and structured data for clean crawling.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
              {hyderabadAreas.map((area) => (
                <Link
                  key={area}
                  href={`/hyderabad/${slugifyArea(area)}`}
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-[0_16px_48px_rgba(0,0,0,0.4)] ring-1 ring-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-[rgba(212,175,55,0.35)]"
                >
                  <div className="headline-display text-lg font-semibold text-[var(--foreground)]">{area}</div>
                  <div className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Local profiles, FAQs, and nearby links</div>
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
              <h2 className="headline-display text-[clamp(1.85rem,3.2vw,2.75rem)] font-semibold leading-[1.1] tracking-normal text-[var(--foreground)]">
                Featured Hyderabad profiles
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-[1.05rem]">
                A curated first look at server-rendered profile pages with optimized images, canonical URLs, and internal
                links back into the Hyderabad area structure.
              </p>
            </div>
            <div className="shrink-0 rounded-full border border-[rgba(212,175,55,0.22)] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-[var(--muted)]">
              {topProfiles.length} featured
            </div>
          </div>

          <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:gap-10 xl:grid-cols-3 2xl:grid-cols-4">
            {topProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing border-t border-white/[0.06] bg-[#0a0608]">
        <div className="container-shell">
          <h2 className="headline-display text-3xl font-semibold text-[var(--foreground)]">Hyderabad area FAQs</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {cityFaqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                <h3 className="text-base font-semibold text-[var(--foreground)]">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
    </>
  );
}
