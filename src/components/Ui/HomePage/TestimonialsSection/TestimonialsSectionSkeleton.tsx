import Skeleton from "@/src/components/Common/Skeleton/Skeleton";

const SkeletonCard = () => (
  <div className="w-[220px] shrink-0 rounded-2xl border border-brand-900/10 bg-white p-6 shadow-sm sm:w-[300px]">
    <Skeleton className="h-5 w-5 bg-brand-900/10" />
    <div className="mt-4 space-y-1.5">
      <Skeleton className="h-3 w-full bg-brand-900/10" />
      <Skeleton className="h-3 w-full bg-brand-900/10" />
      <Skeleton className="h-3 w-2/3 bg-brand-900/10" />
    </div>
    <Skeleton className="mt-4 h-3 w-20 bg-brand-900/10" />
    <div className="mt-4 flex items-center gap-3 border-t border-brand-900/10 pt-4">
      <Skeleton className="h-9 w-9 shrink-0 rounded-full bg-brand-900/10" />
      <div className="space-y-1.5">
        <Skeleton className="h-3.5 w-24 bg-brand-900/10" />
        <Skeleton className="h-2.5 w-32 bg-brand-900/10" />
      </div>
    </div>
  </div>
);

const TestimonialsSectionSkeleton = () => (
  <section className="overflow-hidden bg-brand-50/50 py-16 md:py-24">
    <div className="container">
      <div className="mb-12 text-center">
        <Skeleton className="mx-auto h-3 w-32 bg-brand-900/10" />
        <Skeleton className="mx-auto mt-3 h-9 w-96 max-w-full bg-brand-900/10" />
      </div>
    </div>

    <div className="space-y-6">
      {Array.from({ length: 2 }).map((_, row) => (
        <div key={row} className="flex gap-6 overflow-hidden px-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ))}
    </div>
  </section>
);

export default TestimonialsSectionSkeleton;
