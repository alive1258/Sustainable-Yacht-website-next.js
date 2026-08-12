"use client";

import { useState } from "react";
import { Quote, Star, User } from "lucide-react";

// TODO: replace with real guest testimonials once collected
const TESTIMONIALS = [
  {
    name: "Jameela Baptie",
    location: "Guest, Greek Islands Charter",
    quote:
      "Eco Yachts turned our anniversary trip into something we'll talk about forever — and knowing the crew ran everything sustainably made it even better.",
    rating: 5,
  },
  {
    name: "Marcus Lindqvist",
    location: "Guest, Maldives Charter",
    quote:
      "Every detail felt considered, from the hybrid engines to the reef-safe products onboard. Genuinely the most thoughtful charter we've booked.",
    rating: 5,
  },
  {
    name: "Aiko Tanaka",
    location: "Guest, Phuket Charter",
    quote:
      "The crew's knowledge of the local marine life made every stop feel meaningful, not just scenic. We'll be back next season.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  const testimonial = TESTIMONIALS[active];

  return (
    <section className="bg-brand-50/50 py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Guest Stories
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
            Trusted by Travelers, Loved for Our Promise
          </h2>
        </div>

        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 sm:p-10 shadow-sm text-center">
          <Quote size={32} className="mx-auto text-brand-200" />

          <p className="mt-6 text-lg text-brand-900/80 leading-relaxed">
            &ldquo;{testimonial.quote}&rdquo;
          </p>

          <div className="mt-6 flex justify-center gap-1 text-gold-500">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-600">
              <User size={18} />
            </span>
            <div className="text-left">
              <p className="font-bold text-brand-900 text-sm">
                {testimonial.name}
              </p>
              <p className="text-xs text-brand-900/50">
                {testimonial.location}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setActive(i)}
              aria-label={`Show testimonial from ${t.name}`}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-brand-600" : "w-2 bg-brand-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
