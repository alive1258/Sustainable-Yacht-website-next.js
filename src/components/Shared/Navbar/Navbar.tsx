"use client";

import React, { useEffect, useState } from "react";
import { HiMiniXMark, HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { HiOutlinePhone } from "react-icons/hi2";
import Logo from "../Logo/Logo";

interface MenuItem {
  display: string;
  href: string;
}

// TODO: replace with the clinic's real phone/WhatsApp number
const CONTACT_PHONE = "+880 1617-078964";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { display: "Home", href: "home" },
    { display: "About", href: "about" },
    { display: "Services", href: "services" },
    { display: "Blog", href: "blog" },
    { display: "FAQ", href: "faq" },
    { display: "Contact", href: "contact" },
  ];

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* smooth scroll */
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsOpen(false);
  };

  /* stop body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`fixed top-0 w-full z-50 bg-white border-b border-gray-200 transition ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="container flex items-center justify-between h-16">
          {/* LOGO */}
          <button onClick={() => handleScroll("home")}>
            <Logo variant="dark" />
          </button>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex gap-6">
            {menuItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleScroll(item.href)}
                className="text-sm font-medium text-black hover:text-[#2AA7FF] transition"
              >
                {item.display}
              </button>
            ))}
          </nav>

          {/* PHONE + CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-2 text-sm font-medium text-black hover:text-[#2AA7FF] transition"
            >
              <HiOutlinePhone size={18} className="text-[#2AA7FF]" />
              {CONTACT_PHONE}
            </a>
            <button
              onClick={() => handleScroll("appointment")}
              className="bg-[#2AA7FF] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition"
            >
              Book Appointment
            </button>
          </div>

          {/* MOBILE ICON */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-black"
          >
            <HiOutlineBars3BottomLeft size={26} />
          </button>
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
        {/* CLOSE BUTTON */}
        <div className="flex justify-between items-center p-4 border-b">
          <Logo variant="dark" size="sm" />
          <button onClick={() => setIsOpen(false)}>
            <HiMiniXMark size={26} />
          </button>
        </div>

        {/* LINKS */}
        <div className="p-6 space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleScroll(item.href)}
              className="block w-full text-left text-base font-medium text-black hover:text-[#2AA7FF] transition"
            >
              {item.display}
            </button>
          ))}

          <a
            href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`}
            className="flex items-center gap-2 text-base font-medium text-black hover:text-[#2AA7FF] transition"
          >
            <HiOutlinePhone size={18} className="text-[#2AA7FF]" />
            {CONTACT_PHONE}
          </a>

          <button
            onClick={() => handleScroll("appointment")}
            className="w-full bg-[#2AA7FF] text-white py-2 rounded-lg mt-2 font-semibold hover:opacity-90 transition"
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
