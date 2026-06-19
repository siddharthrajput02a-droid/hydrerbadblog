import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, CalendarClock, Clock3, ShieldCheck, UserRoundCheck } from "lucide-react";
import { profiles } from "@/data/profiles";
import { currency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Moderation, booking requests, and profile quality controls for the Hyderabad directory."
};

const queue = profiles.slice(0, 6).map((profile, index) => ({
  profile,
  status: index % 3 === 0 ? "New request" : index % 3 === 1 ? "Profile review" : "Availability check",
  received: index < 2 ? "Today" : "This week"
}));

const stats = [
  { label: "Live profiles", value: profiles.length, icon: UserRoundCheck },
  { label: "Pending checks", value: 7, icon: Clock3 },
  { label: "Today requests", value: 12, icon: CalendarClock },
  { label: "Verified rate", value: "96%", icon: ShieldCheck }
];

export default function AdminDashboardPage() {
  return (
    <section className="section-spacing relative overflow-hidden bg-[var(--background)]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[min(52%,420px)] w-[min(92%,760px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_70%)] blur-3xl" />
      <div className="container-shell relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="pill">Admin house</p>
            <h1 className="headline-display mt-5 text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.04] text-[var(--foreground)]">
              Moderation, requests, and profile quality
            </h1>
            <p className="section-copy mt-5 max-w-2xl">
              Review incoming concierge requests, verify profile data, and keep Hyderabad listings ready for visitors.
            </p>
          </div>
          <Link href="/hyderabad" className="button-secondary inline-flex min-h-[3rem] items-center justify-center px-7 text-sm">
            View directory
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="luxury-glass rounded-[1.5rem] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{label}</p>
                  <p className="headline-display mt-3 text-3xl font-semibold text-[var(--foreground)]">{value}</p>
                </div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(212,175,55,0.22)] bg-white/[0.04] text-[var(--accent-bright)]">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1fr,360px]">
          <section className="luxury-glass overflow-hidden rounded-[2rem]">
            <div className="flex flex-col gap-4 border-b border-white/[0.08] px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-7">
              <div>
                <h2 className="headline-display text-2xl font-semibold text-[var(--foreground)]">Review queue</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">New requests and profile checks waiting for action.</p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(212,175,55,0.22)] bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                <BadgeCheck className="h-4 w-4 text-[var(--accent)]" />
                Verified flow
              </span>
            </div>

            <div className="divide-y divide-white/[0.07]">
              {queue.map(({ profile, status, received }) => (
                <div key={profile.id} className="grid gap-4 px-5 py-5 md:grid-cols-[1fr,auto] md:items-center md:px-7">
                  <Link href={`/profile/${profile.slug}`} className="group flex min-w-0 items-center gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-1 ring-[rgba(212,175,55,0.25)]">
                      <Image src={profile.image} alt="" fill className="object-cover" sizes="64px" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold text-[var(--foreground)] transition group-hover:text-[var(--accent-bright)]">
                        {profile.name}
                      </h3>
                      <p className="mt-1 truncate text-sm text-[var(--muted)]">
                        {profile.area} / {profile.category} / {currency(profile.price)}
                      </p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-deep)]">
                        {status} / {received}
                      </p>
                    </div>
                  </Link>

                  <div className="flex flex-wrap gap-2 md:justify-end">
                    <button type="button" className="button-secondary px-4 py-2 text-xs">
                      Hold
                    </button>
                    <button type="button" className="button-primary px-4 py-2 text-xs">
                      Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="luxury-glass rounded-[2rem] p-6">
              <h2 className="headline-display text-2xl font-semibold text-[var(--foreground)]">Today</h2>
              <div className="mt-5 space-y-4">
                {[
                  ["9", "Profiles need image review"],
                  ["5", "Requests need concierge reply"],
                  ["3", "Area pages changed this week"]
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl bg-black/20 p-4 ring-1 ring-white/[0.06]">
                    <p className="headline-display text-2xl font-semibold text-[var(--accent-bright)]">{value}</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">{label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="luxury-glass rounded-[2rem] p-6">
              <h2 className="headline-display text-2xl font-semibold text-[var(--foreground)]">Quality rules</h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--muted)]">
                <li>Confirm every profile is 18+ before it goes live.</li>
                <li>Keep descriptions non-explicit and lifestyle focused.</li>
                <li>Review duplicate photos before approving changes.</li>
                <li>Escalate unsafe or incomplete requests for manual review.</li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}
