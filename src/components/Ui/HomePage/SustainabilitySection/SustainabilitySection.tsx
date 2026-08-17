/* eslint-disable react-hooks/static-components */
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { ApiResponse } from "@/src/types/axios";
import type { SustainabilityItem } from "@/src/types/sustainabilityType";
import { getSustainabilityIcon } from "@/src/utils/sustainabilityIcons";

async function getActiveSustainability(): Promise<SustainabilityItem | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sustainability/active`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return null;

    const body: ApiResponse<SustainabilityItem> = await res.json();
    return body.data ?? null;
  } catch {
    return null;
  }
}

const SustainabilitySection = async () => {
  const sustainability = await getActiveSustainability();

  if (!sustainability) return null;

  const {
    label,
    title,
    description,
    button_text,
    button_link,
    badge_text,
    badge_icon,
    image,
    highlights,
  } = sustainability;

  const BadgeIcon = getSustainabilityIcon(badge_icon);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          {label && (
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              {label}
            </span>
          )}
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900 leading-tight">
            {title}
          </h2>
          {description && (
            <p className="mt-5 text-brand-900/70 leading-relaxed max-w-lg">
              {description}
            </p>
          )}

          {highlights && highlights.length > 0 && (
            <ul className="mt-8 space-y-5">
              {highlights.map(({ icon, title, description }) => {
                const Icon = getSustainabilityIcon(icon);
                return (
                  <li key={title} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="font-semibold text-brand-900">{title}</p>
                      <p className="text-sm text-brand-900/60">{description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          <a
            href={button_link}
            className="mt-9 inline-flex items-center gap-2 rounded-lg border-2 border-brand-600 px-6 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-600 hover:text-white"
          >
            {button_text}
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="relative">
          {image && (
            <div className="relative aspect-4/5 sm:aspect-4/3 overflow-hidden rounded-4xl shadow-xl">
              <Image
                src={image}
                alt="Guests relaxing onboard a sustainable charter yacht"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className=""
              />
            </div>
          )}

          {badge_text && (
            <div className="absolute -bottom-6 left-6 sm:left-10 flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2.5 shadow-lg">
              <BadgeIcon size={16} className="text-white" />
              <span className="text-xs font-bold uppercase tracking-wide text-white">
                {badge_text}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
