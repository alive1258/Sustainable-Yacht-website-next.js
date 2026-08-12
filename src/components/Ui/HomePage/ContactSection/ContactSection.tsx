"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  MapPin,
  Clock,
  Mail,
  PhoneCall,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

/* ================= TYPES ================= */
interface ContactForm {
  name: string;
  email: string;
  message: string;
}

/* ================= CONSTANTS ================= */
// TODO: replace with the clinic's real phone/WhatsApp number (same
// placeholder used in Navbar / AppointmentSection).
const CONTACT_PHONE = "+880 1XXX-XXXXXX";
// TODO: replace with the clinic's real email address.
const CONTACT_EMAIL = "info@dranarulislam.com";
// TODO: confirm the exact street address with the client — this reuses
// the affiliation already confirmed in AboutSection so the map points at
// a real area rather than a fabricated location.
const CLINIC_ADDRESS =
  "Bangladesh Medical University (Ex-PG Hospital), Mirpur, Dhaka, Bangladesh";

const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  CLINIC_ADDRESS
)}&output=embed`;

// Same Mon–Sat 10AM–1PM & 5PM–8PM / Sunday-closed hours used in
// AppointmentSection, broken out day-by-day.
const WORKING_HOURS = [
  { day: "Sunday", hours: "Closed" },
  { day: "Monday", hours: "10 AM – 1 PM & 5 PM – 8 PM" },
  { day: "Tuesday", hours: "10 AM – 1 PM & 5 PM – 8 PM" },
  { day: "Wednesday", hours: "10 AM – 1 PM & 5 PM – 8 PM" },
  { day: "Thursday", hours: "10 AM – 1 PM & 5 PM – 8 PM" },
  { day: "Friday", hours: "10 AM – 1 PM & 5 PM – 8 PM" },
  { day: "Saturday", hours: "10 AM – 1 PM & 5 PM – 8 PM" },
];

// TODO: swap in the clinic's real social profile URLs.
const SOCIAL_LINKS = [
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaYoutube, label: "YouTube", href: "#" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
];

const whatsappHref = `https://wa.me/${CONTACT_PHONE.replace(/[^\d]/g, "")}`;
const telHref = `tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`;

/* ================= COMPONENT ================= */
const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>();

  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });

  // No backend yet — simulates the submit flow, same pattern as
  // AppointmentSection. Wire up real email/DB dispatch via an API route.
  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 700));
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    reset();
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="container relative">
        {/* HEADER */}
        <div className="max-w-2xl">
          <span className="text-sm font-semibold tracking-wide uppercase text-[#2AA7FF]">
            Contact &amp; Location
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight tracking-tight text-black">
            Get In Touch
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
            Reach out by phone, WhatsApp, or the form below — or stop by
            during clinic hours.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ================= LEFT: LOCATION & CHANNELS ================= */}
          <div className="lg:col-span-5 space-y-6">
            {/* MAP + ADDRESS */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="relative aspect-[4/3]">
                <iframe
                  src={MAP_EMBED_SRC}
                  title="Clinic location map"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
              <div className="flex items-start gap-3 p-5">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#2AA7FF]/10 text-[#2AA7FF] shrink-0">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-black">
                    Clinic Address
                  </p>
                  <p className="mt-0.5 text-sm text-gray-600 leading-relaxed">
                    {CLINIC_ADDRESS}
                  </p>
                </div>
              </div>
            </div>

            {/* WORKING HOURS */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#2AA7FF]/10 text-[#2AA7FF] shrink-0">
                  <Clock size={18} />
                </span>
                <p className="text-sm font-semibold text-black">
                  Working Hours
                </p>
              </div>
              <div className="mt-4 divide-y divide-gray-100">
                {WORKING_HOURS.map(({ day, hours }) => (
                  <div
                    key={day}
                    className={`flex items-center justify-between py-2.5 text-sm ${
                      day === todayName ? "text-[#2AA7FF]" : "text-gray-600"
                    }`}
                  >
                    <span className={day === todayName ? "font-semibold" : "font-medium text-black"}>
                      {day}
                      {day === todayName && (
                        <span className="ml-2 text-xs font-normal text-[#2AA7FF]">
                          (Today)
                        </span>
                      )}
                    </span>
                    <span className="font-medium">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTACT CHANNELS */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-black">
                Contact Channels
              </p>
              <div className="mt-4 space-y-3">
                <a
                  href={telHref}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3 hover:border-[#2AA7FF]/40 transition"
                >
                  <PhoneCall size={17} className="text-[#2AA7FF]" />
                  <span className="text-sm font-medium text-black">
                    {CONTACT_PHONE}
                  </span>
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3 hover:border-[#2AA7FF]/40 transition"
                >
                  <Mail size={17} className="text-[#2AA7FF]" />
                  <span className="text-sm font-medium text-black">
                    {CONTACT_EMAIL}
                  </span>
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3 hover:border-[#2AA7FF]/40 transition"
                >
                  <FaWhatsapp size={17} className="text-[#2AA7FF]" />
                  <span className="text-sm font-medium text-black">
                    Chat on WhatsApp
                  </span>
                </a>
              </div>

              {/* SOCIAL LINKS */}
              <div className="mt-5 flex items-center gap-3 pt-5 border-t border-gray-100">
                {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={href === "#" ? (e) => e.preventDefault() : undefined}
                    aria-label={label}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-[#2AA7FF]/10 text-[#2AA7FF] hover:bg-[#2AA7FF] hover:text-white transition-colors"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT: CONTACT FORM ================= */}
          <div className="lg:col-span-7 rounded-3xl border border-gray-100 bg-white shadow-lg p-6 md:p-10">
            {submitted ? (
              <div className="text-center max-w-md mx-auto py-10">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2AA7FF]/10 text-[#2AA7FF]">
                  <CheckCircle2 size={32} />
                </span>
                <h3 className="mt-5 text-2xl font-bold text-black">
                  Message Sent
                </h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  Thanks for reaching out — we&apos;ll get back to you by
                  email or phone shortly.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl border border-[#2AA7FF] text-[#2AA7FF] font-semibold px-6 py-3 hover:bg-[#2AA7FF]/5 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-5"
              >
                <h3 className="text-base font-bold text-black">
                  Send a Message
                </h3>

                <div>
                  <label className="block text-sm font-medium text-black mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    {...register("name", {
                      required: "Name is required",
                    })}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2AA7FF]/40 focus:border-[#2AA7FF]"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2AA7FF]/40 focus:border-[#2AA7FF]"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    maxLength={800}
                    placeholder="How can we help?"
                    {...register("message", {
                      required: "Please write a short message",
                    })}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2AA7FF]/40 focus:border-[#2AA7FF] resize-none"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#2AA7FF] text-white font-semibold px-8 py-3.5 hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
