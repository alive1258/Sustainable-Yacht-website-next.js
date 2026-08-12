import {
  Stethoscope,
  Brain,
  ScanLine,
  Siren,
  ClipboardCheck,
  Activity,
  Syringe,
  Bandage,
  Waves,
  ClipboardList,
  Video,
  FileText,
  ArrowRight,
} from "lucide-react";

/* ================= CONSTANTS ================= */
/* NOTE: services reflect Dr. Islam's actual qualifications/training
   (see project notes) rather than generic hospital-department content.
   Wording can be refined with the client before publishing. */
const SERVICES = [
  {
    icon: Stethoscope,
    title: "General Medicine",
    description:
      "Routine checkups, diagnosis, and treatment for everyday illnesses, with clear explanations at every step.",
  },
  {
    icon: Brain,
    title: "Neurosurgery Consultation",
    description:
      "Specialist evaluation and guidance for neurological concerns, informed by ongoing postgraduate neurosurgical training.",
  },
  {
    icon: ScanLine,
    title: "Ultrasonography",
    description:
      "Diagnostic ultrasound imaging (CMU-trained) to support accurate, timely diagnosis across a range of conditions.",
  },
  {
    icon: Siren,
    title: "Diagnostic & Emergency Care",
    description:
      "Prompt assessment and triage for urgent concerns, with referral pathways to advanced care when needed.",
  },
  {
    icon: ClipboardCheck,
    title: "Preventive Health Checkups",
    description:
      "Routine screening and early detection to catch common conditions before they become serious.",
  },
  {
    icon: Activity,
    title: "Chronic Disease Management",
    description:
      "Ongoing care and monitoring for long-term conditions such as diabetes and hypertension.",
  },
  {
    icon: Syringe,
    title: "Immunization & Vaccination",
    description:
      "Scheduled vaccinations and administration for patients of all ages, guided by standard protocols.",
  },
  {
    icon: Bandage,
    title: "Minor Procedures & Wound Care",
    description:
      "Outpatient management of minor injuries, wounds, and dressings in a clean, controlled setting.",
  },
  {
    icon: Waves,
    title: "Neurological Symptom Evaluation",
    description:
      "Assessment of headaches, dizziness, numbness, and other neurological symptoms before referral.",
  },
  {
    icon: ClipboardList,
    title: "Post-Operative & Follow-up Care",
    description:
      "Structured follow-up visits to track recovery and adjust treatment plans as patients progress.",
  },
  {
    icon: Video,
    title: "Telemedicine Consultation",
    description:
      "Remote video consultations for patients who are unable to visit the clinic in person.",
  },
  {
    icon: FileText,
    title: "Prescription & Medication Management",
    description:
      "Digital prescriptions with clear dosage guidance, refill tracking, and medication review.",
  },
];

// shared with AppointmentSection's "Reason for Visit" dropdown
export const SERVICE_TITLES = SERVICES.map((s) => s.title);

/* ================= COMPONENT ================= */
const ServicesSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      {/* decorative dotted texture */}
      <div
        className="absolute -top-10 -right-10 w-56 h-56 hidden lg:block"
        style={{
          backgroundImage: "radial-gradient(#2AA7FF 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
          opacity: 0.2,
        }}
      />

      <div className="container relative">
        {/* HEADER */}
        <div className="max-w-2xl">
          <span className="text-sm font-semibold tracking-wide uppercase text-[#2AA7FF]">
            Our Services
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight tracking-tight text-black">
            How Dr. Islam Can Help
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
            A focused set of services covering general medicine, diagnostics,
            and specialist neurosurgical consultation — built around clear
            communication and patient-first care.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg hover:border-[#2AA7FF]/30 transition-all duration-300"
            >
              <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#2AA7FF]/10 text-[#2AA7FF] transition-colors duration-300 group-hover:bg-[#2AA7FF] group-hover:text-white">
                <service.icon size={26} />
              </span>

              <h3 className="mt-6 text-lg font-bold text-black leading-snug">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">
                {service.description}
              </p>

              <a
                href="#appointment"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2AA7FF]"
              >
                Book Appointment
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
