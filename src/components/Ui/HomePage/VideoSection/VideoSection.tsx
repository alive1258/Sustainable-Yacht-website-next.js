"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

/* ================= CONSTANTS ================= */
/* NOTE: no real video files have been supplied by the client yet.
   `src` is left empty (TODO) so the player renders correctly with the
   poster image but won't actually play until real video URLs/files are
   provided — same placeholder pattern used elsewhere in this codebase. */
const VIDEOS = [
  {
    title: "Meet Dr. Anarul Islam",
    description:
      "A short introduction to Dr. Islam and his approach to patient care.",
    poster: "/images/dr/Anarul-Islam.jpg",
    src: "", // TODO: add intro video file/URL
  },
  {
    title: "Our Care Philosophy",
    description:
      "Why clear communication and patient-first care guide every consultation.",
    poster: "/images/dr/Anarul-Islam.jpg",
    src: "", // TODO: add video file/URL
  },
  {
    title: "Inside a Consultation",
    description:
      "What to expect during a general medicine or neurosurgery consultation.",
    poster: "/images/dr/Anarul-Islam.jpg",
    src: "", // TODO: add video file/URL
  },
  {
    title: "Ultrasonography & Diagnostics",
    description:
      "A look at how diagnostic imaging supports accurate, timely care.",
    poster: "/images/dr/Anarul-Islam.jpg",
    src: "", // TODO: add video file/URL
  },
];

/* ================= COMPONENT ================= */
const VideoSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const active = VIDEOS[activeIndex];

  const goTo = (index: number) => {
    videoRef.current?.pause();
    setIsPlaying(false);
    setActiveIndex((index + VIDEOS.length) % VIDEOS.length);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="container relative">
        {/* HEADER */}
        <div className="max-w-2xl">
          <span className="text-sm font-semibold tracking-wide uppercase text-[#2AA7FF]">
            Video Intro
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight tracking-tight text-black">
            Get to Know Dr. Islam
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
            A closer look at Dr. Islam&apos;s practice, in his own words —
            browse through the clips below.
          </p>
        </div>

        {/* PLAYER */}
        <div className="mt-14 relative rounded-3xl overflow-hidden border border-gray-100 shadow-xl bg-black">
          <div className="relative aspect-video">
            <video
              key={activeIndex}
              ref={videoRef}
              poster={active.poster}
              src={active.src || undefined}
              controls={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* gradient overlay + big play button, hidden once playing */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  aria-label="Play video"
                  className="flex items-center justify-center w-20 h-20 rounded-full bg-white/90 backdrop-blur text-[#2AA7FF] shadow-lg hover:bg-[#2AA7FF] hover:text-white hover:scale-105 transition-all duration-300"
                >
                  <Play size={30} className="ml-1" fill="currentColor" />
                </button>
              </div>
            )}

            {/* title overlay */}
            {!isPlaying && (
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#2AA7FF]">
                  {activeIndex + 1} / {VIDEOS.length}
                </p>
                <h3 className="mt-1 text-lg md:text-xl font-bold text-white">
                  {active.title}
                </h3>
                <p className="mt-1 text-sm text-white/80 max-w-lg">
                  {active.description}
                </p>
              </div>
            )}

            {/* pause button once playing */}
            {isPlaying && (
              <button
                onClick={togglePlay}
                aria-label="Pause video"
                className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
              >
                <Pause size={16} fill="currentColor" />
              </button>
            )}

            {/* prev / next arrows */}
            <button
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous video"
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white/90 text-black shadow-md hover:bg-[#2AA7FF] hover:text-white transition-colors"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next video"
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white/90 text-black shadow-md hover:bg-[#2AA7FF] hover:text-white transition-colors"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* THUMBNAIL STRIP */}
        <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
          {VIDEOS.map((video, i) => (
            <button
              key={video.title}
              onClick={() => goTo(i)}
              className={`group shrink-0 w-48 text-left rounded-xl overflow-hidden border-2 transition-colors ${
                i === activeIndex
                  ? "border-[#2AA7FF]"
                  : "border-transparent hover:border-gray-200"
              }`}
            >
              <div className="relative aspect-video bg-gray-100">
                <Image
                  src={video.poster}
                  alt={video.title}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/90 text-[#2AA7FF]">
                    <Play size={14} className="ml-0.5" fill="currentColor" />
                  </span>
                </div>
              </div>
              <p
                className={`mt-2 text-sm font-medium truncate ${
                  i === activeIndex ? "text-[#2AA7FF]" : "text-black"
                }`}
              >
                {video.title}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
