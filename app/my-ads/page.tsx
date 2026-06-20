import type { Metadata } from "next";
import { MyAdsClient } from "@/components/my-ads-client";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "My Ads",
  description: "View and manage profile ads posted from this browser.",
  alternates: {
    canonical: `${siteConfig.url}/my-ads`
  }
};

export default function MyAdsPage() {
  return (
    <section className="section-spacing relative overflow-hidden bg-[var(--background)]">
      <div className="pointer-events-none absolute right-0 top-0 h-[min(50%,420px)] w-[min(92%,720px)] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_70%)] blur-3xl" />
      <div className="container-shell relative">
        <MyAdsClient />
      </div>
    </section>
  );
}
