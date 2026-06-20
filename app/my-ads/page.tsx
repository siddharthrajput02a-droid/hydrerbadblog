import type { Metadata } from "next";
import { MyAdsClient } from "@/components/my-ads-client";
import { QueryProvider } from "@/components/query-provider";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "My Ads",
  description: "View and manage profile ads posted from this browser.",
  path: "/my-ads",
  noIndex: true
});

export default function MyAdsPage() {
  return (
    <section className="section-spacing relative overflow-hidden bg-[var(--background)]">
      <div className="pointer-events-none absolute right-0 top-0 h-[min(50%,420px)] w-[min(92%,720px)] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_70%)] blur-3xl" />
      <div className="container-shell relative">
        <QueryProvider>
          <MyAdsClient />
        </QueryProvider>
      </div>
    </section>
  );
}
