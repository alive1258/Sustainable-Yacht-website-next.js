import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BatteryCharging,
  Fish,
  Recycle,
  Sprout,
} from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";

export const metadata: Metadata = {
  title: "Future & Sustainability",
  description:
    "Eco Yachts' sustainability roadmap — hybrid propulsion, marine conservation partnerships, waste reduction, and the emissions targets we're working toward.",
};

const PILLARS = [
  {
    icon: BatteryCharging,
    title: "Fleet Electrification",
    description:
      "Every new build and major refit moves toward hybrid-electric propulsion, cutting fuel burn without cutting range or comfort.",
  },
  {
    icon: Fish,
    title: "Marine Conservation",
    description:
      "We partner with regional marine reserves and reef-monitoring programs at the destinations we cruise most often.",
  },
  {
    icon: Recycle,
    title: "Waste Reduction",
    description:
      "Onboard water treatment, zero single-use plastic provisioning, and shoreside recycling protocols across the fleet.",
  },
  {
    icon: Sprout,
    title: "Community Partnerships",
    description:
      "Local provisioning and shore excursions are sourced from operators who share our environmental standards.",
  },
];

const ROADMAP = [
  {
    year: "2024",
    milestone:
      "Completed hybrid-electric refits across the first eight yachts in the fleet.",
  },
  {
    year: "2025",
    milestone:
      "Eliminated single-use plastics fleet-wide and launched onboard water-treatment systems.",
  },
  {
    year: "2026",
    milestone:
      "Extending eco-certification to all shoreside provisioning and excursion partners.",
  },
  {
    year: "2028",
    milestone:
      "Target: 50% reduction in average fleet fuel consumption versus our 2020 baseline.",
  },
  {
    year: "2030",
    milestone:
      "Target: fully hybrid-electric fleet, with pilot electric-only vessels for short-range charters.",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Future & Sustainability"
        subtitle="A charter shouldn't cost the water it sails on. Here's our roadmap for making that true across the whole fleet."
        image="/images/experiences/adventure-nature.jpg"
        alt="Coastal nature representing Eco Yachts' conservation focus"
      />

      {/* INTRO */}
      <section className="bg-white py-16 md:py-24">
        <div className="container grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              Why It Matters
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
              Sustainability Isn&apos;t an Add-On Here
            </h2>
            <p className="mt-5 text-brand-900/70 leading-relaxed">
              Luxury charter has historically treated environmental impact as
              someone else&apos;s problem. We built Eco Yachts on the opposite
              premise — that the boats we run, the water we cruise, and the
              guests we serve are the same system, and neglecting one part of it
              eventually costs the others.
            </p>
            <p className="mt-4 text-brand-900/70 leading-relaxed">
              That shows up in concrete ways: hybrid propulsion instead of pure
              diesel, provisioning partners we vet for their own practices, and
              a public roadmap we hold ourselves to — not just a mission
              statement.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/experiences/exp-savannah.jpg"
              alt="Coastal conservation area near an Eco Yachts destination"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className=""
            />
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="bg-brand-50/50 py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
            Four Pillars
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {PILLARS.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-900">{title}</h3>
                  <p className="mt-1.5 text-sm text-brand-900/60 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
            Our Roadmap
          </h2>
          <div className="mt-8 space-y-0 divide-y divide-brand-900/10 border-y border-brand-900/10">
            {ROADMAP.map((item) => (
              <div
                key={item.year}
                className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:gap-8"
              >
                <span className="text-lg font-bold text-gold-500 sm:w-20 shrink-0">
                  {item.year}
                </span>
                <p className="text-brand-900/70 leading-relaxed">
                  {item.milestone}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-brand-900/50">
            Targets reflect current fleet planning and are reviewed annually as
            technology and partnerships evolve.
          </p>
        </div>
      </section>

      <section className="bg-brand-900 py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Charter With a Lower-Impact Fleet
          </h2>
          <p className="max-w-lg text-brand-100/80">
            See the hybrid and solar-assisted yachts making this roadmap real,
            right now.
          </p>
          <Link
            href="/yachts"
            className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-gold-400"
          >
            Browse the Fleet
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
