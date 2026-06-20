import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { ProfileCard } from "@/components/profile-card";
import { profiles } from "@/data/profiles";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";
import { slugifyArea } from "@/lib/utils";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    area?: string;
  }>;
};

export const metadata: Metadata = buildMetadata({
  title: "Search Hyderabad Profiles",
  description: "Search Hyderabad companion profiles by name, area, category, and profile details.",
  path: "/search",
  noIndex: true
});

function matchesNeedle(value: string, needle: string) {
  return value.toLowerCase().includes(needle);
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = (params.q || "").trim();
  const area = (params.area || "").trim();
  const needle = query.toLowerCase();

  const results = profiles
    .filter((profile) => {
      const areaMatches = !area || slugifyArea(profile.area) === slugifyArea(area);
      const queryMatches =
        !needle ||
        [profile.name, profile.area, profile.category, profile.tagline, profile.description]
          .filter(Boolean)
          .some((value) => matchesNeedle(value, needle));

      return areaMatches && queryMatches;
    })
    .slice(0, 24);

  const schemas = [
    webPageJsonLd({
      name: "Search Hyderabad profiles",
      description: "Noindex search route used as the WebSite SearchAction target.",
      path: "/search"
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Search", path: "/search" }
    ])
  ];

  return (
    <section className="section-spacing bg-[var(--background)]">
      <div className="container-shell">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--foreground)]">Home</Link>
          <span className="px-2" aria-hidden>/</span>
          <span className="text-[var(--foreground)]">Search</span>
        </nav>

        <p className="pill">Profile search</p>
        <h1 className="headline-display section-title mt-5">Search Hyderabad profiles</h1>
        <form action="/search" className="mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="q">Search profiles</label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search by name, area, or category"
            className="min-h-[52px] flex-1 rounded-full border border-white/[0.1] bg-white/[0.05] px-5 text-base text-[var(--foreground)] outline-none transition placeholder:text-white/35 focus:border-[rgba(255,77,141,0.5)]"
          />
          <button type="submit" className="button-hyd-primary inline-flex min-h-[52px] items-center justify-center gap-2 px-7">
            <Search className="h-4 w-4" />
            Search
          </button>
        </form>

        <div className="mt-10 flex items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
          <p className="text-sm text-[var(--muted)]">
            {results.length} result{results.length === 1 ? "" : "s"}
            {query ? ` for "${query}"` : ""}
          </p>
          <Link href="/hyderabad" className="text-sm font-semibold text-[#ff8fbd] hover:text-[#ffd6e8]">
            Browse areas
          </Link>
        </div>

        {results.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:gap-10 xl:grid-cols-3 2xl:grid-cols-4">
            {results.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        ) : (
          <div className="glass-panel mt-10 rounded-[1.5rem] p-8 text-center">
            <h2 className="headline-display text-2xl font-semibold text-[var(--foreground)]">No profiles found</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">
              Try a nearby Hyderabad area or browse the full city hub.
            </p>
            <Link href="/hyderabad" className="button-hyd-primary mt-6 inline-flex min-h-[46px] items-center px-7 text-sm">
              Hyderabad areas
            </Link>
          </div>
        )}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
    </section>
  );
}
