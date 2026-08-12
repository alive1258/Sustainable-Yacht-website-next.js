import Image from "next/image";
import { Play } from "lucide-react";

// TODO: wire up a real video source (e.g. a hosted fleet/onboard-experience
// reel) — the play button is currently inert.
const VideoSection = () => {
  return (
    <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden py-20 md:min-h-[520px]">
      <Image
        src="/images/experiences/exp-36.jpg"
        alt="Sunset rooftop lounge deck aboard a luxury charter yacht"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-brand-900/55" />

      <div className="container relative flex flex-col items-center text-center">
        <button
          type="button"
          aria-label="Play fleet showcase video"
          className="group flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-sm transition hover:bg-white/25 sm:h-24 sm:w-24"
        >
          <Play
            size={30}
            className="ml-1 text-white transition group-hover:scale-110"
            fill="currentColor"
          />
        </button>

        <h2 className="mt-8 text-3xl sm:text-4xl font-bold text-white">
          See Eco Yachts in Action
        </h2>
        <p className="mt-3 max-w-lg text-white/80 leading-relaxed">
          A closer look at life aboard our fleet — sustainable cruising, quiet
          electric propulsion, and the coastlines that make it worth it.
        </p>
      </div>
    </section>
  );
};

export default VideoSection;
