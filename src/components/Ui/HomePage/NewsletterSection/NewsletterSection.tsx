"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Send } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // TODO: no email backend yet — wire this up to a real mailing list
  // provider once one is chosen.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden bg-brand-900 py-16 md:py-20">
      <div className="absolute inset-0 opacity-25">
        <Image
          src="/images/yachts/yacht-sharlou.jpg"
          alt=""
          fill
          className=""
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/95 to-brand-900/70" />

      <div className="container relative">
        <div className="max-w-xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Stay Inspired, Sail Responsibly
          </h2>
          <p className="mt-4 text-brand-100/70">
            Join our list for new destinations, seasonal charters, and
            sustainability updates from the fleet.
          </p>

          {submitted ? (
            <div className="mt-8 flex items-center gap-2 text-brand-100">
              <CheckCircle2 size={18} className="text-brand-300" />
              <span className="text-sm font-medium">
                You&apos;re subscribed — welcome aboard.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-brand-100/50 focus:border-brand-300 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-gold-400"
              >
                Subscribe
                <Send size={15} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
