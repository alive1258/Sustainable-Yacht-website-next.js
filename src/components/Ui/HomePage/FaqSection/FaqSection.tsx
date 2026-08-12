"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// TODO: confirm final policy wording (deposit %, cancellation window) with
// the business before this goes live.
const FAQS = [
  {
    question: "How far in advance should I book a charter?",
    answer:
      "Most guests book 2–6 months ahead for peak season (June–September) and 4–8 weeks ahead for shoulder season. Popular yachts and destinations fill first.",
  },
  {
    question: "What's included in the charter price?",
    answer:
      "The yacht, a professional crew, fuel for standard cruising, and onboard amenities. Provisioning, dockage fees, and fuel for extended itineraries are quoted separately.",
  },
  {
    question: "Is a deposit required to confirm a booking?",
    answer:
      "Yes — a deposit secures your dates, with the balance due before departure. Full terms are confirmed at the time of booking.",
  },
  {
    question: "How does Eco Yachts keep charters sustainable?",
    answer:
      "Hybrid and electric propulsion where available, reef-safe products onboard, zero single-use plastics, and a share of every booking funds ocean conservation partners.",
  },
  {
    question: "What's the largest group a yacht can accommodate?",
    answer:
      "Our fleet ranges from intimate 6-guest sailing yachts to 14-guest motor yachts — tell us your group size and we'll match you with the right boat.",
  },
  {
    question: "What happens if the weather turns?",
    answer:
      "Your captain monitors conditions throughout and will adjust the itinerary or anchorage for safety and comfort — guest safety always comes first.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Good to Know
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mx-auto max-w-2xl divide-y divide-brand-900/10 rounded-2xl border border-brand-900/10">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-brand-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-brand-600 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="px-6 pb-5 text-sm text-brand-900/70 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
