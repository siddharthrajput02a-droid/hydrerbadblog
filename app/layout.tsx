import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PwaRegister } from "@/components/pwa-register";
import { siteConfig } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

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
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className={`${inter.className} bg-[var(--background)] text-[var(--foreground)] antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <PwaRegister />
      </body>
    </html>
  );
}
