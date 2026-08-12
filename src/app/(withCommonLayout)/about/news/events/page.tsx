import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Ship } from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";

export const metadata: Metadata = {
  title: "Events & Boat Shows",
  description:
    "Where to find the Eco Yachts fleet in person — upcoming boat shows, charter previews, and industry events.",
};

// TODO: keep in sync with actual fleet scheduling each season
const EVENTS = [
  {
    name: "Cannes Yachting Festival",
    dateRange: "September 8 – 13, 2026",
    location: "Vieux Port & Port Canto, Cannes, France",
    description:
      "Eco Serenity will be open for private charter previews throughout the festival — book a viewing slot in advance.",
    yacht: "Eco Serenity",
  },
  {
    name: "Monaco Yacht Show",
    dateRange: "September 23 – 26, 2026",
    location: "Port Hercules, Monaco",
    description:
      "Eco Voyager and Eco Sharlou will be at anchor for guided walkthroughs with our Mediterranean charter desk.",
    yacht: "Eco Voyager & Eco Sharlou",
  },
  {
    name: "Fort Lauderdale International Boat Show",
    dateRange: "October 28 – November 1, 2026",
    location: "Bahia Mar & Las Olas Marina, Fort Lauderdale, USA",
    description:
      "Our Americas & Caribbean team will be on-site for charter consultations ahead of the winter season.",
    yacht: "Eco Riva",
  },
  {
    name: "Dubai International Boat Show",
    dateRange: "March 3 – 7, 2027",
    location: "Dubai Harbour, UAE",
    description:
      "A first regional showcase for our Middle East fleet, alongside our Dubai charter desk team.",
    yacht: "Eco Ocean 90",
  },
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="News & Events"
        title="Events & Boat Shows"
        subtitle="Meet the fleet and our charter team in person at the shows and previews below."
        image="/images/experiences/exp-38.jpg"
        alt="Eco Yachts at a marina event"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <div className="space-y-6">
            {EVENTS.map((event) => (
              <div
                key={event.name}
                className="flex flex-col gap-4 rounded-2xl border border-brand-900/10 p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-brand-900">
                    {event.name}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-brand-900/60">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={14} className="text-gold-500" />
                      {event.dateRange}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-gold-500" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Ship size={14} className="text-gold-500" />
                      {event.yacht}
                    </span>
                  </div>
                  <p className="mt-3 max-w-2xl text-sm text-brand-900/70 leading-relaxed">
                    {event.description}
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-brand-900/15 px-5 py-2.5 text-sm font-semibold text-brand-900 transition hover:bg-brand-50"
                >
                  Request a Viewing
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-900 py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Can&apos;t Make an Event?
          </h2>
          <p className="max-w-lg text-brand-100/80">
            We can arrange a private walkthrough or video tour of any yacht
            in the fleet.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-gold-400"
          >
            Arrange a Tour
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
