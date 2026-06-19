import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ProfileLuxuryClient } from "@/components/profile/profile-luxury-client";
import { profiles } from "@/data/profiles";
import { getProfileBySlugOrId, siteConfig } from "@/lib/utils";

type ProfilePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return profiles.flatMap((profile) => [{ slug: profile.slug }, { slug: profile.id }]);
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getProfileBySlugOrId(slug);

  if (!profile) {
    return {
      title: "Profile Not Found"
    };
  }

  const title = `${profile.name} in ${profile.area}`;
  const description = `${profile.tagline} Browse ${profile.name}'s gallery, availability, reviews, and request details in Hyderabad.`;
  const canonical = `${siteConfig.url}/profile/${profile.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [
        {
          url: profile.image,
          alt: `${profile.name} profile photo`
        }
      ]
    },
    keywords: [
      profile.name,
      `${profile.area} Hyderabad`,
      profile.category,
      "Hyderabad companion profile",
      "Hyderabad premium dating"
    ]
  };
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

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${profile.name} in ${profile.area}, Hyderabad`,
    description: profile.description,
    url: `${siteConfig.url}/profile/${profile.slug}`,
    image: profile.image,
    mainEntity: {
      "@type": "Person",
      name: profile.name,
      description: profile.tagline,
      address: {
        "@type": "PostalAddress",
        addressLocality: profile.area,
        addressRegion: "Hyderabad",
        addressCountry: "IN"
      }
    }
  };

  return (
    <>
      <ProfileLuxuryClient profile={profile} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
