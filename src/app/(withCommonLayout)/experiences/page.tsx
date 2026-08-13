import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";

export const metadata: Metadata = {
  title: "Handpicked Experiences",
  description:
    "A closer look at every handpicked experience woven into our charters — water sports, island escapes, cultural voyages, and more.",
};

const IMAGE_EXTENSIONS = /\.(jpe?g|png|webp|avif)$/i;

interface ExperienceCard {
  image: string;
  title: string;
  description: string;
}

// Curated copy keyed by filename. Any image dropped into
// public/images/experiences without an entry here still renders (title
// falls back to a humanized filename), so the gallery never breaks — it
// just reads better once copy is added for it.
const EXPERIENCE_COPY: Record<string, { title: string; description: string }> = {
  "exp-jetski-tender.jpg": {
    title: "Water Sports & Adventure",
    description: "Jet skis, tenders, and on-water thrills off the swim deck.",
  },
  "exp-efoil.jpg": {
    title: "Tropical Escapes",
    description: "Island-hop through hidden coves and reef-fringed anchorages.",
  },
  "exp-dubai-watersports.jpeg": {
    title: "Dubai Luxury Excursions",
    description: "Marina skylines, gourmet dining, and desert-meets-sea style.",
  },
  "exp-marina.jpg": {
    title: "Marina & Coastal Living",
    description: "Wake up in the world's most photogenic harbors.",
  },
  "cultural-voyages.jpg": {
    title: "Cultural Voyages",
    description: "Coastal towns, local markets, and centuries of history.",
  },
  "adventure-nature.jpg": {
    title: "Adventure & Nature",
    description: "Diving, wildlife encounters, and untouched coastlines.",
  },
  "tropical-escapes.jpg": {
    title: "Island Hopping",
    description: "Chart a course between secluded bays and postcard coves.",
  },
  "exp-savannah.jpg": {
    title: "Safari & Savannah Add-Ons",
    description: "Pair your charter with an inland safari for big-game encounters.",
  },
  "exp-35.jpg": {
    title: "Sunset Sailing",
    description: "Golden-hour cruising with the coastline as your backdrop.",
  },
  "exp-36.jpg": {
    title: "Private Beach Days",
    description: "Anchor off a quiet stretch of sand reserved just for your group.",
  },
  "images-37.jpg": {
    title: "Onboard Relaxation",
    description: "Lounge decks and swim platforms built for slowing down.",
  },
  "exp-38.jpg": {
    title: "Fine Dining at Sea",
    description: "Chef-prepared menus served wherever the anchor drops.",
  },
  "exp-wakeboard.webp": {
    title: "Wakeboarding & Towables",
    description: "Full watersports garages for high-energy days on the water.",
  },
  "exp-dubai-tour.avif": {
    title: "Dubai Skyline Cruising",
    description: "Glide past iconic skylines on a private evening charter.",
  },
};

function toTitleCase(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "");

  return base
    .replace(/^exp-/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getExperienceCards(): ExperienceCard[] {
  const dir = path.join(process.cwd(), "public", "images", "experiences");
  const files = fs.readdirSync(dir);

  return files
    .filter((file) => IMAGE_EXTENSIONS.test(file))
    .sort()
    .map((file) => {
      const copy = EXPERIENCE_COPY[file];

      return {
        image: `/images/experiences/${file}`,
        title: copy?.title ?? toTitleCase(file),
        description:
          copy?.description ??
          "A handpicked moment from our charter experiences.",
      };
    });
}

export default function ExperiencesGalleryPage() {
  const cards = getExperienceCards();

  return (
    <>
      <PageHero
        eyebrow="Handpicked Experiences"
        title="Every Journey We Curate"
        subtitle="Water sports, island escapes, and coastal moments — a closer look at the experiences woven into our charters."
        image={cards[0]?.image ?? "/images/experiences/exp-marina.jpg"}
        alt="A handpicked Eco Yachts charter experience"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map(({ image, title, description }) => (
              <div
                key={image}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="transition-transform duration-500 group-hover:scale-105"
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

      <section className="bg-brand-900 py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Plan Your Own?
          </h2>
          <p className="max-w-lg text-brand-100/80">
            Tell us what kind of experience you&apos;re after and we&apos;ll
            build the itinerary around it.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-gold-400"
          >
            Plan Your Journey
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
