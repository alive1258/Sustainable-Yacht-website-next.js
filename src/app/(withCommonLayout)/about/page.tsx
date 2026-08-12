import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Compass,
  Handshake,
  Leaf,
  Newspaper,
  ShieldCheck,
  Users,
} from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";

export const metadata: Metadata = {
  title: "About Eco Yachts",
  description:
    "Learn who's behind Eco Yachts — our offices and people, our sustainability commitments, our partners, and our record for luxury charter without compromise.",
};

const STATS = [
  { value: "12+", label: "Years Chartering" },
  { value: "16", label: "Yachts in Fleet" },
  { value: "24", label: "Destinations Served" },
  { value: "98%", label: "Guest Return Rate" },
];

const SECTIONS = [
  {
    icon: Building2,
    title: "Offices & People",
    description:
      "Meet the teams behind every charter, from fleet operations to guest experience, across our regional offices.",
    href: "/about/offices-people",
  },
  {
    icon: Leaf,
    title: "Future & Sustainability",
    description:
      "Our roadmap for a lower-impact fleet — hybrid propulsion, marine conservation, and measurable emissions goals.",
    href: "/about/sustainability",
  },
  {
    icon: Users,
    title: "Join the Team",
    description:
      "Open roles across crew, shoreside operations, and sustainability — and what it's like working with us.",
    href: "/about/careers",
  },
  {
    icon: Handshake,
    title: "Partners",
    description:
      "The marinas, certification bodies, and conservation partners that make responsible chartering possible.",
    href: "/about/partners",
  },
  {
    icon: Newspaper,
    title: "Latest News",
    description:
      "Fleet updates, sustainability milestones, and announcements from across Eco Yachts.",
    href: "/about/news/latest",
  },
  {
    icon: Compass,
    title: "Events & Boat Shows",
    description:
      "Where to find the fleet in person — from regional boat shows to charter previews.",
    href: "/about/news/events",
  },
  {
    icon: ShieldCheck,
    title: "Luxury Charter Portfolio",
    description:
      "An overview of the charter experiences we build, from family itineraries to large-scale celebrations.",
    href: "/about/portfolio",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Luxury Chartering, Built With Intent"
        subtitle="Eco Yachts exists to prove that a charter can be genuinely luxurious and genuinely lower-impact at the same time. Here's who we are and how we work."
        image="/images/banner/large.jpg"
        alt="Eco Voyager underway, representing the Eco Yachts fleet"
      />

      {/* STORY */}
      <section className="bg-white py-16 md:py-24">
        <div className="container grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              Our Story
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
              A Fleet Built Around a Simple Idea
            </h2>
            <div className="mt-5 space-y-4 text-brand-900/70 leading-relaxed">
              <p>
                Eco Yachts started with a straightforward frustration: the
                luxury charter industry rarely asked what a week on the water
                cost the water itself. We set out to build a fleet where hybrid
                propulsion, responsible provisioning, and eco-certified
                operations were the standard, not an upsell.
              </p>
              <p>
                Today that means every yacht in our fleet is inspected and
                certified each season, every itinerary is built with local
                marine partners, and every guest gets the same standard of
                service you&apos;d expect from any five-star charter — just
                without the fuel bill weighing on your conscience.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/experiences/exp-marina.jpg"
              alt="Eco Yachts marina operations"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className=""
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-brand-900 py-14">
        <div className="container grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gold-400">
                {stat.value}
              </div>
              <div className="mt-2 text-xs sm:text-sm uppercase tracking-wide text-brand-100/70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION GRID */}
      <section className="bg-brand-50/50 py-16 md:py-24">
        <div className="container">
          <div className="mb-10 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              Explore
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
              More About Eco Yachts
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SECTIONS.map(({ icon: Icon, title, description, href }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col rounded-2xl border border-brand-900/10 bg-white p-6 shadow-sm transition hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-bold text-brand-900">{title}</h3>
                <p className="mt-2 text-sm text-brand-900/60 leading-relaxed">
                  {description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:text-brand-900 transition">
                  Learn More
                  <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-900">
            Want to Talk to a Real Person?
          </h2>
          <p className="max-w-lg text-brand-900/60">
            Our team is happy to walk you through the fleet, our sustainability
            standards, or a custom itinerary.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-gold-400"
          >
            Get in Touch
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
