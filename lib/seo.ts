import type { Metadata } from "next";
import { hyderabadAreas } from "@/data/profiles";
import type { Area, Profile } from "@/lib/types";
import { siteConfig, slugifyArea } from "@/lib/utils";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article" | "profile";
};

const defaultImagePath = "/icons/icon-512.png";

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  image = defaultImagePath,
  noIndex = false,
  type = "website"
}: MetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_IN",
      type,
      images: [
        {
          url: imageUrl,
          width: 512,
          height: 512,
          alt: `${siteConfig.name} preview`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    },
    robots: noIndex
      ? {
          index: false,
          follow: false
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1
          }
        }
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/icons/icon-512.png"),
    areaServed: {
      "@type": "City",
      name: "Hyderabad",
      addressCountry: "IN"
    }
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absoluteUrl("/search?q={search_term_string}")
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function webPageJsonLd({
  name,
  description,
  path,
  primaryImage
}: {
  name: string;
  description: string;
  path: string;
  primaryImage?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url
    },
    ...(primaryImage
      ? {
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: absoluteUrl(primaryImage)
          }
        }
      : {})
  };
}

export function localBusinessJsonLd(area?: Area) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: area ? `${siteConfig.name} ${area}` : siteConfig.name,
    url: area ? absoluteUrl(`/hyderabad/${slugifyArea(area)}`) : siteConfig.url,
    image: absoluteUrl("/icons/icon-512.png"),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: area || "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN"
    },
    areaServed: area
      ? {
          "@type": "Place",
          name: `${area}, Hyderabad`
        }
      : hyderabadAreas.map((name) => ({
          "@type": "Place",
          name: `${name}, Hyderabad`
        }))
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function collectionPageJsonLd({
  name,
  description,
  path,
  itemUrls
}: {
  name: string;
  description: string;
  path: string;
  itemUrls: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: itemUrls.map((url, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(url)
      }))
    }
  };
}

export function profileJsonLd(profile: Profile) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${profile.name} in ${profile.area}, Hyderabad`,
    description: profile.description,
    url: absoluteUrl(`/profile/${profile.slug}`),
    image: absoluteUrl(profile.image),
    mainEntity: {
      "@type": "Person",
      name: profile.name,
      description: profile.tagline,
      image: absoluteUrl(profile.image),
      address: {
        "@type": "PostalAddress",
        addressLocality: profile.area,
        addressRegion: "Telangana",
        addressCountry: "IN"
      }
    }
  };
}
