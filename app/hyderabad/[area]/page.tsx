import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { ProfileCard } from "@/components/profile-card";
import { areaSeoCopy } from "@/data/hyderabad-seo";
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
import { areaSeo, getAreaLabel, slugifyArea } from "@/lib/utils";

export function generateStaticParams() {
  return hyderabadAreas.map((area) => ({ area: slugifyArea(area) }));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const { area: areaSlug } = await params;
  const area = getAreaLabel(slugifyArea(areaSlug));
  if (!area) {
    return buildMetadata({
      title: "Hyderabad Area Not Found",
      description: "The requested Hyderabad location page could not be found.",
      path: `/hyderabad/${areaSlug}`,
      noIndex: true
    });
  }

  const seo = areaSeo(area);
  return buildMetadata({
    title: seo.title,
    description: seo.description,
    path: `/hyderabad/${slugifyArea(area)}`,
    keywords: seo.keywords
  });
}

export default async function AreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area: areaSlug } = await params;
  const normalizedAreaSlug = slugifyArea(areaSlug);
  const area = getAreaLabel(normalizedAreaSlug);
  if (!area) {
    notFound();
  }

  const canonicalAreaSlug = slugifyArea(area);
  if (normalizedAreaSlug !== canonicalAreaSlug || areaSlug !== canonicalAreaSlug) {
    redirect(`/hyderabad/${canonicalAreaSlug}`);
  }

  const copy = areaSeoCopy[area];
  const items = await getProfiles({ city: "Hyderabad", area: slugifyArea(area), limit: 48 });
  const nearby = copy.nearby.filter((nearbyArea) => nearbyArea !== area);
  const seo = areaSeo(area);
  const schemas = [
    webPageJsonLd({
      name: `${area} escort and companion profiles`,
      description: seo.description,
      path: `/hyderabad/${slugifyArea(area)}`
    }),
    collectionPageJsonLd({
      name: `${area} companion profiles in Hyderabad`,
      description: seo.description,
      path: `/hyderabad/${slugifyArea(area)}`,
      itemUrls: items.map((profile) => `/profile/${profile.slug}`)
    }),
    localBusinessJsonLd(area),
    faqJsonLd(copy.faqs),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Hyderabad", path: "/hyderabad" },
      { name: area, path: `/hyderabad/${slugifyArea(area)}` }
    ])
  ];

  return (
    <section className="section-spacing relative overflow-hidden bg-[var(--background)]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[min(45%,360px)] w-[min(90%,640px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_70%)] blur-3xl" />
      <div className="container-shell relative">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--foreground)]">Home</Link>
          <span className="px-2" aria-hidden>/</span>
          <Link href="/hyderabad" className="hover:text-[var(--foreground)]">Hyderabad</Link>
          <span className="px-2" aria-hidden>/</span>
          <span className="text-[var(--foreground)]">{area}</span>
        </nav>

        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
          {area} / Hyderabad
        </p>
        <h1 className="headline-display section-title mt-5 max-w-4xl md:mt-6">
          {area} escort and companion profiles
        </h1>
        <p className="section-copy mt-6 max-w-3xl text-base md:text-[1.05rem]">{copy.intro}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {copy.highlights.map((highlight) => (
            <div key={highlight} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
              <MapPin className="h-5 w-5 text-[#ff8fbd]" aria-hidden />
              <p className="mt-3 text-sm font-semibold text-[var(--foreground)]">{highlight}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto my-10 h-px max-w-3xl bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.28)] to-transparent md:my-12" aria-hidden />

        <div className="relative">
          <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:gap-10 xl:grid-cols-3 2xl:grid-cols-4">
            {items.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </div>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1fr,0.85fr]">
          <div className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-6">
            <h2 className="headline-display text-2xl font-semibold text-[var(--foreground)]">
              Why browse {area}?
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              This page is built as a dedicated Hyderabad location page with unique metadata, local text, profile links,
              FAQ schema, and nearby area navigation. It helps visitors and crawlers understand the specific {area} context
              instead of treating every Hyderabad page as duplicate city-wide content.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-6">
            <h2 className="headline-display text-2xl font-semibold text-[var(--foreground)]">Nearby areas</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {nearby.map((nearbyArea) => (
                <Link
                  key={nearbyArea}
                  href={`/hyderabad/${slugifyArea(nearbyArea)}`}
                  className="rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-sm text-[var(--muted)] transition hover:border-[rgba(255,77,141,0.4)] hover:text-[var(--foreground)]"
                >
                  {nearbyArea}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="headline-display text-2xl font-semibold text-[var(--foreground)]">{area} FAQs</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {copy.faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                <h3 className="font-semibold text-[var(--foreground)]">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
    </section>
  );
}
