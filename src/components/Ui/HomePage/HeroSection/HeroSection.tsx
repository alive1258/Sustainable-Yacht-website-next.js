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
    <section className="bg-white pt-10 pb-16 md:pt-16 md:pb-24">
      <div className="container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-700">
            <Leaf size={13} />
            Certified Sustainable Charters
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-900 leading-[1.1]">
            Sustainable Yachts.
            <br />
            Extraordinary{" "}
            <span className="font-script text-5xl sm:text-6xl lg:text-7xl font-normal text-brand-600">
              Journeys.
            </span>
          </h1>

          <p className="mt-6 text-brand-900/70 text-base md:text-lg max-w-lg leading-relaxed">
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
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon size={18} />
                </span>
                <span className="text-xl font-bold text-brand-900">
                  {value}
                </span>
                <span className="text-xs text-brand-900/60 leading-snug">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[5/6] overflow-hidden rounded-[2rem] shadow-xl">
            <Image
              src="/images/sustainable-yacht.jpg"
              alt="Sustainable luxury yacht sailing turquoise waters"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
