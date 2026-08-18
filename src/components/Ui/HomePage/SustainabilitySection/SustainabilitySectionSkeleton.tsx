import Skeleton from "@/src/components/Common/Skeleton/Skeleton";

const SustainabilitySectionSkeleton = () => (
  <section className="bg-white py-16 md:py-24">
    <div className="container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div>
        <Skeleton className="h-3 w-32 bg-brand-900/10" />
        <Skeleton className="mt-3 h-9 w-full bg-brand-900/10" />
        <Skeleton className="mt-2 h-9 w-2/3 bg-brand-900/10" />
        <Skeleton className="mt-5 h-4 w-full max-w-lg bg-brand-900/10" />
        <Skeleton className="mt-2 h-4 w-5/6 max-w-lg bg-brand-900/10" />

        <div className="mt-8 space-y-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-start gap-4">
              <Skeleton className="h-10 w-10 shrink-0 rounded-xl bg-brand-900/10" />
              <div className="flex-1 space-y-2 pt-1">
                <Skeleton className="h-3.5 w-1/3 bg-brand-900/10" />
                <Skeleton className="h-3 w-2/3 bg-brand-900/10" />
              </div>
            </div>
          ))}
        </div>

        <Skeleton className="mt-9 h-12 w-48 rounded-lg bg-brand-900/10" />
      </div>

      <Skeleton className="aspect-4/5 sm:aspect-4/3 w-full rounded-4xl bg-brand-900/10" />
    </div>
  </section>
);

export default SustainabilitySectionSkeleton;
