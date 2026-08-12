"use client";

import Image from "next/image";
import { useState } from "react";
import { CalendarDays, User, ArrowRight } from "lucide-react";

/* ================= CONSTANTS ================= */
/* NOTE: placeholder articles for layout/preview purposes — cover images
   reuse the doctor's portrait until real article photography exists, and
   "Read More" is inert (no /blog/[slug] route yet). Wire both up once the
   full blog listing + article detail pages are built. */
const CATEGORIES = [
  "All",
  "Nutrition",
  "Prevention",
  "Neurology",
  "Patient Stories",
];

const ARTICLES = [
  {
    title: "5 Everyday Habits That Support Brain Health",
    category: "Neurology",
    excerpt:
      "Simple, evidence-backed habits that help protect long-term neurological health.",
    date: "Jan 12, 2026",
    author: "Dr. Anarul Islam",
    cover: "/images/dr/Anarul-Islam.jpg",
  },
  {
    title: "Understanding Blood Pressure: What the Numbers Mean",
    category: "Prevention",
    excerpt:
      "A plain-language guide to reading your blood pressure readings and when to act on them.",
    date: "Jan 20, 2026",
    author: "Dr. Anarul Islam",
    cover: "/images/dr/Anarul-Islam.jpg",
  },
  {
    title: "Nutrition Basics for a Stronger Immune System",
    category: "Nutrition",
    excerpt:
      "The foods and habits that give your immune system the best foundation to work with.",
    date: "Feb 2, 2026",
    author: "Dr. Anarul Islam",
    cover: "/images/dr/Anarul-Islam.jpg",
  },
  {
    title: "When to See a Doctor for Chronic Headaches",
    category: "Neurology",
    excerpt:
      "Warning signs that a recurring headache needs more than over-the-counter relief.",
    date: "Feb 15, 2026",
    author: "Dr. Anarul Islam",
    cover: "/images/dr/Anarul-Islam.jpg",
  },
  {
    title: "Preventive Checkups: Why They Matter at Every Age",
    category: "Prevention",
    excerpt:
      "How routine screening catches common conditions early, when they're easiest to treat.",
    date: "Feb 28, 2026",
    author: "Dr. Anarul Islam",
    cover: "/images/dr/Anarul-Islam.jpg",
  },
  {
    title: "What to Expect at Your First Visit",
    category: "Patient Stories",
    excerpt:
      "A walkthrough of what happens during a first consultation, so nothing feels unfamiliar.",
    date: "Mar 6, 2026",
    author: "Dr. Anarul Islam",
    cover: "/images/dr/Anarul-Islam.jpg",
  },
];

/* ================= COMPONENT ================= */
const ARTICLES_PER_PAGE = 3;

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);

  const filtered =
    activeCategory === "All"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeCategory);

  const visibleArticles = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(ARTICLES_PER_PAGE);
  };

  const handleLoadMore = () => {
    setVisibleCount((count) => count + ARTICLES_PER_PAGE);
  };

  return (
    <section className="relative overflow-hidden bg-gray-50/60 py-20 md:py-28">
      <div className="container relative">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold tracking-wide uppercase text-[#2AA7FF]">
              Blog / Health Articles
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight tracking-tight text-black">
              Latest Health Articles
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
              Practical, easy-to-understand guidance on prevention, nutrition,
              and neurological health from Dr. Islam.
            </p>
          </div>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="group hidden lg:inline-flex items-center gap-1.5 text-sm font-semibold text-[#2AA7FF] shrink-0"
          >
            View All Articles
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>

        {/* CATEGORY FILTER */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-[#2AA7FF] text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#2AA7FF]/40 hover:text-[#2AA7FF]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ARTICLE CARDS */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleArticles.map((article) => (
            <article
              key={article.title}
              className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative aspect-16/10 bg-gray-100">
                <Image
                  src={article.cover}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#2AA7FF]">
                  {article.category}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-5">
                <h3 className="text-base font-bold text-black leading-snug">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">
                  {article.excerpt}
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <User size={13} className="text-[#2AA7FF]" />
                    {article.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={13} className="text-[#2AA7FF]" />
                    {article.date}
                  </span>
                </div>

                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="group/link mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2AA7FF]"
                >
                  Read More
                  <ArrowRight
                    size={15}
                    className="group-hover/link:translate-x-1 transition-transform"
                  />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* SEE MORE */}
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 rounded-full border border-[#2AA7FF]/30 bg-white px-6 py-2.5 text-sm font-semibold text-[#2AA7FF] hover:bg-[#2AA7FF]/5 hover:border-[#2AA7FF]/60 transition-colors"
            >
              See More Articles
            </button>
          </div>
        )}

        {/* MOBILE VIEW-ALL */}
        <div className="mt-10 flex justify-center lg:hidden">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#2AA7FF]"
          >
            View All Articles
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

export default BlogSection;
