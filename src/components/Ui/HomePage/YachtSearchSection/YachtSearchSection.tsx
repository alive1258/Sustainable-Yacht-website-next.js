import type { ApiResponse } from "@/src/types/axios";
import YachtSearchForm from "./YachtSearchForm";

async function getActiveRegions(): Promise<string[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/yachts/regions`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const body: ApiResponse<string[]> = await res.json();
    return body.data ?? [];
  } catch {
    return [];
  }
}

const YachtSearchSection = async () => {
  const regions = await getActiveRegions();

  return (
    <section className="bg-brand-700 pt-16 pb-24 md:pt-20 md:pb-28">
      <div className="container">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-white">
          Find Your Perfect Yacht
        </h2>
        <p className="mt-3 text-center text-brand-100/80 max-w-lg mx-auto">
          Tell us where and when — we&apos;ll match you with the right boat.
        </p>

        <YachtSearchForm regions={regions} />
      </div>
    </section>
  );
};

export default YachtSearchSection;
