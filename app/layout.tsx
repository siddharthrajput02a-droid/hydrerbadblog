import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
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
  ]
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className={`${inter.className} bg-[var(--background)] text-[var(--foreground)] antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
