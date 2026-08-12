import Image from "next/image";
import { ArrowRight, Send } from "lucide-react";

const DESTINATIONS = [
  {
    name: "Greek Islands",
    description: "Whitewashed villages and crystal Aegean coves.",
    image: "/images/destinations/santorini.jpg",
  },
  {
    name: "Maldives",
    description: "Overwater calm above protected coral reefs.",
    image: "/images/destinations/maldives.jpg",
  },
  {
    name: "Phuket, Thailand",
    description: "Limestone cliffs and warm Andaman waters.",
    image: "/images/destinations/phuket.jpg",
  },
  {
    name: "The Bahamas",
    description: "Shallow turquoise banks and quiet cays.",
    image: "/images/destinations/bahamas.jpg",
  },
];

const DestinationsSection = () => {
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
          {DESTINATIONS.map((destination) => (
            <div
              key={destination.name}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-brand-900">
                  {destination.name}
                </h3>
                <p className="mt-1.5 text-sm text-brand-900/60 leading-relaxed">
                  {destination.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
