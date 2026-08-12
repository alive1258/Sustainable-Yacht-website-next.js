"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

/* ================= CONSTANTS ================= */
/* NOTE: no real clinic photography has been supplied by the client yet —
   every tile reuses the doctor's portrait as a placeholder (same pattern
   as BlogSection's article covers) so the bento layout can be previewed.
   Swap `image` for real clinic/procedure photos once available. */
const GALLERY = [
  {
    title: "Consultation Room",
    image: "/images/dr/Anarul-Islam.jpg",
    size: "large" as const,
  },
  {
    title: "Diagnostic Equipment",
    image: "/images/dr/Anarul-Islam.jpg",
    size: "normal" as const,
  },
  {
    title: "Reception & Waiting Area",
    image: "/images/dr/Anarul-Islam.jpg",
    size: "normal" as const,
  },
  {
    title: "Dr. Islam at Work",
    image: "/images/dr/Anarul-Islam.jpg",
    size: "normal" as const,
  },
  {
    title: "Ultrasonography Suite",
    image: "/images/dr/Anarul-Islam.jpg",
    size: "normal" as const,
  },
  {
    title: "Clinic Entrance",
    image: "/images/dr/Anarul-Islam.jpg",
    size: "wide" as const,
  },
  {
    title: "Follow-up Consultation",
    image: "/images/dr/Anarul-Islam.jpg",
    size: "normal" as const,
  },
  {
    title: "Patient Care in Practice",
    image: "/images/dr/Anarul-Islam.jpg",
    size: "normal" as const,
  },
];

const SIZE_CLASSES: Record<(typeof GALLERY)[number]["size"], string> = {
  large: "col-span-2 row-span-2",
  wide: "col-span-2 row-span-1",
  normal: "col-span-1 row-span-1",
};

/* ================= COMPONENT ================= */
const GallerySection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;

  const close = () => setActiveIndex(null);
  const showPrev = () =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + GALLERY.length) % GALLERY.length));
  const showNext = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % GALLERY.length));

  // keyboard nav for the lightbox
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const active = activeIndex !== null ? GALLERY[activeIndex] : null;

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="container relative">
        {/* HEADER */}
        <div className="max-w-2xl">
          <span className="text-sm font-semibold tracking-wide uppercase text-[#2AA7FF]">
            Gallery
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight tracking-tight text-black">
            Inside the Clinic
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
            A look at the space, equipment, and everyday moments of patient
            care.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[140px] sm:auto-rows-[160px] lg:auto-rows-[200px] gap-4 grid-flow-dense">
          {GALLERY.map((item, i) => (
            <button
              key={item.title}
              onClick={() => setActiveIndex(i)}
              className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-100 text-left ${SIZE_CLASSES[item.size]}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

              <span className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-[#2AA7FF] opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
                <Maximize2 size={15} />
              </span>

              <p className="absolute bottom-3 left-4 right-4 text-sm font-semibold text-white">
                {item.title}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {isOpen && active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close gallery"
            className="absolute top-5 right-5 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
          >
            <X size={20} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous image"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
          >
            <ChevronRight size={22} />
          </button>

          <div
            className="relative w-full max-w-3xl aspect-[4/3] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.image}
              alt={active.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium text-white/90">
            {active.title} — {activeIndex! + 1} / {GALLERY.length}
          </p>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
