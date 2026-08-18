import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";
import type { ApiResponse } from "@/src/types/axios";
import type { DestinationItem } from "@/src/types/destinationType";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore every coastline in the Eco Yachts charter map — from the Greek Islands and Maldives to Croatia, the Amalfi Coast, and beyond.",
};

const FALLBACK_IMAGE = "/images/destinations/santorini.jpg";

async function getActiveDestinations(): Promise<DestinationItem[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/destinations/active`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return [];

    const body: ApiResponse<DestinationItem[]> = await res.json();
    return body.data ?? [];
  } catch {
    return [];
  }
}

export default async function DestinationsPage() {
  const destinations = await getActiveDestinations();

  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title="Explore the World Responsibly"
        subtitle={
          destinations.length > 0
            ? `${destinations.length} coastline${destinations.length === 1 ? "" : "s"}, one promise: every mile is sailed with the same care for the water beneath the hull.`
            : "Every mile is sailed with the same care for the water beneath the hull."
        }
        image="/images/destinations/dest-42.jpg"
        alt="Kotor Bay, Montenegro at sunrise"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container">
          {destinations.length === 0 ? (
            <p className="text-center text-brand-900/60">
              No destinations are available right now. Please check back soon.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((destination) => (
                <div
                  key={destination.id}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={destination.image || FALLBACK_IMAGE}
                      alt={destination.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className=" transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="flex items-center gap-1.5 font-bold text-brand-900">
                      <MapPin size={15} className="text-brand-600 shrink-0" />
                      {destination.name}
                    </h3>
                    {destination.description && (
                      <p className="mt-2 text-sm text-brand-900/60 leading-relaxed">
                        {destination.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
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
