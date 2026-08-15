import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Ruler, Users } from "lucide-react";
import { getYachtSummaries } from "@/src/utils/data/yachts";

const FLEET = getYachtSummaries();

export default function FleetGrid() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FLEET.map((yacht) => (
            <Link
              key={yacht.slug}
              href={`/yachts/${yacht.slug}`}
              className="group overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
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
}
