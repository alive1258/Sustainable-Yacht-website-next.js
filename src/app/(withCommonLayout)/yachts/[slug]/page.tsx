import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Anchor,
  BedDouble,
  CheckCircle2,
  Compass,
  Gauge,
  Ruler,
  Ship,
  Users,
} from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";
import { YACHT_FLEET, getYachtBySlug } from "@/src/utils/data/yachts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return YACHT_FLEET.map((yacht) => ({ slug: yacht.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const yacht = getYachtBySlug(slug);

  if (!yacht) {
    return { title: "Yacht Not Found" };
  }

  return {
    title: `${yacht.name} — ${yacht.category} for Charter`,
    description: `${yacht.name}: ${yacht.tagline}. ${yacht.length}, sleeps ${yacht.guests} guests across ${yacht.cabins} staterooms, from ${yacht.priceFrom} ${yacht.priceUnit}.`,
    openGraph: {
      title: `${yacht.name} — Eco Yachts`,
      description: yacht.tagline,
      images: [yacht.heroImage],
    },
  };
}

const QUICK_FACTS = (yacht: ReturnType<typeof getYachtBySlug>) =>
  yacht
    ? [
        { icon: Ruler, label: "Length", value: yacht.length },
        { icon: Ship, label: "Built/Refit", value: yacht.builtRefit },
        { icon: Users, label: "Guests", value: String(yacht.guests) },
        { icon: BedDouble, label: "Cabins", value: String(yacht.cabins) },
        { icon: Anchor, label: "Crew", value: String(yacht.crew) },
        {
          icon: Compass,
          label: "Charter Rate",
          value: `From ${yacht.priceFrom}`,
        },
      ]
    : [];

export default async function YachtDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const yacht = getYachtBySlug(slug);

  if (!yacht) {
    notFound();
  }

  const otherYachts = YACHT_FLEET.filter((y) => y.slug !== yacht.slug).slice(
    0,
    3
  );

  return (
    <>
      <PageHero
        eyebrow={yacht.category}
        title={yacht.name}
        subtitle={yacht.tagline}
        image={yacht.heroImage}
        alt={`${yacht.name} — ${yacht.category} for charter`}
      />

      {/* QUICK FACTS STRIP */}
      <section className="border-b border-brand-900/10 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 py-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
            {QUICK_FACTS(yacht).map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon size={18} className="mt-0.5 shrink-0 text-gold-500" />
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-brand-900/50">
                    {label}
                  </div>
                  <div className="text-sm font-bold text-brand-900">
                    {value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <Link
            href="/yachts"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 transition"
          >
            <ArrowLeft size={14} />
            Back to Fleet
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-3 lg:gap-10">
            {/* MAIN CONTENT */}
            <div className="lg:col-span-2 space-y-16">
              {/* DESCRIPTION */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
                  About {yacht.name}
                </h2>
                <div className="mt-5 space-y-4">
                  {yacht.description.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-brand-900/70 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* SPECIAL FEATURES */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
                  Special Features
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {yacht.specialFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-brand-900/70"
                    >
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-brand-600"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* GALLERY */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
                  Image Gallery
                </h2>
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {yacht.gallery.map((src, i) => (
                    <div
                      key={`${src}-${i}`}
                      className={`relative overflow-hidden rounded-xl ${
                        i === 0
                          ? "col-span-2 aspect-[16/10] sm:col-span-3"
                          : "aspect-square"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`${yacht.name} — gallery photo ${i + 1}`}
                        fill
                        sizes="(min-width: 640px) 33vw, 50vw"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* SPECIFICATIONS */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
                  Specifications
                </h2>

                <div className="mt-5 grid gap-8 sm:grid-cols-2">
                  <SpecGroup title="Accommodation">
                    <SpecRow
                      label="Guests"
                      value={`${yacht.specifications.accommodation.guestsCruising} cruising & ${yacht.specifications.accommodation.guestsSleeping} sleeping`}
                    />
                    <SpecRow
                      label="Staterooms"
                      value={String(
                        yacht.specifications.accommodation.staterooms
                      )}
                    />
                    <SpecRow
                      label="Cabin Configuration"
                      value={yacht.specifications.accommodation.cabinConfig
                        .map((c) => `${c.type} (${c.count})`)
                        .join(", ")}
                    />
                    <SpecRow
                      label="Crew"
                      value={String(yacht.specifications.accommodation.crew)}
                    />
                  </SpecGroup>

                  <SpecGroup title="Construction & Design">
                    <SpecRow
                      label="Built/Refit"
                      value={`${yacht.specifications.construction.builtYear}/${yacht.specifications.construction.refitYear}`}
                    />
                    <SpecRow
                      label="Builder"
                      value={yacht.specifications.construction.builder}
                    />
                    <SpecRow
                      label="Hull Material"
                      value={yacht.specifications.construction.hullMaterial}
                    />
                    <SpecRow
                      label="Exterior Designer"
                      value={
                        yacht.specifications.construction.exteriorDesigner
                      }
                    />
                    <SpecRow
                      label="Interior Designer"
                      value={
                        yacht.specifications.construction.interiorDesigner
                      }
                    />
                  </SpecGroup>

                  <SpecGroup title="Dimensions & Volume">
                    <SpecRow
                      label="Length"
                      value={yacht.specifications.dimensions.length}
                    />
                    <SpecRow
                      label="Beam"
                      value={yacht.specifications.dimensions.beam}
                    />
                    <SpecRow
                      label="Draft"
                      value={yacht.specifications.dimensions.draft}
                    />
                    <SpecRow
                      label="Gross Tonnage"
                      value={yacht.specifications.dimensions.grossTonnage}
                    />
                  </SpecGroup>

                  <SpecGroup title="Performance & Engines">
                    <SpecRow
                      label="Cruising Speed"
                      value={yacht.specifications.performance.cruisingSpeed}
                    />
                    <SpecRow
                      label="Max Speed"
                      value={yacht.specifications.performance.maxSpeed}
                    />
                    <SpecRow
                      label="Range"
                      value={yacht.specifications.performance.range}
                    />
                    <SpecRow
                      label="Engines"
                      value={yacht.specifications.performance.engines}
                    />
                    <SpecRow
                      label="Generators"
                      value={yacht.specifications.performance.generators}
                    />
                  </SpecGroup>

                  <SpecGroup title="Classification & Flag State">
                    <SpecRow
                      label="Classification"
                      value={yacht.specifications.classification.classification}
                    />
                    <SpecRow
                      label="Flag"
                      value={yacht.specifications.classification.flag}
                    />
                  </SpecGroup>

                  <SpecGroup title="Features">
                    <div className="flex flex-wrap gap-2 pt-1">
                      {yacht.specifications.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </SpecGroup>
                </div>
              </div>

              {/* LOCATION & RATE */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
                  Location &amp; Charter Rate
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {yacht.rates.map((rate) => (
                    <div
                      key={rate.season}
                      className="rounded-2xl border border-brand-900/10 p-6"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-brand-900">
                          {rate.season}
                        </h3>
                        <span className="text-xs font-semibold text-brand-900/50">
                          {rate.dateRange}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-brand-900/60">
                        {rate.region}
                      </p>
                      <div className="mt-4 space-y-2 border-t border-brand-900/10 pt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-brand-900/60">
                            Low Season
                          </span>
                          <span className="font-bold text-brand-900">
                            {rate.lowSeason}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-brand-900/60">
                            High Season
                          </span>
                          <span className="font-bold text-brand-900">
                            {rate.highSeason}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div className="rounded-2xl border border-brand-900/10 bg-brand-50/50 p-6">
                  <div className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                    Charter Rate
                  </div>
                  <div className="mt-2 text-3xl font-bold text-brand-900">
                    {yacht.priceFrom}
                    <span className="text-base font-semibold text-brand-900/50">
                      {" "}
                      {yacht.priceUnit}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-brand-900/60">
                    Rates vary by season and itinerary. Speak with our team
                    for a tailored quote.
                  </p>
                  <Link
                    href={`/contact?yacht=${yacht.slug}`}
                    className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-gold-400"
                  >
                    Send an Inquiry
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="rounded-2xl border border-brand-900/10 p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-brand-900/50">
                    At a Glance
                  </h3>
                  <dl className="mt-4 space-y-3">
                    {QUICK_FACTS(yacht).map(({ icon: Icon, label, value }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between text-sm"
                      >
                        <dt className="flex items-center gap-2 text-brand-900/60">
                          <Icon size={14} className="text-gold-500" />
                          {label}
                        </dt>
                        <dd className="font-semibold text-brand-900">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="flex items-center gap-2 rounded-2xl bg-brand-900 p-6 text-white">
                  <Gauge size={18} className="shrink-0 text-gold-400" />
                  <p className="text-sm leading-relaxed">
                    Every yacht in the fleet is inspected and eco-certified
                    ahead of each charter season.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* EXPLORE MORE OF THE FLEET */}
      {otherYachts.length > 0 && (
        <section className="bg-brand-50/50 py-16 md:py-24">
          <div className="container">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
                Explore More of the Fleet
              </h2>
              <Link
                href="/yachts"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition"
              >
                View Full Fleet
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherYachts.map((other) => (
                <Link
                  key={other.slug}
                  href={`/yachts/${other.slug}`}
                  className="group overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={other.heroImage}
                      alt={other.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-brand-900">
                      {other.name}
                    </h3>
                    <div className="mt-3 flex items-center gap-4 text-xs text-brand-900/60">
                      <span className="flex items-center gap-1.5">
                        <Ruler size={13} />
                        {other.length}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users size={13} />
                        {other.guests} Guests
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-brand-900 py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Charter {yacht.name}?
          </h2>
          <p className="max-w-lg text-brand-100/80">
            Tell us your dates, destination, and group size — our team will
            confirm availability and build your itinerary.
          </p>
          <Link
            href={`/contact?yacht=${yacht.slug}`}
            className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-gold-400"
          >
            Send an Inquiry
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

function SpecGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wide text-brand-900/50">
        {title}
      </h3>
      <div className="mt-3 divide-y divide-brand-900/10 border-t border-brand-900/10">
        {children}
      </div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 text-sm">
      <span className="text-brand-900/60">{label}</span>
      <span className="text-right font-semibold text-brand-900">
        {value}
      </span>
    </div>
  );
}
