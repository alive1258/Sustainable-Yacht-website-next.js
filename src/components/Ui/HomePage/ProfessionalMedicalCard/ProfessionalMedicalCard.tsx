import { Clock, CalendarClock, MapPin } from "lucide-react";

/* ================= CONSTANTS ================= */
const CARDS = [
  {
    icon: Clock,
    title: "24 Hours Service",
    subtitle: "Online Appointment",
  },
  {
    icon: CalendarClock,
    title: "Timing Schedule",
    subtitle: "Working Hours",
  },
  {
    icon: MapPin,
    title: "Chamber",
    subtitle: "Pranto Specialized Hospital",
  },
];

/* ================= COMPONENT ================= */
const ProfessionalMedicalCard = () => {
  return (
    <section className="relative my-20">
      {/* <section className="relative z-10 -mt-10 md:-mt-16 pb-16 md:pb-0"> */}
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-white rounded-2xl shadow-lg border border-gray-100 px-6 py-6 hover:-translate-y-1 transition-transform duration-300"
            >
              <span className="flex items-center justify-center w-14 h-14 shrink-0 rounded-xl bg-[#2AA7FF] text-white">
                <card.icon size={24} />
              </span>
              <div>
                <p className="text-lg font-bold text-black leading-tight">
                  {card.title}
                </p>
                <p className="mt-1 text-sm text-gray-500">{card.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalMedicalCard;
