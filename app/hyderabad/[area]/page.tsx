import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProfileCard } from "@/components/profile-card";
import { hyderabadAreas } from "@/data/profiles";
import { getProfiles } from "@/lib/api";
import { areaSeo, getAreaLabel, siteConfig, slugifyArea } from "@/lib/utils";

export function generateStaticParams() {
  return hyderabadAreas.map((area) => ({ area: slugifyArea(area) }));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const { area: areaSlug } = await params;
  const area = getAreaLabel(areaSlug);
  if (!area) {
    return {};
  }
  const seo = areaSeo(area);
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: seo.canonical
    },
    keywords: [
      `${area} dating`,
      `companions in ${area}`,
      `day dates Hyderabad ${area}`,
      `coffee dates ${area}`
    ]
  };
}

export default async function AreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area: areaSlug } = await params;
  const area = getAreaLabel(areaSlug);
  if (!area) {
    notFound();
  }

  const items = await getProfiles({ city: "Hyderabad", area: slugifyArea(area), limit: 48 });
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${area} dating in Hyderabad`,
    about: `Dating and companion profiles in ${area}, Hyderabad`,
    url: `${siteConfig.url}/hyderabad/${areaSlug}`
  };

  return (
    <section className="section-spacing relative overflow-hidden bg-[var(--background)]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[min(45%,360px)] w-[min(90%,640px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_70%)] blur-3xl" />
      <div className="container-shell relative">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
          {area} · Hyderabad
        </p>
        <h1 className="headline-display section-title mt-5 max-w-4xl md:mt-6">
          {area} — <span className="text-gradient">velvet chapter</span>
        </h1>
        <p className="section-copy mt-6 max-w-3xl text-base md:text-[1.05rem]">
          Explore a curated collection of premium profiles based in {area}. This page is generated for local SEO and keeps the
          same cinematic glass language as the lounge.
        </p>

        <div className="mx-auto my-10 h-px max-w-3xl bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.28)] to-transparent md:my-12" aria-hidden />

        <div className="relative">
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[min(90%,520px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.12),transparent_70%)] blur-3xl" />
          <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:gap-10 xl:grid-cols-3 2xl:grid-cols-4">
            {items.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}
