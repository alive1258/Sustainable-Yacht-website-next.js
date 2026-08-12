import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";
import { BLOG_POSTS } from "@/src/utils/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Sailing insights and stories from Eco Yachts — sustainable travel, eco-friendly destinations, fleet technology, and life aboard the charter.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Sailing Insights & Stories"
        subtitle="Notes on sustainable travel, the destinations worth protecting, and how the Eco Yachts fleet actually works."
        image="/images/experiences/exp-savannah.jpg"
        alt="Coastal scenery representing Eco Yachts editorial content"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className=" transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-900 backdrop-blur-sm">
                    {article.category}
                  </span>
                </div>
                <div className="p-6">
                  <span className="flex items-center gap-1.5 text-xs text-brand-900/50">
                    <CalendarDays size={13} />
                    {article.date}
                  </span>
                  <h3 className="mt-2 font-bold text-brand-900 leading-snug transition-colors group-hover:text-brand-600">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-brand-900/60 leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition group-hover:text-brand-900">
                    View Details
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-900 py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to See It for Yourself?
          </h2>
          <p className="max-w-lg text-brand-100/80">
            Browse the fleet and find the yacht that fits your next charter.
          </p>
          <Link
            href="/yachts"
            className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-gold-400"
          >
            Browse the Fleet
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
