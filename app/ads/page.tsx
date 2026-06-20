import type { Metadata } from "next";
import Link from "next/link";
import { Plus, ShieldCheck } from "lucide-react";
import { UserAdCard } from "@/components/user-ad-card";
import { getUserAdStoreMode, readUserAds } from "@/lib/user-ad-store";
import { breadcrumbJsonLd, buildMetadata, collectionPageJsonLd, webPageJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = buildMetadata({
  title: "Approved Hyderabad Profile Ads",
  description:
    "Browse approved Hyderabad adult companion profile ads with direct call, chat, and WhatsApp contact actions.",
  path: "/ads",
  keywords: ["Hyderabad posted ads", "approved Hyderabad profiles", "Hyderabad companion ads"]
});

export default async function AdsPage() {
  const ads = (await readUserAds())
    .filter((ad) => ad.status === "Approved")
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
  const schemas = [
    webPageJsonLd({
      name: "Approved Hyderabad profile ads",
      description: "Approved user-posted profile ads for Hyderabad.",
      path: "/ads"
    }),
    collectionPageJsonLd({
      name: "Approved Hyderabad profile ads",
      description: "Approved user-posted profile ads for Hyderabad.",
      path: "/ads",
      itemUrls: ads.map((ad) => `/ads#${ad.id}`)
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Posted ads", path: "/ads" }
    ])
  ];

  return (
    <section className="section-spacing relative overflow-hidden bg-[var(--background)]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[min(48%,420px)] w-[min(92%,760px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.14),transparent_70%)] blur-3xl" />
      <div className="container-shell relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="pill">Posted ads</p>
            <h1 className="headline-display section-title mt-5">Approved Hyderabad profile ads</h1>
            <p className="section-copy mt-5">
              Public cards posted through the built-in Next.js backend. Each approved ad has call, chat, and WhatsApp actions.
            </p>
            <p className="mt-3 inline-flex rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              Storage: {getUserAdStoreMode() === "vercel-kv" ? "Vercel KV" : "local dev"}
            </p>
          </div>
          <Link href="/post-ad" rel="nofollow" className="button-hyd-primary inline-flex min-h-[48px] items-center justify-center gap-2 px-7 text-sm">
            <Plus className="h-4 w-4" />
            Post ad
          </Link>
        </div>

        {ads.length === 0 ? (
          <div className="glass-panel mt-10 rounded-[1.5rem] p-8 text-center">
            <ShieldCheck className="mx-auto h-10 w-10 text-[#ff8fbd]" />
            <h2 className="headline-display mt-4 text-2xl font-semibold text-[var(--foreground)]">
              No approved ads yet
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">
              New profile ads appear here after admin approval. You can still post and track your own card in My Ads.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/post-ad" rel="nofollow" className="button-hyd-primary inline-flex min-h-[46px] items-center gap-2 px-7 text-sm">
                <Plus className="h-4 w-4" />
                Post ad
              </Link>
              <Link href="/my-ads" rel="nofollow" className="button-hyd-secondary inline-flex min-h-[46px] items-center px-7 text-sm">
                My Ads
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {ads.map((ad) => (
              <UserAdCard key={ad.id} ad={ad} showStatus={false} />
            ))}
          </div>
        )}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
    </section>
  );
}
