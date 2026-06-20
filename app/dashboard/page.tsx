import type { Metadata } from "next";
import { MyAdsClient } from "@/components/my-ads-client";
import { QueryProvider } from "@/components/query-provider";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "My Ads",
  description: "Manage profile ads posted from this browser.",
  path: "/dashboard",
  noIndex: true
});

export default function DashboardPage() {
  return (
    <section className="section-spacing relative overflow-hidden bg-[var(--background)]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[min(46%,380px)] w-[min(92%,760px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.14),transparent_70%)] blur-3xl" />
      <div className="container-shell relative">
        <QueryProvider>
          <MyAdsClient />
        </QueryProvider>
      </div>
    </section>
  );
}
