export interface MenuItem {
  display: string;
  href: string;
  children?: MenuItem[];
}

export const MENU_ITEMS: MenuItem[] = [
  { display: "Home", href: "/" },
  { display: "Yachts", href: "/yachts" },
  { display: "Destinations", href: "/destinations" },
  {
    display: "About",
    href: "/about",
    children: [
      { display: "Offices & People", href: "/about/offices-people" },
      { display: "Future & Sustainability", href: "/about/sustainability" },
      { display: "Join the Team", href: "/about/careers" },
      { display: "Partners", href: "/about/partners" },
      { display: "Latest News", href: "/about/news/latest" },
      { display: "Events & Boat Shows", href: "/about/news/events" },
      { display: "Luxury Charter Portfolio", href: "/about/portfolio" },
    ],
  },
  {
    display: "Crew Services",
    href: "/crew-services",
    children: [
      { display: "Crew Recruitment", href: "/crew-services/recruitment" },
      { display: "Crew Training", href: "/crew-services/training" },
      { display: "Crew Management", href: "/crew-services/management" },
      {
        display: "Contact a Crew Specialist",
        href: "/crew-services/contact-specialist",
      },
    ],
  },
  { display: "Contact", href: "/contact" },
];

// TODO: replace with the charter company's real phone number/hours
export const CONTACT_PHONE = "+1 (202) 555-0198";
export const OPEN_HOURS = "Mon - Sat, 9am - 6pm";
