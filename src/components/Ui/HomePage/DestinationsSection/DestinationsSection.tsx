import Image from "next/image";
import { ArrowRight, Send } from "lucide-react";
import type { ApiResponse } from "@/src/types/axios";
import type { DestinationItem } from "@/src/types/destinationType";

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

const DestinationsSection = async () => {
  const destinations = (await getActiveDestinations()).slice(0, 4);

  if (destinations.length === 0) return null;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              Top Destinations
            </span>
            <h2 className="mt-3 flex items-center gap-3 text-3xl sm:text-4xl font-bold text-brand-900">
              Explore the World Responsibly
              <Send size={26} className="hidden sm:block text-gold-500" />
            </h2>
          </div>
          <a
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition"
          >
            View All Destinations
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative  overflow-hidden">
                <Image
                  src={destination.image || FALLBACK_IMAGE}
                  alt={destination.name}
                  height={600}
                  width={600}
                  className="w-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-brand-900">{destination.name}</h3>
                {destination.description && (
                  <p className="mt-1.5 text-sm text-brand-900/60 leading-relaxed">
                    {destination.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
