import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Ruler, Users } from "lucide-react";
import type { ApiResponse } from "@/src/types/axios";
import type { YachtAdminItem } from "@/src/types/yachtAdminType";
import { mapYachtAdminItemToSummary } from "@/src/utils/mappers/yacht";

async function getFeaturedYachts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/yachts/active`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) return [];

    const body: ApiResponse<YachtAdminItem[]> = await res.json();
    return (body.data ?? []).slice(0, 6).map(mapYachtAdminItemToSummary);
  } catch {
    return [];
  }
}

const FeaturedYachtsSection = async () => {
  const YACHTS = await getFeaturedYachts();

  if (YACHTS.length === 0) return null;

  return (
    <section className="bg-white pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              Featured Fleet
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
              Sail in Sustainable Luxury
            </h2>
          </div>
          <Link
            href="/yachts"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition"
          >
            View Full Fleet
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {YACHTS?.map((yacht) => (
            <Link
              key={yacht.slug}
              href={`/yachts/${yacht.slug}`}
              className="group overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={yacht.image}
                  alt={yacht.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className=" transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-brand-900">
                  {yacht.name}
                </h3>
                <div className="mt-3 flex items-center gap-4 text-xs text-brand-900/60">
                  <span className="flex items-center gap-1.5">
                    <Ruler size={13} />
                    {yacht.length}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={13} />
                    {yacht.guests}
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-brand-900/10 pt-4">
                  <span className="text-sm">
                    <span className="font-bold text-brand-900">
                      {yacht.price}
                    </span>
                    <span className="text-brand-900/50"> / night</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:text-brand-900 transition">
                    View Details
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedYachtsSection;
