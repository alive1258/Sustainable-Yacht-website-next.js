"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Clock, Phone } from "lucide-react";
import Logo from "../Logo/Logo";
import MessageWidget from "../MessageWidget/MessageWidget";
import MobileBottomNav from "../MobileBottomNav/MobileBottomNav";
import MobileMenuSheet from "../MobileMenuSheet/MobileMenuSheet";
import { useAppSelector } from "@/src/redux/hooks";
import { useChatSocket } from "@/src/hooks/useChatSocket";
import { useGetMyMessagesQuery } from "@/src/redux/api/chatApi";
import { CONTACT_PHONE, MENU_ITEMS, OPEN_HOURS } from "./menuItems";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [prevPathname, setPrevPathname] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const pathname = usePathname();
  const user = useAppSelector((state) => state.auth.user);

  const { data: myMessagesRes, isLoading: isMessagesLoading } = useGetMyMessagesQuery(
    undefined,
    { skip: !user },
  );
  const chat = useChatSocket({
    enabled: Boolean(user),
    role: "customer",
    isActive: isChatOpen,
    initialMessages: myMessagesRes?.data,
  });

  /* close any open desktop dropdown / mobile drawer / chat panel whenever
   * the route changes */
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpenDropdown(null);
    setIsOpen(false);
    setIsChatOpen(false);
  }

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          className={`md:bg-transparent transition lg:border-b lg:border-brand-900/10 lg:bg-white ${
            isScrolled ? "lg:shadow-sm" : ""
          }`}
        >
          <div className="container flex items-center justify-between h-16">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="hidden lg:block"
            >
              <Logo variant="dark" />
            </Link>

            {/* DESKTOP MENU */}
            <nav className="hidden lg:flex gap-7">
              {MENU_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                if (!item.children) {
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
                }

                const isDropdownOpen = openDropdown === item.href;

                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.href)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        setOpenDropdown(null);
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      onFocus={() => setOpenDropdown(item.href)}
                      className={`flex items-center gap-1 text-sm font-medium transition ${
                        isActive
                          ? "text-brand-600"
                          : "text-brand-900 hover:text-brand-600"
                      }`}
                    >
                      {item.display}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </Link>

                    <div
                      className={`absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 transition duration-200 ${
                        isDropdownOpen
                          ? "visible opacity-100"
                          : "invisible opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden rounded-xl border border-brand-900/10 bg-white py-2 shadow-xl">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            onFocus={() => setOpenDropdown(item.href)}
                            className="block px-4 py-2.5 text-sm text-brand-900/80 transition hover:bg-brand-50 hover:text-brand-700"
                          >
                            {child.display}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              {user && (
                <Link
                  href="/my-bookings"
                  className={`text-sm font-medium transition ${
                    pathname.startsWith("/my-bookings")
                      ? "text-brand-600"
                      : "text-brand-900 hover:text-brand-600"
                  }`}
                >
                  My Booking
                </Link>
              )}
              <Link
                href="/yachts"
                className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-700 transition"
              >
                Explore Yachts
              </Link>
            </div>
          </div>
        </div>
      </header>

      <MobileMenuSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        openSubmenu={openSubmenu}
        onToggleSubmenu={(href) =>
          setOpenSubmenu((prev) => (prev === href ? null : href))
        }
      />

      {/* spacer — reserved only at lg+, where the navbar is solid white;
          on mobile the header is transparent and floats over the hero */}
      <div className="hidden lg:block lg:h-[100px]" />

      <MessageWidget
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen((prev) => !prev)}
        onClose={() => setIsChatOpen(false)}
        isLoggedIn={Boolean(user)}
        isHistoryLoading={isMessagesLoading}
        messages={chat.messages}
        connected={chat.connected}
        otherPartyTyping={chat.otherPartyTyping}
        unreadCount={chat.unreadCount}
        onSend={chat.sendMessage}
        onTyping={chat.notifyTyping}
      />
      <MobileBottomNav
        isChatOpen={isChatOpen}
        onToggleChat={() => setIsChatOpen((prev) => !prev)}
        isMenuOpen={isOpen}
        onToggleMenu={() => setIsOpen((prev) => !prev)}
        unreadChatCount={chat.unreadCount}
      />
    </>
  );
};

export default Navbar;
