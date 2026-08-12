import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

// ✅ SEO Metadata
// NOTE: metadataBase/canonical use a placeholder domain — swap in the
// real domain once one is registered/deployed.
export const metadata: Metadata = {
  metadataBase: new URL("https://dranarulislam.com"),

  title: {
    default: "Dr. Anarul Islam | MBBS, MS Neurosurgery (Course)",
    template: "%s | Dr. Anarul Islam",
  },

  description:
    "Dr. Anarul Islam (MBBS, MS Neurosurgery Course) provides compassionate, personalized medical care. Book an appointment online today.",

  keywords: [
    "Dr. Anarul Islam",
    "Neurosurgeon Bangladesh",
    "Doctor appointment booking",
    "Online doctor consultation",
    "MBBS MS Neurosurgery",
    "General physician Dhaka",
  ],

  authors: [{ name: "Dr. Anarul Islam" }],
  creator: "Dr. Anarul Islam",
  publisher: "Dr. Anarul Islam",

  category: "health",

  // ✅ Open Graph (Facebook, LinkedIn)
  openGraph: {
    title: "Dr. Anarul Islam | MBBS, MS Neurosurgery (Course)",
    description:
      "Compassionate, personalized medical care from Dr. Anarul Islam — book an appointment online.",
    url: "https://dranarulislam.com",
    siteName: "Dr. Anarul Islam",
    images: [
      {
        url: "/images/dr/Anarul-Islam.jpg",
        width: 631,
        height: 640,
        alt: "Dr. Anarul Islam",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // ✅ Twitter SEO
  twitter: {
    card: "summary_large_image",
    title: "Dr. Anarul Islam | MBBS, MS Neurosurgery (Course)",
    description:
      "Compassionate, personalized medical care from Dr. Anarul Islam — book an appointment online.",
    images: ["/images/dr/Anarul-Islam.jpg"],
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
    canonical: "https://dranarulislam.com",
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
  applicationName: "Dr. Anarul Islam",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white text-black`}
      >
        <Providers>
          {children}
          <ToastProvider />
        </Providers>
      </body>
    </html>
  );
}
