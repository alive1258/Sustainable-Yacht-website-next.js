import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ApiResponse } from "@/src/types/axios";
import type { ExperienceItem } from "@/src/types/experienceType";

async function getActiveExperiences(): Promise<ExperienceItem[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/experiences/active`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return [];

    const body: ApiResponse<ExperienceItem[]> = await res.json();
    return body.data ?? [];
  } catch {
    return [];
  }
}

const ExperiencesSection = async () => {
  const experiences = await getActiveExperiences();

  if (experiences.length === 0) return null;

  return (
    <section className="bg-brand-50/50 py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              Handpicked Experiences
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
              Curated Journeys Just for You
            </h2>
          </div>
          <Link
            href="/experiences"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition"
          >
            Plan Your Journey
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map(({ id, title, description, image }) => (
            <div
              key={id}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow"
            >
              {image && (
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className=" transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-bold text-brand-900">{title}</h3>
                {description && (
                  <p className="mt-2 text-sm text-brand-900/60 leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
