import { Gem, Heart, Leaf, ShieldCheck } from "lucide-react";

const VALUES = [
  {
    icon: Leaf,
    title: "Sustainable",
    description: "Low-impact fleet, offset every mile.",
  },
  {
    icon: Gem,
    title: "Exclusive",
    description: "Private charters, tailored itineraries.",
  },
  {
    icon: Heart,
    title: "Memorable",
    description: "Curated moments guests talk about for years.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible",
    description: "Certified crews, transparent practices.",
  },
];

const PromiseSection = () => {
  return (
    <section className="bg-brand-900 py-16 md:py-24">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-300">
            Our Commitment
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white leading-tight">
            More Than a Journey,
            <br />
            It&apos;s a Promise
          </h2>
          <p className="mt-5 text-brand-100/70 leading-relaxed max-w-md">
            Every charter we plan is built on four commitments — to the guest
            on board, and to the ocean beneath the hull.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {VALUES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 font-bold text-white">{title}</h3>
              <p className="mt-1.5 text-sm text-brand-100/60 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromiseSection;
