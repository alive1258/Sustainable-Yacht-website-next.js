"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, MessageCircleQuestion, ArrowRight } from "lucide-react";

/* ================= CONSTANTS ================= */
/* NOTE: answers are grounded in the real details already confirmed for
   this site (see AboutSection / ServicesSection) — qualifications,
   languages, affiliation, and the services list. Wording can be refined
   with the client before publishing. */
const FAQS = [
  {
    question: "What conditions does Dr. Islam treat?",
    answer:
      "Dr. Islam sees general medicine cases of all kinds, alongside neurological symptom evaluation and specialist neurosurgery consultation — informed by his ongoing postgraduate neurosurgical training.",
  },
  {
    question: "Do I need a referral for a neurosurgery consultation?",
    answer:
      "No referral is required. You can book a consultation directly through the appointment form on this site, and Dr. Islam will advise on next steps, including any referrals if further care is needed.",
  },
  {
    question: "Does Dr. Islam offer video consultations?",
    answer:
      "Yes. Telemedicine consultations are available for patients who are unable to visit the clinic in person — the same clear, unhurried approach as an in-person visit.",
  },
  {
    question: "What should I bring to my first appointment?",
    answer:
      "Please bring any prior medical records, current medications, and referral letters you may have. This helps Dr. Islam build a complete picture of your health from the very first visit.",
  },
  {
    question: "What languages does Dr. Islam speak?",
    answer:
      "Consultations are available in Bengali and English, so you can discuss your health in whichever language you're most comfortable with.",
  },
  {
    question: "Where is the clinic located?",
    answer:
      "Dr. Islam practices through Bangladesh Medical University (Ex-PG Hospital), Mirpur. Exact visiting hours and directions are available on the Appointment section of this site.",
  },
];

/* ================= COMPONENT ================= */
const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="relative overflow-hidden bg-gray-50/60 py-20 md:py-28">
      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ================= LEFT: IMAGE ================= */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-start lg:sticky lg:top-28">
            {/* soft glow */}
            <div className="absolute inset-0 m-auto w-88 h-88 md:w-104 md:h-104 bg-[#2AA7FF]/10 rounded-full blur-3xl" />
            {/* decorative dotted texture */}
            <div
              className="absolute -top-6 -left-6 w-32 h-32 hidden md:block"
              style={{
                backgroundImage:
                  "radial-gradient(#2AA7FF 1.5px, transparent 1.5px)",
                backgroundSize: "14px 14px",
                opacity: 0.25,
              }}
            />

            <div className="relative w-full max-w-md">
              <div className="relative rounded-4xl overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src="/images/dr/Anarul-Islam.jpg"
                  alt="Dr. Anarul Islam"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* FLOATING CONTACT CARD */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-white rounded-2xl shadow-lg px-5 py-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#2AA7FF]/10 text-[#2AA7FF] shrink-0">
                    <MessageCircleQuestion size={20} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-black leading-none">
                      Still have questions?
                    </p>
                    <a
                      href="#appointment"
                      className="group mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-[#2AA7FF]"
                    >
                      Ask Dr. Islam directly
                      <ArrowRight
                        size={12}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: Q&A ================= */}
          <div className="lg:col-span-7 mt-6 lg:mt-0">
            <span className="text-sm font-semibold tracking-wide uppercase text-[#2AA7FF]">
              FAQ
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight tracking-tight text-black">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
              Answers to what patients most often ask before their first
              visit. Don&apos;t see yours here? Reach out directly.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {FAQS.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={faq.question}
                    className={`rounded-2xl border bg-white transition-colors duration-300 ${
                      isOpen
                        ? "border-[#2AA7FF]/40 shadow-sm"
                        : "border-gray-100"
                    }`}
                  >
                    <button
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span
                        className={`text-sm md:text-base font-semibold ${
                          isOpen ? "text-[#2AA7FF]" : "text-black"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-[#2AA7FF] transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
