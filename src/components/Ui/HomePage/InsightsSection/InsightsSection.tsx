import Image from "next/image";
import { ArrowRight, CalendarDays } from "lucide-react";

// TODO: replace with real articles once the blog backend is wired up
const ARTICLES = [
  {
    title: "The Rise of Sustainable Luxury Travel",
    date: "Jul 14, 2026",
    image: "/images/experiences/tropical-escapes.jpg",
  },
  {
    title: "Top Eco-Friendly Destinations to Visit",
    date: "Jun 30, 2026",
    image: "/images/experiences/cultural-voyages.jpg",
  },
  {
    title: "How Yachts Are Going Green",
    date: "Jun 12, 2026",
    image: "/images/yachts/eco-serenity.jpg",
  },
];

const InsightsSection = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              Now on Blog
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
              Sailing Insights &amp; Stories
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 cursor-default">
            Read More
            <ArrowRight size={16} />
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article) => (
            <div
              key={article.title}
              className="group overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="flex items-center gap-1.5 text-xs text-brand-900/50">
                  <CalendarDays size={13} />
                  {article.date}
                </span>
                <h3 className="mt-2 font-bold text-brand-900 leading-snug group-hover:text-brand-600 transition-colors">
                  {article.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
