import Image from "next/image";
import {
  ArrowRight,
  Play,
  Star,
  Users,
  Award,
  Stethoscope,
  Activity,
} from "lucide-react";

/* ================= CONSTANTS ================= */
const HERO = {
  badge: "MBBS (DU) • CMU (Ultrasonography) • MS Neurosurgery (Course)",
  affiliation: "Bangladesh Medical University (Ex-PG Hospital), Mirpur",
  title: {
    line2: " Dr. Anarul Islam",
  },
  specialties: [
    "Brain and Spinal Tumors",
    "Cerebrovascular Diseases",
    "Spinal Disorders",
    "Neurotrauma",
    "Epilepsy Surgery",
    "Functional Neurosurgery",
    "Minimally Invasive Neurosurgery",
  ],
  description:
    "Compassionate, personalized medical care from Dr. Anarul Islam — combining modern neurosurgical training with attentive, patient-first treatment.",
  buttons: {
    primary: "Book Appointment",
    secondary: "Watch Intro Video",
  },
  stats: [
    { icon: Award, value: "5+ Yrs", label: "In Exprience" },
    { icon: Activity, value: "5000+", label: "Surgeries" },
    { icon: Users, value: "30,000+", label: "Patients" },
  ],
  rating: {
    value: "5",
    label: "50000+ Patient Reviews",
  },
  floatingBadge: "Available for Appointments",
};

/* ================= COMPONENT ================= */
const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      {/* soft ambient wash on the right half */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-linear-to-l from-[#2AA7FF]/[0.07] to-transparent lg:block" />

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* ================= LEFT: CONTENT ================= */}
          <div>
            {/* BADGE */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-[#2AA7FF] border border-[#2AA7FF]/30 bg-[#2AA7FF]/5">
              <Stethoscope size={15} />
              {HERO.badge}
            </span>

            {/* HEADLINE */}
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.1] tracking-tight text-black text-balance">
              <span className="block text-[#2AA7FF]">{HERO.title.line2}</span>
            </h1>
            <p className="mt-3 text-base ">{HERO.affiliation}</p>

            {/* SUB-HEADLINE */}
            <p className="mt-4 text-base md:text-lg  leading-relaxed">
              {HERO.description}
            </p>

            {/* SPECIALTIES */}
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                Areas of Focus
              </p>
              <div className="flex flex-wrap gap-2">
                {HERO.specialties.map((specialty, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium text-[#2AA7FF] border border-[#2AA7FF]/30 bg-[#2AA7FF]/5 hover:bg-[#2AA7FF]/10 transition-colors"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#appointment"
                className="group inline-flex items-center gap-2 bg-[#2AA7FF] text-white px-7 py-3.5 rounded-full font-semibold shadow-[0_20px_40px_-15px_rgba(42,167,255,0.6)] hover:-translate-y-0.5 hover:shadow-[0_24px_44px_-14px_rgba(42,167,255,0.7)] transition-all duration-300"
              >
                {HERO.buttons.primary}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>

              <a
                href="#video"
                className="group inline-flex items-center gap-3 pr-6 pl-2 py-2 rounded-full font-semibold text-black bg-white border border-gray-200 hover:border-[#2AA7FF]/40 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#2AA7FF] text-white">
                  <Play size={14} fill="currentColor" />
                </span>
                {HERO.buttons.secondary}
              </a>
            </div>

            {/* TRUST STATS */}
            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
              {HERO.stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#2AA7FF]/10 text-[#2AA7FF] shrink-0">
                    <stat.icon size={20} />
                  </span>
                  <div>
                    <p className="text-2xl font-bold text-black leading-none">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT: IMAGE ================= */}
          <div className="relative flex justify-center lg:justify-end">
            {/* soft ambient glow */}
            <div className="absolute inset-0 m-auto w-104 h-104 md:w-lg md:h-128 bg-[#2AA7FF]/15 rounded-full blur-3xl" />

            {/* solid "stage" blob behind the cutout */}
            <div className="absolute top-1 right-16 w-80 h-80 md:w-104 md:h-104 lg:w-md lg:h-112 bg-[#2AA7FF]/90 rounded-[42%_58%_63%_37%/44%_46%_54%_56%]" />

            {/* decorative ring accent */}
            <div className="absolute top-0 right-16 w-24 h-24 rounded-full border-[3px] border-[#2AA7FF]/30 hidden md:block" />

            {/* decorative dotted texture */}
            <div
              className="absolute top-6 -left-6 w-32 h-32 hidden md:block"
              style={{
                backgroundImage:
                  "radial-gradient(#2AA7FF 1.5px, transparent 1.5px)",
                backgroundSize: "14px 14px",
                opacity: 0.25,
              }}
            />

            {/* grounding shadow */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 h-10 bg-black/15 rounded-full blur-2xl" />

            {/* PHOTO (transparent cutout, no frame) */}
            <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl">
              <Image
                src="/images/dr/dr-anrrul--removebg-preview.png"
                alt="Dr. Anarul Islam"
                width={631}
                height={640}
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />

              {/* FLOATING SPECIALTY BADGE */}
              {/* <div className="absolute top-6 -right-2 md:right-2 bg-white rounded-2xl shadow-lg px-4 py-2.5 flex items-center gap-2 border border-gray-100">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2AA7FF] animate-pulse" />
                <p className="text-sm font-semibold text-black">
                  {HERO.floatingBadge}
                </p>
              </div> */}

              {/* FLOATING RATING CARD */}
              <div className="absolute bottom-10 -left-4 md:left-0 bg-white rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3 border border-gray-100">
                <div className="flex items-center gap-1 text-[#2AA7FF]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" stroke="none" />
                  ))}
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div>
                  <p className="text-lg font-bold text-black leading-none">
                    {HERO.rating.value}
                  </p>
                  <p className="text-xs text-gray-500">{HERO.rating.label}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
