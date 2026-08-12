import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Ruler, Sparkles, Users } from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";
import { getYachtSummaries } from "@/src/utils/data/yachts";

export const metadata: Metadata = {
  title: "Our Fleet",
  description:
    "Browse the full Eco Yachts fleet — eco-certified sailing and motor yachts for charter, from intimate 6-guest boats to 14-guest flagships.",
};

const FLEET = getYachtSummaries();

const INNOVATIONS = [
  {
    name: "Silent Series Concept",
    description:
      "Near-silent electric propulsion for long-range cruising — in development for a future season.",
    image: "/images/yachts/yacht-my112-concept.webp",
  },
  {
    name: "Wind-Assisted Concept",
    description:
      "Rigid sail propulsion designed to cut fuel burn without cutting comfort.",
    image: "/images/yachts/yacht-ponant-solidsail.avif",
  },
];

const LIFE_ABOARD = [
  "/images/experiences/exp-35.jpg",
  "/images/experiences/exp-38.jpg",
  "/images/experiences/exp-wakeboard.webp",
  "/images/experiences/exp-dubai-tour.avif",
  "/images/experiences/exp-efoil.jpg",
];

export default function YachtsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Fleet"
        title="Sixteen Yachts. One Standard of Sustainable Luxury."
        subtitle="Every yacht in the Eco Yachts fleet is inspected, eco-certified, and crewed for a charter that's as easy on the water as it is on you."
        image="/images/yachts/eco-voyager.jpg"
        alt="Eco Voyager charter yacht underway"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FLEET.map((yacht) => (
              <Link
                key={yacht.slug}
                href={`/yachts/${yacht.slug}`}
                className="group overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={yacht.image}
                    alt={yacht.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-brand-900">
                    {yacht.name}
                  </h3>
                  <div className="mt-3 flex items-center gap-4 text-xs text-brand-900/60">
                    <span className="flex items-center gap-1.5">
                      <Ruler size={13} />
                      {yacht.length}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={13} />
                      {yacht.guests}
                    </span>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-brand-900/10 pt-4">
                    <span className="text-sm">
                      <span className="font-bold text-brand-900">
                        {yacht.price}
                      </span>
                      <span className="text-brand-900/50"> / night</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:text-brand-900 transition">
                      View Details
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INNOVATION STRIP — concept designs, not bookable inventory */}
      <section className="bg-brand-50/50 py-16 md:py-24">
        <div className="container">
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-600">
              <Sparkles size={13} />
              Innovation &amp; What&apos;s Next
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
              The Future of Sustainable Sailing
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {INNOVATIONS.map((item) => (
              <div
                key={item.name}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-brand-900">{item.name}</h3>
                  <p className="mt-2 text-sm text-brand-900/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIFE ABOARD gallery strip */}
      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-900 mb-10">
            Life Aboard
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {LIFE_ABOARD.map((src) => (
              <div
                key={src}
                className="relative aspect-square overflow-hidden rounded-xl"
              >
                <Image
                  src={src}
                  alt="Life aboard an Eco Yachts charter"
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-900 py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Not Sure Which Yacht Fits?
          </h2>
          <p className="max-w-lg text-brand-100/80">
            Tell us your group size, destination, and dates — we&apos;ll
            match you with the right boat.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-gold-400"
          >
            Talk to Our Team
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
