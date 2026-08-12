import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore every coastline in the Eco Yachts charter map — from the Greek Islands and Maldives to Croatia, the Amalfi Coast, and beyond.",
};

const DESTINATIONS = [
  { name: "Greek Islands", description: "Whitewashed villages and crystal Aegean coves.", image: "/images/destinations/santorini.jpg" },
  { name: "Maldives", description: "Overwater calm above protected coral reefs.", image: "/images/destinations/maldives.jpg" },
  { name: "Phuket, Thailand", description: "Limestone cliffs and warm Andaman waters.", image: "/images/destinations/phuket.jpg" },
  { name: "The Bahamas", description: "Shallow turquoise banks and quiet cays.", image: "/images/destinations/bahamas.jpg" },
  { name: "Brač Island, Croatia", description: "The Adriatic's famous shifting sandbar beach.", image: "/images/destinations/dest-40.jpg" },
  { name: "Corfu, Greece", description: "Emerald cliffs framing hidden turquoise coves.", image: "/images/destinations/dest-41.jpg" },
  { name: "Kotor Bay, Montenegro", description: "A fjord-like bay ringed by dramatic peaks.", image: "/images/destinations/dest-42.jpg" },
  { name: "Saint Lucia, Caribbean", description: "Twin volcanic peaks rising straight from the sea.", image: "/images/destinations/dest-43.jpg" },
  { name: "Kornati Islands, Croatia", description: "Pine-covered coves built for quiet anchorages.", image: "/images/destinations/dest-44.jpg" },
  { name: "Amalfi Coast, Italy", description: "Cliffside towns stacked above the Tyrrhenian Sea.", image: "/images/destinations/dest-45.jpg" },
  { name: "Dubai Marina, UAE", description: "Skyline glamour with desert-meets-sea style.", image: "/images/destinations/dest-46.jpg" },
  { name: "Railay Beach, Thailand", description: "Powder-white sand under towering limestone karsts.", image: "/images/destinations/dest-47.jpg" },
  { name: "Krabi Coast, Thailand", description: "Longtail boats drifting through jade-green water.", image: "/images/destinations/dest-48.jpg" },
  { name: "Krabi at Sunset, Thailand", description: "Golden light over the Andaman's karst islands.", image: "/images/destinations/dest-49.jpg" },
];

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title="Explore the World Responsibly"
        subtitle="Fourteen coastlines, one promise: every mile is sailed with the same care for the water beneath the hull."
        image="/images/destinations/dest-42.jpg"
        alt="Kotor Bay, Montenegro at sunrise"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESTINATIONS.map((destination) => (
              <div
                key={destination.name}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="flex items-center gap-1.5 font-bold text-brand-900">
                    <MapPin size={15} className="text-brand-600 shrink-0" />
                    {destination.name}
                  </h3>
                  <p className="mt-2 text-sm text-brand-900/60 leading-relaxed">
                    {destination.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-900 py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Don&apos;t See Your Dream Route?
          </h2>
          <p className="max-w-lg text-brand-100/80">
            We plan custom itineraries across every region we sail — tell us
            where you want to go.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-gold-400"
          >
            Plan My Route
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
