import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ProfileLuxuryClient } from "@/components/profile/profile-luxury-client";
import { ProfileCard } from "@/components/profile-card";
import { profiles } from "@/data/profiles";
import { breadcrumbJsonLd, buildMetadata, profileJsonLd, webPageJsonLd } from "@/lib/seo";
import { getProfileBySlugOrId, slugifyArea } from "@/lib/utils";

type ProfilePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return profiles.map((profile) => ({ slug: profile.slug }));
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getProfileBySlugOrId(slug);

  if (!profile) {
    return buildMetadata({
      title: "Profile Not Found",
      description: "The requested Hyderabad profile could not be found.",
      path: `/profile/${slug}`,
      noIndex: true
    });
  }

  return buildMetadata({
    title: `${profile.name} in ${profile.area}, Hyderabad`,
    description: `${profile.tagline} Browse ${profile.name}'s gallery, local area context, availability preview, and private contact options in Hyderabad.`,
    path: `/profile/${profile.slug}`,
    image: profile.image,
    type: "profile",
    keywords: [
      profile.name,
      `${profile.area} Hyderabad`,
      profile.category,
      "Hyderabad companion profile",
      "Hyderabad premium dating"
    ]
  });
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params;
  const profile = getProfileBySlugOrId(slug);

  if (!profile) {
    notFound();
  }

  if (slug !== profile.slug) {
    redirect(`/profile/${profile.slug}`);
  }

  const relatedProfiles = profiles
    .filter((item) => item.id !== profile.id && item.area === profile.area)
    .concat(profiles.filter((item) => item.id !== profile.id && item.category === profile.category))
    .filter((item, index, array) => array.findIndex((candidate) => candidate.id === item.id) === index)
    .slice(0, 4);
  const schemas = [
    webPageJsonLd({
      name: `${profile.name} in ${profile.area}, Hyderabad`,
      description: profile.description,
      path: `/profile/${profile.slug}`,
      primaryImage: profile.image
    }),
    profileJsonLd(profile),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Hyderabad", path: "/hyderabad" },
      { name: profile.area, path: `/hyderabad/${slugifyArea(profile.area)}` },
      { name: profile.name, path: `/profile/${profile.slug}` }
    ])
  ];

  return (
    <>
      <ProfileLuxuryClient profile={profile} />
      <section className="section-spacing border-t border-white/[0.06] bg-[var(--background)]">
        <div className="container-shell">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="pill">Related profiles</p>
              <h2 className="headline-display mt-5 text-3xl font-semibold text-[var(--foreground)]">
                More in {profile.area}
              </h2>
              <p className="section-copy mt-4 max-w-2xl">
                Continue through the Hyderabad area cluster with nearby listing pages and the parent location page.
              </p>
            </div>
            <Link
              href={`/hyderabad/${slugifyArea(profile.area)}`}
              className="button-hyd-secondary inline-flex min-h-[46px] items-center justify-center px-7 text-sm"
            >
              View {profile.area}
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:gap-10 xl:grid-cols-4">
            {relatedProfiles.map((item) => (
              <ProfileCard key={item.id} profile={item} />
            ))}
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
    </>
  );
}
