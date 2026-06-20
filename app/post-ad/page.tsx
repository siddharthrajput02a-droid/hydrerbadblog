import type { Metadata } from "next";
import { AdPostForm } from "@/components/ad-post-form";
import { QueryProvider } from "@/components/query-provider";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Post Profile Ad",
  description: "Post a Hyderabad profile ad with call, chat, and WhatsApp contact actions.",
  path: "/post-ad",
  noIndex: true
});

export default function PostAdPage() {
  return (
    <section className="section-spacing relative overflow-hidden bg-[var(--background)]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[min(48%,420px)] w-[min(92%,760px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.16),transparent_70%)] blur-3xl" />
      <div className="container-shell relative">
        <div className="mb-8 max-w-3xl">
          <p className="pill">Post Ad</p>
          <h1 className="headline-display section-title mt-5">Create a Hyderabad profile card</h1>
          <p className="section-copy mt-5">
            Build a public-style ad card with direct call, chat, and WhatsApp routes.
          </p>
        </div>
        <QueryProvider>
          <AdPostForm />
        </QueryProvider>
      </div>
    </section>
  );
}
