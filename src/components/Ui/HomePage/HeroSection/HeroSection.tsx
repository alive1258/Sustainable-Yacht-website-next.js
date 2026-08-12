import Image from "next/image";
import { Award, ArrowRight, Compass, Leaf, Users } from "lucide-react";

const STATS = [
  { icon: Award, value: "20+", label: "Years of Experience" },
  { icon: Compass, value: "15+", label: "Destinations Covered" },
  { icon: Leaf, value: "40+", label: "Eco-Certified Yachts" },
  { icon: Users, value: "5K+", label: "Happy Guests" },
];

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[640px] items-center overflow-hidden py-24 md:min-h-[760px]">
      <Image
        src="/images/hero-bg.jpg"
        alt="Luxury yacht anchored in a lush tropical bay"
        fill
        priority
        sizes="100vw"
        className=""
      />
      <div className="absolute inset-0 bg-linear-to-r from-brand-900/90 via-brand-700/55 to-brand-300/10" />
      <div className="absolute inset-0 bg-linear-to-t from-brand-900/60 via-transparent to-transparent" />

      <div className="container relative">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
            <Leaf size={13} />
            Certified Sustainable Charters
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
            Sustainable Yachts.
            <br />
            Extraordinary{" "}
            <span className="font-script text-5xl sm:text-6xl lg:text-7xl font-normal text-gold-400">
              Journeys.
            </span>
          </h1>

          <p className="mt-6 text-white/80 text-base md:text-lg max-w-lg leading-relaxed">
            Charter eco-certified luxury yachts and explore the world&apos;s
            most beautiful coastlines — without compromising the oceans that
            make them beautiful.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#yacht-search"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Explore Yachts
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm">
                  <Icon size={18} />
                </span>
                <span className="text-xl font-bold text-white">{value}</span>
                <span className="text-xs text-white/70 leading-snug">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
