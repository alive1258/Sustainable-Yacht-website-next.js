import Image from "next/image";
import { ArrowRight, Droplets, HeartHandshake, Recycle, ShieldCheck, Zap } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: Zap,
    title: "Hybrid & Electric-Powered Yachts",
    description: "Low-emission propulsion across most of our fleet.",
  },
  {
    icon: Recycle,
    title: "Eco-Friendly Amenities Onboard",
    description: "Reusable materials, zero single-use plastics.",
  },
  {
    icon: HeartHandshake,
    title: "Ocean Conservation Partnerships",
    description: "A share of every booking funds reef restoration.",
  },
  {
    icon: Droplets,
    title: "Carbon-Offset Every Journey",
    description: "Every nautical mile is measured and offset.",
  },
];

const SustainabilitySection = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            A Greener Way to Sail
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900 leading-tight">
            Luxury that Cares for Our Planet
          </h2>
          <p className="mt-5 text-brand-900/70 leading-relaxed max-w-lg">
            We believe unforgettable travel shouldn&apos;t cost the earth. Every
            yacht in our fleet is chosen and maintained with sustainability at
            its core, so you can sail further without leaving a heavier
            footprint behind.
          </p>

          <ul className="mt-8 space-y-5">
            {HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="font-semibold text-brand-900">{title}</p>
                  <p className="text-sm text-brand-900/60">{description}</p>
                </div>
              </li>
            ))}
          </ul>

          <a
            href="#experiences"
            className="mt-9 inline-flex items-center gap-2 rounded-lg border-2 border-brand-600 px-6 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-600 hover:text-white"
          >
            Go Sustainable
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] sm:aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl">
            <Image
              src="/images/sustainable-yacht.jpg"
              alt="Guests relaxing onboard a sustainable charter yacht"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-6 left-6 sm:left-10 flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2.5 shadow-lg">
            <ShieldCheck size={16} className="text-white" />
            <span className="text-xs font-bold uppercase tracking-wide text-white">
              Eco Certified
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
