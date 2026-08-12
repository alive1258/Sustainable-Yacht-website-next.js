import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import "./globals.css";
import Providers from "@/src/lib/providers/Providers";
import ToastProvider from "../components/Common/ToastProvider/ToastProvider";

// ✅ Font Optimization
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Handwritten accent font for headline highlight words (e.g. "Journeys")
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// ✅ SEO Metadata
// NOTE: metadataBase/canonical use a placeholder domain — swap in the
// real domain once one is registered/deployed.
export const metadata: Metadata = {
  metadataBase: new URL("https://ecoyachts.com"),

  title: {
    default: "Eco Yachts | Sustainable Yachts. Extraordinary Journeys.",
    template: "%s | Eco Yachts",
  },

  description:
    "Charter eco-certified luxury yachts and sail the world responsibly. Curated journeys, sustainable travel, and unforgettable experiences on the water.",

  keywords: [
    "Eco Yachts",
    "sustainable yacht charter",
    "luxury yacht rental",
    "eco-friendly yacht travel",
    "yacht booking",
    "responsible luxury travel",
  ],

  authors: [{ name: "Eco Yachts" }],
  creator: "Eco Yachts",
  publisher: "Eco Yachts",

  category: "travel",

  // ✅ Open Graph (Facebook, LinkedIn)
  openGraph: {
    title: "Eco Yachts | Sustainable Yachts. Extraordinary Journeys.",
    description:
      "Charter eco-certified luxury yachts and sail the world responsibly.",
    url: "https://ecoyachts.com",
    siteName: "Eco Yachts",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1600,
        height: 1000,
        alt: "Eco Yachts — sustainable luxury yacht at sea",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // ✅ Twitter SEO
  twitter: {
    card: "summary_large_image",
    title: "Eco Yachts | Sustainable Yachts. Extraordinary Journeys.",
    description:
      "Charter eco-certified luxury yachts and sail the world responsibly.",
    images: ["/images/hero-bg.jpg"],
  },

  // ✅ Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ✅ Canonical
  alternates: {
    canonical: "https://ecoyachts.com",
  },

  // ✅ Icons
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.svg",
  },

  // ✅ App Info
  applicationName: "Eco Yachts",
  referrer: "origin-when-cross-origin",

  // ✅ Format detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} font-sans antialiased bg-white text-brand-900`}
      >
        <Providers>
          {children}
          <ToastProvider />
        </Providers>
      </body>
    </html>
  );
}
