import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import type { ApiResponse } from "@/src/types/axios";
import type { HeroItem } from "@/src/types/heroType";
import { getHeroIcon } from "@/src/utils/heroIcons";

const FALLBACK_STATS = [
  { icon: "Award", value: "20+", label: "Years of Experience" },
  { icon: "Compass", value: "15+", label: "Destinations Covered" },
  { icon: "Leaf", value: "40+", label: "Eco-Certified Yachts" },
  { icon: "Users", value: "5K+", label: "Happy Guests" },
];

const FALLBACK_IMAGE = "/images/banner/banner1.webp";

async function getActiveHero(): Promise<HeroItem | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hero/active`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const body: ApiResponse<HeroItem> = await res.json();
    return body.data ?? null;
  } catch {
    return null;
  }
}

const HeroSection = async () => {
  const hero = await getActiveHero();

  const badge = hero?.badge || "Certified Sustainable Charters";
  const title = hero?.title || "Sustainable Yachts.";
  const highlight = hero?.affiliation || "Extraordinary Journeys.";
  const description =
    hero?.description ||
    "Charter eco-certified luxury yachts and explore the world's most beautiful coastlines — without compromising the oceans that make them beautiful.";
  const primaryButtonText = hero?.primary_button_text || "Explore Yachts";
  const primaryButtonLink = hero?.primary_button_link || "/yachts";
  const image = hero?.image || FALLBACK_IMAGE;
  const stats =
    hero?.stats && hero.stats.length > 0 ? hero.stats : FALLBACK_STATS;

  return (
    <section className="relative flex min-h-[640px] items-center overflow-hidden py-10 md:py-24 md:min-h-[760px]">
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className=""
      />
      <div className="absolute inset-0 bg-linear-to-r from-[#6AB3FA]/20 via-[#6AB3FA]/20 to-[#6AB3FA]/20" />
      <div className="absolute inset-0 bg-linear-to-t from-[#6AB3FA]/30 via-transparent to-transparent" />

      <div className="container relative">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
            <Leaf size={13} />
            {badge}
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
            {title}
            <br />
            <span className="font-script text-5xl sm:text-6xl lg:text-7xl font-normal text-gold-400">
              {highlight}
            </span>
          </h1>

          <p className="mt-6 text-white/80 text-base md:text-lg max-w-lg leading-relaxed">
            {description}
          </p>

          <div className="mt-8 w-full flex md:flex-wrap items-center gap-4">
            <Link
              href={primaryButtonLink}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 sm:w-auto"
            >
              {primaryButtonText}
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl">
            {stats.map(({ icon, value, label }) => {
              const Icon = getHeroIcon(icon);
              return (
                <div key={label} className="flex flex-col gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm">
                    <Icon size={18} />
                  </span>
                  <span className="text-xl font-bold text-white">{value}</span>
                  <span className="text-xs text-white/70 leading-snug">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
