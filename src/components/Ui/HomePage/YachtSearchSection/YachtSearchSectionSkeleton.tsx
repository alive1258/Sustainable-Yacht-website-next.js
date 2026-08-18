import Skeleton from "@/src/components/Common/Skeleton/Skeleton";

const YachtSearchSectionSkeleton = () => (
  <section className="bg-brand-700 pt-16 pb-24 md:pt-20 md:pb-28">
    <div className="container">
      <Skeleton className="mx-auto h-9 w-80 bg-white/10" />
      <Skeleton className="mx-auto mt-3 h-4 w-96 max-w-full bg-white/10" />

      <div className="mt-10 -mb-24 md:-mb-28 grid gap-4 rounded-2xl bg-white p-6 shadow-2xl sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_auto] lg:items-end">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-3 w-24 bg-brand-900/10" />
            <Skeleton className="mt-2 h-11 w-full rounded-lg bg-brand-900/10" />
          </div>
        ))}
        <Skeleton className="h-11 w-full rounded-lg bg-brand-900/10 lg:w-36" />
      </div>
    </div>
  </section>
);

export default YachtSearchSectionSkeleton;
