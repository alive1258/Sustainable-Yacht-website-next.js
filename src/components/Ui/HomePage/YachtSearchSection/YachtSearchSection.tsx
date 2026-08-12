"use client";

import { useState } from "react";
import { Search, Users, CalendarDays, MapPin } from "lucide-react";

const DESTINATIONS = [
  "Greek Islands",
  "Maldives",
  "Phuket, Thailand",
  "The Bahamas",
];

const GUEST_OPTIONS = ["1-2 Guests", "3-4 Guests", "5-8 Guests", "9+ Guests"];

const YachtSearchSection = () => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");

  // TODO: no booking backend yet — wire this up to real yacht availability
  // search once the API is ready.
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="bg-brand-700 pt-16 pb-24 md:pt-20 md:pb-28">
      <div className="container">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-white">
          Find Your Perfect Yacht
        </h2>
        <p className="mt-3 text-center text-brand-100/80 max-w-lg mx-auto">
          Tell us where and when — we&apos;ll match you with the right boat.
        </p>

        <form
          onSubmit={handleSearch}
          className="mt-10 -mb-24 md:-mb-28 grid gap-4 rounded-2xl bg-white p-6 shadow-2xl sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_auto] lg:items-end"
        >
          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-900/60">
              <MapPin size={13} />
              Destination
            </span>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
            >
              <option value="">Select destination</option>
              {DESTINATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-900/60">
              <CalendarDays size={13} />
              Departure
            </span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-900/60">
              <Users size={13} />
              Guests
            </span>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full rounded-lg border border-brand-900/10 bg-brand-50/50 px-3 py-2.5 text-sm text-brand-900 focus:border-brand-500 focus:outline-none"
            >
              <option value="">Select guests</option>
              {GUEST_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            <Search size={16} />
            Search Yachts
          </button>
        </form>
      </div>
    </section>
  );
};

export default YachtSearchSection;
