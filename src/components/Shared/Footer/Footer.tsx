"use client";

import Link from "next/link";
import { MapPin, Mail, PhoneCall, ArrowUp, ShieldCheck, Leaf } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import Logo from "../Logo/Logo";

/* ================= CONSTANTS ================= */
// TODO: replace with the charter company's real contact details — same
// placeholders used in Navbar / NewsletterSection.
const CONTACT_PHONE = "+1 (202) 555-0198";
const CONTACT_EMAIL = "hello@ecoyachts.com";
const OFFICE_ADDRESS = "14 Marina Boulevard, Athens, Greece";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Yachts", href: "/yachts" },
  { label: "Destinations", href: "/destinations" },
  { label: "Contact", href: "/contact" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Sustainability", href: "/about/sustainability" },
  { label: "Join the Team", href: "/about/careers" },
  { label: "News & Events", href: "/about/news/latest" },
  { label: "Crew Services", href: "/crew-services" },
];

const SUPPORT_LINKS = [
  { label: "Experiences", href: "/#experiences" },
  { label: "Sailing Insights", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Refund Policy", href: "/refund-policy" },
];

// TODO: swap in the charter company's real social profile URLs
const SOCIAL_LINKS = [
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaYoutube, label: "YouTube", href: "#" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
];

const CERTIFICATIONS = [
  { icon: Leaf, label: "Eco Certified Fleet" },
  { icon: ShieldCheck, label: "Verified & Insured" },
];

/* ================= COMPONENT ================= */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-900 text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* BRAND */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <Link href="/#home" className="inline-flex">
                <Logo variant="light" size="lg" />
              </Link>
              <p className="mt-4 text-brand-100/70 text-sm max-w-sm leading-relaxed">
                Eco-certified yacht charters for travelers who care about
                where they go and how they get there. Luxury that gives back
                to the seas it sails.
              </p>
            </div>

            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={href === "#" ? (e) => e.preventDefault() : undefined}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-brand-100/70 hover:bg-brand-600 hover:text-white transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {CERTIFICATIONS.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 text-xs text-brand-100/70"
                >
                  <Icon size={14} className="text-gold-400" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* LINK COLUMNS */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-8 lg:grid-cols-4">
            <div className="space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-brand-100/70 hover:text-gold-400 text-sm transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                Company
              </h3>
              <ul className="space-y-3">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-brand-100/70 hover:text-gold-400 text-sm transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                Support
              </h3>
              <ul className="space-y-3">
                {SUPPORT_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-brand-100/70 hover:text-gold-400 text-sm transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                Contact Us
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`}
                    className="flex items-start gap-2.5 text-brand-100/70 hover:text-gold-400 text-sm transition-colors duration-300"
                  >
                    <PhoneCall size={15} className="mt-0.5 shrink-0" />
                    {CONTACT_PHONE}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex items-start gap-2.5 text-brand-100/70 hover:text-gold-400 text-sm transition-colors duration-300"
                  >
                    <Mail size={15} className="mt-0.5 shrink-0" />
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-brand-100/70 text-sm">
                  <MapPin size={15} className="mt-0.5 shrink-0" />
                  {OFFICE_ADDRESS}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-brand-100/60 text-center md:text-left">
            © {currentYear} <span className="text-gold-400">Eco Yachts</span>.
            All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-brand-100/60 hover:text-gold-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-100/60 hover:text-gold-400 transition-all group"
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
