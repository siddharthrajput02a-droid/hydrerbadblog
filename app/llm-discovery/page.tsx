import type { Metadata } from "next";
import Link from "next/link";
import { hyderabadAreas, profiles } from "@/data/profiles";
import {
  breadcrumbJsonLd,
  buildMetadata,
  collectionPageJsonLd,
  webPageJsonLd
} from "@/lib/seo";
import { siteConfig, slugifyArea } from "@/lib/utils";

const pageTitle = "AI Discovery & Technical Crawl Map";
const pageDescription =
  "Machine-readable crawl map for Hyderabad Afterglow, including city, area, listing, image, sitemap, robots, and AI discovery routes.";

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/llm-discovery",
  keywords: ["AI discovery", "llms.txt", "Hyderabad sitemap", "technical SEO crawl map"]
});

export default function LlmDiscoveryPage() {
  const profileLinks = profiles.slice(0, 16);
  const schemas = [
    webPageJsonLd({
      name: pageTitle,
      description: pageDescription,
      path: "/llm-discovery"
    }),
    collectionPageJsonLd({
      name: "Hyderabad crawl hierarchy",
      description: pageDescription,
      path: "/llm-discovery",
      itemUrls: [
        "/",
        "/hyderabad",
        "/ads",
        ...hyderabadAreas.map((area) => `/hyderabad/${slugifyArea(area)}`),
        ...profileLinks.map((profile) => `/profile/${profile.slug}`)
      ]
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "AI discovery", path: "/llm-discovery" }
    ])
  ];

  return (
    <section className="section-spacing bg-[var(--background)]">
      <div className="container-shell">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--foreground)]">Home</Link>
          <span className="px-2" aria-hidden>/</span>
          <span className="text-[var(--foreground)]">AI discovery</span>
        </nav>

        <p className="pill">Technical SEO</p>
        <h1 className="headline-display section-title mt-5 max-w-4xl">AI discovery and crawl map</h1>
        <p className="section-copy mt-5 max-w-3xl">
          This page exposes the canonical crawl structure for {siteConfig.name}: city hub, Hyderabad area pages,
          profile listings, image sitemap, robots, and AI discovery files.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <section className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-6">
            <h2 className="headline-display text-2xl font-semibold text-[var(--foreground)]">Machine files</h2>
            <ul className="mt-5 space-y-3 text-sm text-[var(--muted)]">
              <li><Link href="/robots.txt" className="hover:text-[var(--foreground)]">robots.txt</Link></li>
              <li><Link href="/sitemap-index.xml" className="hover:text-[var(--foreground)]">sitemap-index.xml</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-[var(--foreground)]">sitemap.xml</Link></li>
              <li><Link href="/llms.txt" className="hover:text-[var(--foreground)]">llms.txt</Link></li>
              <li><Link href="/ai.txt" className="hover:text-[var(--foreground)]">ai.txt</Link></li>
            </ul>
          </section>

          <section className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-6 lg:col-span-2">
            <h2 className="headline-display text-2xl font-semibold text-[var(--foreground)]">Split sitemaps</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["City sitemap", "/sitemaps/city-sitemap.xml"],
                ["Area sitemap", "/sitemaps/area-sitemap.xml"],
                ["Listing sitemap", "/sitemaps/listing-sitemap.xml"],
                ["Image sitemap", "/sitemaps/image-sitemap.xml"]
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-2xl border border-white/[0.08] bg-black/20 p-4 text-sm font-semibold text-[var(--foreground)] transition hover:border-[rgba(255,77,141,0.4)]"
                >
                  {label}
                </Link>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-10 rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-6">
          <h2 className="headline-display text-2xl font-semibold text-[var(--foreground)]">Hyderabad area cluster</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {hyderabadAreas.map((area) => (
              <Link
                key={area}
                href={`/hyderabad/${slugifyArea(area)}`}
                className="rounded-2xl border border-white/[0.08] bg-black/20 p-4 text-sm font-semibold text-[var(--foreground)] transition hover:border-[rgba(212,175,55,0.38)]"
              >
                {area}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-6">
          <h2 className="headline-display text-2xl font-semibold text-[var(--foreground)]">Sample listing cluster</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {profileLinks.map((profile) => (
              <Link
                key={profile.id}
                href={`/profile/${profile.slug}`}
                className="rounded-2xl border border-white/[0.08] bg-black/20 p-4 text-sm font-semibold text-[var(--foreground)] transition hover:border-[rgba(255,77,141,0.4)]"
              >
                {profile.name} in {profile.area}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
    </section>
  );
}
