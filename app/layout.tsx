import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PwaRegister } from "@/components/pwa-register";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  applicationName: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Premium Hyderabad Escort & Dating | Verified Profiles",
    template: "%s | Hyderabad Nocturne"
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url
  },
  keywords: [
    "Hyderabad escort",
    "Hyderabad dating",
    "Hyderabad companions",
    "verified profiles Hyderabad",
    "Banjara Hills",
    "Jubilee Hills",
    "Hitech City",
    "premium dating Hyderabad"
  ],
  openGraph: {
    title: siteConfig.titleHome,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/icons/icon-512.png",
        width: 512,
        height: 512,
        alt: `${siteConfig.name} Hyderabad directory`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.titleHome,
    description: siteConfig.description,
    images: ["/icons/icon-512.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.name
  },
  formatDetection: {
    telephone: false
  },
  other: {
    "apple-mobile-web-app-capable": "yes"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-[var(--background)] text-[var(--foreground)] antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <PwaRegister />
      </body>
    </html>
  );
}
