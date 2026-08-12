import Image from "next/image";
import { ArrowRight } from "lucide-react";

const EXPERIENCES = [
  {
    title: "Tropical Escapes",
    description:
      "Island-hop through hidden coves and reef-fringed anchorages.",
    image: "/images/experiences/tropical-escapes.jpg",
  },
  {
    title: "Cultural Voyages",
    description: "Coastal towns, local markets, and centuries of history.",
    image: "/images/experiences/cultural-voyages.jpg",
  },
  {
    title: "Adventure & Nature",
    description: "Diving, wildlife encounters, and untouched coastlines.",
    image: "/images/experiences/adventure-nature.jpg",
  },
];

const ExperiencesSection = () => {
  return (
    <section className="bg-brand-50/50 py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              Handpicked Experiences
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
              Curated Journeys Just for You
            </h2>
          </div>
          <a
            href="#experiences"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition"
          >
            View All Experiences
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERIENCES.map(({ title, description, image }) => (
            <div
              key={title}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-brand-900">{title}</h3>
                <p className="mt-2 text-sm text-brand-900/60 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
