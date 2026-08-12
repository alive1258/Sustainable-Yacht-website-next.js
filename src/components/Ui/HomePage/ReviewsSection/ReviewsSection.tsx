"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Star, Play, Pause, Quote, ArrowRight } from "lucide-react";

/* ================= CONSTANTS ================= */
/* NOTE: placeholder reviews for layout/preview purposes — no real patient
   testimonials, consent forms, or video files have been supplied by the
   client yet. Video `src` fields are left empty (TODO) so players render
   correctly but won't actually play, patient photos default to a generic
   avatar/initial (no consented photos on file), and "See All Reviews" is
   inert (no /reviews route yet). Wire everything up once real reviews +
   signed consent + video files + the route exist. Same placeholder
   pattern used in BlogSection / VideoSection. */
const RATING_SUMMARY = { average: 4.9, totalReviews: 180 };

const DOCTOR_VIDEO = {
  title: "A Message From Dr. Anarul Islam",
  description:
    "A short personal note on what to expect from every consultation, in his own words.",
  poster: "/images/dr/Anarul-Islam.jpg",
  src: "", // TODO: add doctor greeting video file/URL
};

const TEXT_REVIEWS = [
  {
    name: "Rahim",
    photo: null,
    rating: 5,
    quote:
      "Dr. Islam listened patiently and explained my test results in a way I could actually understand. Highly recommend.",
    date: "Jan 18, 2026",
  },
  {
    name: "Nasrin",
    photo: "/images/Avatar.png",
    rating: 5,
    quote:
      "The whole visit felt unhurried. I never felt like just another patient in line.",
    date: "Jan 25, 2026",
  },
  {
    name: "Farid",
    photo: null,
    rating: 4,
    quote:
      "Very knowledgeable and straightforward. Wait time was a little long but worth it.",
    date: "Feb 3, 2026",
  },
  {
    name: "Sultana",
    photo: "/images/Avatar.png",
    rating: 5,
    quote:
      "My father's headaches finally have a clear diagnosis after years of guessing. Grateful for the thorough workup.",
    date: "Feb 10, 2026",
  },
  {
    name: "Kamal",
    photo: null,
    rating: 5,
    quote:
      "Clear follow-up instructions, and he actually called to check in after my procedure.",
    date: "Feb 22, 2026",
  },
  {
    name: "Ayesha",
    photo: "/images/Avatar.png",
    rating: 4,
    quote:
      "Professional staff and a doctor who takes the time to answer every question.",
    date: "Mar 1, 2026",
  },
];

const VIDEO_REVIEWS = [
  {
    name: "Jasim",
    photo: null,
    rating: 5,
    quote: "He caught something two other doctors missed.",
    date: "Jan 14, 2026",
    src: "", // TODO: add video file/URL
  },
  {
    name: "Moushumi",
    photo: "/images/Avatar.png",
    rating: 5,
    quote: "Calm, clear, and genuinely reassuring during a scary time.",
    date: "Jan 29, 2026",
    src: "", // TODO: add video file/URL
  },
  {
    name: "Tariq",
    photo: null,
    rating: 5,
    quote: "Best diagnostic experience I've had in years.",
    date: "Feb 6, 2026",
    src: "", // TODO: add video file/URL
  },
  {
    name: "Ruma",
    photo: "/images/Avatar.png",
    rating: 4,
    quote: "Explained every option before recommending a plan.",
    date: "Feb 19, 2026",
    src: "", // TODO: add video file/URL
  },
  {
    name: "Habib",
    photo: null,
    rating: 5,
    quote: "My whole family sees him now.",
    date: "Mar 4, 2026",
    src: "", // TODO: add video file/URL
  },
];

/* ================= SHARED BITS ================= */
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={
          i < rating
            ? "fill-[#FFB800] text-[#FFB800]"
            : "fill-gray-200 text-gray-200"
        }
      />
    ))}
  </div>
);

const PatientAvatar = ({
  name,
  photo,
  light,
}: {
  name: string;
  photo: string | null;
  light?: boolean;
}) => {
  if (photo) {
    return (
      <Image
        src={photo}
        alt={name}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full object-cover border border-white/20"
      />
    );
  }
  return (
    <div
      className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${
        light
          ? "bg-white/15 text-white"
          : "bg-[#2AA7FF]/10 text-[#2AA7FF]"
      }`}
    >
      {name.charAt(0)}
    </div>
  );
};

/* ================= VIDEO REVIEW CARD ================= */
const VideoReviewCard = ({ review }: { review: (typeof VIDEO_REVIEWS)[number] }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleEnter = () => {
    setIsHovering(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleLeave = () => {
    setIsHovering(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group/card shrink-0 w-64 sm:w-72 rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative aspect-[9/16] bg-gradient-to-br from-[#2AA7FF] to-[#155a94] overflow-hidden">
        <video
          ref={videoRef}
          src={review.src || undefined}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* monogram placeholder shown behind the (empty) video element */}
        <span className="absolute inset-0 flex items-center justify-center text-8xl font-bold text-white/15 select-none">
          {review.name.charAt(0)}
        </span>

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20 transition-opacity duration-300 ${
            isHovering ? "opacity-60" : "opacity-100"
          }`}
        />

        {!isHovering && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex items-center justify-center w-14 h-14 rounded-full bg-white/90 text-[#2AA7FF] shadow-lg group-hover/card:scale-110 transition-transform">
              <Play size={22} className="ml-1" fill="currentColor" />
            </span>
          </span>
        )}

        <div className="absolute top-3 left-3 bg-black/40 backdrop-blur px-2.5 py-1 rounded-full">
          <StarRating rating={review.rating} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2.5">
            <PatientAvatar name={review.name} photo={review.photo} light />
            <div>
              <p className="text-sm font-semibold text-white">{review.name}</p>
              <p className="text-xs text-white/70">{review.date}</p>
            </div>
          </div>
          <p className="mt-2 text-xs text-white/85 leading-relaxed line-clamp-2">
            &ldquo;{review.quote}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
};

/* ================= DOCTOR FEATURED VIDEO ================= */
const DoctorVideoCard = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
    <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-xl bg-black">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          poster={DOCTOR_VIDEO.poster}
          src={DOCTOR_VIDEO.src || undefined}
          controls={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <span className="absolute top-4 left-4 rounded-full bg-[#2AA7FF] px-3 py-1 text-xs font-semibold text-white">
          From the Doctor
        </span>

        {!isPlaying && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent flex items-center justify-center">
            <button
              onClick={togglePlay}
              aria-label="Play doctor's video message"
              className="flex items-center justify-center w-20 h-20 rounded-full bg-white/90 backdrop-blur text-[#2AA7FF] shadow-lg hover:bg-[#2AA7FF] hover:text-white hover:scale-105 transition-all duration-300"
            >
              <Play size={30} className="ml-1" fill="currentColor" />
            </button>
          </div>
        )}

        {!isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
            <h3 className="text-lg md:text-xl font-bold text-white">
              {DOCTOR_VIDEO.title}
            </h3>
            <p className="mt-1 text-sm text-white/80 max-w-lg">
              {DOCTOR_VIDEO.description}
            </p>
          </div>
        )}

        {isPlaying && (
          <button
            onClick={togglePlay}
            aria-label="Pause video"
            className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
          >
            <Pause size={16} fill="currentColor" />
          </button>
        )}
      </div>
    </div>
  );
};

/* ================= COMPONENT ================= */
const ReviewsSection = () => {
  const loopedVideoReviews = [...VIDEO_REVIEWS, ...VIDEO_REVIEWS, ...VIDEO_REVIEWS];

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="container relative">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold tracking-wide uppercase text-[#2AA7FF]">
              Patient Reviews
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight tracking-tight text-black">
              What Our Patients Say
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
              Real experiences, in patients&apos; own words and voices.
            </p>
          </div>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="group hidden lg:inline-flex items-center gap-1.5 text-sm font-semibold text-[#2AA7FF] shrink-0"
          >
            See All Reviews
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>

        {/* RATING SUMMARY */}
        <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50/80 px-5 py-3">
          <span className="text-2xl font-bold text-black">
            {RATING_SUMMARY.average}
          </span>
          <div>
            <StarRating rating={Math.round(RATING_SUMMARY.average)} />
            <p className="mt-0.5 text-xs text-gray-500">
              from {RATING_SUMMARY.totalReviews}+ verified patients
            </p>
          </div>
        </div>

        {/* DOCTOR FEATURED VIDEO */}
        <div className="mt-10">
          <DoctorVideoCard />
        </div>

        {/* VIDEO TESTIMONIALS — AUTO SLIDER */}
        <div className="mt-14">
          <h3 className="text-lg font-bold text-black">Video Testimonials</h3>
          <div className="mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="flex gap-5 w-max animate-marquee hover:[animation-play-state:paused]">
              {loopedVideoReviews.map((review, i) => (
                <VideoReviewCard key={`${review.name}-${i}`} review={review} />
              ))}
            </div>
          </div>
        </div>

        {/* WRITTEN TESTIMONIALS */}
        <div className="mt-14">
          <h3 className="text-lg font-bold text-black">Written Reviews</h3>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEXT_REVIEWS.map((review) => (
              <article
                key={review.name}
                className="relative flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <Quote size={26} className="text-[#2AA7FF]/25" fill="currentColor" />
                <StarRating rating={review.rating} />
                <p className="mt-3 text-sm text-gray-600 leading-relaxed flex-1">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3 pt-4 border-t border-gray-100">
                  <PatientAvatar name={review.name} photo={review.photo} />
                  <div>
                    <p className="text-sm font-semibold text-black">
                      {review.name}
                    </p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* MOBILE SEE-ALL */}
        <div className="mt-10 flex justify-center lg:hidden">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#2AA7FF]"
          >
            See All Reviews
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
