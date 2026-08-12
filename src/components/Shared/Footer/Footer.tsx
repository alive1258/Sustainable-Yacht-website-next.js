"use client";

import Link from "next/link";
import { MapPin, Mail, PhoneCall, ArrowUp } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { SERVICE_TITLES } from "@/src/components/Ui/HomePage/ServicesSection/ServicesSection";
import Logo from "../Logo/Logo";

/* ================= CONSTANTS ================= */
// TODO: replace with the clinic's real contact details — same placeholders
// used in Navbar / AppointmentSection / ContactSection.
const CONTACT_PHONE = "+880 1XXX-XXXXXX";
const CONTACT_EMAIL = "info@dranarulislam.com";
const CLINIC_ADDRESS =
  "Bangladesh Medical University (Ex-PG Hospital), Mirpur, Dhaka, Bangladesh";

const QUICK_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Blog", href: "/#blog" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Refund Policy", href: "/refund-policy" },
];

// TODO: swap in the clinic's real social profile URLs (same as ContactSection).
const SOCIAL_LINKS = [
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaYoutube, label: "YouTube", href: "#" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
];

/* ================= COMPONENT ================= */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0A] text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* BRAND */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <Link href="/#home" className="inline-flex">
                <Logo variant="light" size="lg" />
              </Link>
              <p className="mt-4 text-gray-400 text-sm max-w-sm leading-relaxed">
                MBBS (DU), MS Neurosurgery (Course) — general medicine and
                neurosurgical consultation built around clear communication
                and patient-first care.
              </p>
            </div>

            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={href === "#" ? (e) => e.preventDefault() : undefined}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-gray-400 hover:bg-[#2AA7FF] hover:text-white transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* LINK COLUMNS */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-200">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#2AA7FF] text-sm transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-200">
                Our Services
              </h3>
              <ul className="space-y-3">
                {SERVICE_TITLES.slice(0, 6).map((title) => (
                  <li key={title}>
                    <Link
                      href="/#services"
                      className="text-gray-400 hover:text-[#2AA7FF] text-sm transition-colors duration-300"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5 col-span-2 sm:col-span-1">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-200">
                Contact
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`}
                    className="flex items-start gap-2.5 text-gray-400 hover:text-[#2AA7FF] text-sm transition-colors duration-300"
                  >
                    <PhoneCall size={15} className="mt-0.5 shrink-0" />
                    {CONTACT_PHONE}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex items-start gap-2.5 text-gray-400 hover:text-[#2AA7FF] text-sm transition-colors duration-300"
                  >
                    <Mail size={15} className="mt-0.5 shrink-0" />
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-gray-400 text-sm">
                  <MapPin size={15} className="mt-0.5 shrink-0" />
                  {CLINIC_ADDRESS}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-400 text-center md:text-left">
            © {currentYear}{" "}
            <span className="text-[#2AA7FF]">Dr. Anarul Islam</span>. All
            rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-gray-400 hover:text-[#2AA7FF] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-[#2AA7FF] transition-all group"
          >
            Back to top
            <ArrowUp size={12} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
