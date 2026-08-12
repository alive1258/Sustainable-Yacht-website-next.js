import Image from "next/image";
import {
  GraduationCap,
  Briefcase,
  Languages,
  MapPin,
  Award,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

/* ================= CONSTANTS ================= */
/* NOTE: qualifications/affiliation reflect real details provided by the
   client. Experience, languages and awards are best-effort placeholders —
   confirm exact wording/registration numbers with the doctor before
   publishing. */
const ABOUT = {
  eyebrow: "About The Doctor",
  name: "Dr. Anarul Islam",
  title: "MBBS (DU), MS Neurosurgery (Course)",
  specialty: "Neurosurgery & General Medicine",
  bio: [
    "Dr. Anarul Islam is a physician trained at Dhaka University (MBBS), with additional training in ultrasonography (CMU) and ongoing postgraduate studies in Neurosurgery (MS Course) at Bangladesh Medical University, Ex-PG Hospital, Mirpur.",
    "His approach to medicine centers on clear communication and patient-first care — taking the time to listen, explain diagnoses in plain language, and design treatment plans around each patient's real circumstances rather than a one-size-fits-all protocol.",
    "Alongside clinical practice, Dr. Islam is committed to staying current with modern neurosurgical and general-medicine techniques, and to making specialist-level care approachable for every patient who walks through the door.",
  ],
  info: [
    {
      icon: GraduationCap,
      label: "Qualifications",
      value: "MBBS (DU), CMU, MS Neurosurgery (Course)",
    },
    {
      icon: Briefcase,
      label: "Experience",
      value: "5+ Years in Clinical Practice",
    },
    {
      icon: Languages,
      label: "Languages Spoken",
      value: "Bengali, English",
    },
    {
      icon: MapPin,
      label: "Affiliation",
      value: "Bangladesh Medical University (Ex-PG Hospital), Mirpur",
    },
  ],
  registration: "BMDC Reg. No. — [add registration number]",
};

/* ================= COMPONENT ================= */
const AboutSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ================= LEFT: PHOTO ================= */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-start">
            {/* soft glow */}
            <div className="absolute inset-0 m-auto w-88 h-88 md:w-104 md:h-104 lg:w-120 lg:h-120 bg-[#2AA7FF]/10 rounded-full blur-3xl" />
            {/* decorative dotted texture */}
            <div
              className="absolute -bottom-6 -right-6 w-36 h-36 hidden md:block"
              style={{
                backgroundImage:
                  "radial-gradient(#2AA7FF 1.5px, transparent 1.5px)",
                backgroundSize: "14px 14px",
                opacity: 0.25,
              }}
            />

            <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl">
              <div className="relative rounded-4xl overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src="/images/dr/Anarul-Islam.jpg"
                  alt="Dr. Anarul Islam"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* FLOATING CREDENTIAL CARD */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-white rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3 border border-gray-100">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#2AA7FF]/10 text-[#2AA7FF] shrink-0">
                  <BadgeCheck size={20} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-black leading-none">
                    {ABOUT.title}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {ABOUT.specialty}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: CONTENT ================= */}
          <div className="lg:col-span-7 mt-8 lg:mt-0">
            <span className="text-sm font-semibold tracking-wide uppercase text-[#2AA7FF]">
              {ABOUT.eyebrow}
            </span>

            <h2 className="mt-3 text-3xl md:text-4xl lg:text-[44px] font-bold leading-tight tracking-tight text-black">
              {ABOUT.name}
            </h2>
            <p className="mt-2 text-base md:text-lg text-gray-500">
              {ABOUT.title}
            </p>

            <span className="mt-5 inline-block px-4 py-1.5 rounded-full text-sm font-medium text-[#2AA7FF] border border-[#2AA7FF]/30 bg-[#2AA7FF]/5">
              {ABOUT.specialty}
            </span>

            {/* BIO */}
            <div className="mt-6 space-y-4">
              {ABOUT.bio.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base text-gray-600 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* INFO GRID */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {ABOUT.info.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50/60 p-4"
                >
                  <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#2AA7FF]/10 text-[#2AA7FF] shrink-0">
                    <item.icon size={20} />
                  </span>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-black">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* REGISTRATION + AWARDS NOTE */}
            <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
              <Award size={16} className="text-[#2AA7FF]" />
              <span>{ABOUT.registration}</span>
            </div>

            {/* CTA */}
            <a
              href="#appointment"
              className="group mt-8 inline-flex items-center gap-2 font-semibold text-[#2AA7FF]"
            >
              Book an Appointment
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
