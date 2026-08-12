"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMiniXMark, HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { Clock, Phone, Search } from "lucide-react";
import Logo from "../Logo/Logo";

interface MenuItem {
  display: string;
  href: string;
}

// TODO: replace with the charter company's real phone number/hours
const CONTACT_PHONE = "+1 (202) 555-0198";
const OPEN_HOURS = "Mon - Sat, 9am - 6pm";

const MENU_ITEMS: MenuItem[] = [
  { display: "Home", href: "/" },
  { display: "Yachts", href: "/yachts" },
  { display: "Destinations", href: "/destinations" },
  { display: "Contact", href: "/contact" },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scroll to the yacht search widget when already on the home page */
  const handleSearchClick = () => {
    if (pathname === "/") {
      document
        .getElementById("yacht-search")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  /* stop body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 w-full z-50">
        {/* TOP UTILITY BAR */}
        <div className="hidden lg:block bg-brand-900 text-white/80">
          <div className="container flex items-center justify-between h-9 text-xs">
            <div className="flex items-center gap-6">
              <a
                href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`}
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Phone size={13} className="text-brand-300" />
                {CONTACT_PHONE}
              </a>
              <span className="flex items-center gap-2">
                <Clock size={13} className="text-brand-300" />
                {OPEN_HOURS}
              </span>
            </div>
            <Link
              href="/contact"
              className="bg-gold-500 text-brand-900 px-3.5 py-1 rounded-full text-xs font-semibold hover:bg-gold-400 transition"
            >
              Book Now
            </Link>
          </div>
        </div>

        {/* MAIN NAVBAR */}
        <div
          className={`bg-white border-b border-brand-900/10 transition ${
            isScrolled ? "shadow-sm" : ""
          }`}
        >
          <div className="container flex items-center justify-between h-16">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Logo variant="dark" />
            </Link>

            {/* DESKTOP MENU */}
            <nav className="hidden lg:flex gap-7">
              {MENU_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition ${
                      isActive
                        ? "text-brand-600"
                        : "text-brand-900 hover:text-brand-600"
                    }`}
                  >
                    {item.display}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={handleSearchClick}
                aria-label="Search yachts"
                className="flex items-center justify-center w-9 h-9 rounded-full text-brand-900 hover:bg-brand-50 transition"
              >
                <Search size={18} />
              </button>
              <Link
                href="/yachts"
                className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-700 transition"
              >
                Explore Yachts
              </Link>
            </div>

            {/* MOBILE ICON */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden text-brand-900"
            >
              <HiOutlineBars3BottomLeft size={26} />
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <Logo variant="dark" size="sm" />
          <button onClick={() => setIsOpen(false)}>
            <HiMiniXMark size={26} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block w-full text-left text-base font-medium text-brand-900 hover:text-brand-600 transition"
            >
              {item.display}
            </Link>
          ))}

          <a
            href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`}
            className="flex items-center gap-2 text-base font-medium text-brand-900 hover:text-brand-600 transition"
          >
            <Phone size={16} className="text-brand-600" />
            {CONTACT_PHONE}
          </a>

          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center bg-gold-500 text-brand-900 py-2 rounded-lg mt-2 font-semibold hover:bg-gold-400 transition"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* spacer (top bar + main nav on desktop, main nav only on mobile) */}
      <div className="h-16 lg:h-[100px]" />
    </>
  );
};

export default Navbar;
