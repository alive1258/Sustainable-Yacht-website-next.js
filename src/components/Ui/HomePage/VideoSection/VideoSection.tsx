"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

const YOUTUBE_VIDEO_ID = "cm40e1ChozE";
const YOUTUBE_THUMBNAIL = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`;

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="container">
      <div className=" relative flex min-h-[420px] items-center justify-center overflow-hidden py-20 md:min-h-[620px]">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1`}
            title="Eco Yachts fleet showcase video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <>
            <Image
              src={YOUTUBE_THUMBNAIL}
              alt="Eco Yachts fleet showcase video thumbnail"
              fill
              sizes="100vw"
              className="rounded-2xl "
            />
            {/* <div className="absolute inset-0 bg-brand-900/55" /> */}

            <div className=" relative flex flex-col items-center text-center">
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label="Play fleet showcase video"
                className="group flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-sm transition hover:bg-white/25 sm:h-24 sm:w-24"
              >
                <Play
                  size={30}
                  className="ml-1 text-white transition group-hover:scale-110"
                  fill="currentColor"
                />
              </button>

              <h2 className="mt-8 text-3xl sm:text-4xl font-bold text-blue-500">
                See Eco Yachts in Action
              </h2>
              <p className="mt-3 max-w-lg text-lg font-semibold text-gold-600 leading-relaxed">
                A closer look at life aboard our fleet — sustainable cruising,
                quiet electric propulsion, and the coastlines that make it worth
                it.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default VideoSection;
