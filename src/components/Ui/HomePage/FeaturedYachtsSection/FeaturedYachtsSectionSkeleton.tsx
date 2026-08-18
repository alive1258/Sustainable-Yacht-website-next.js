import Skeleton from "@/src/components/Common/Skeleton/Skeleton";
import YachtCardSkeleton from "@/src/components/Common/Skeleton/YachtCardSkeleton";

const FeaturedYachtsSectionSkeleton = () => (
  <section className="bg-white pt-32 pb-16 md:pt-40 md:pb-24">
    <div className="container">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
        <div>
          <Skeleton className="h-3 w-32 bg-brand-900/10" />
          <Skeleton className="mt-3 h-9 w-72 bg-brand-900/10" />
        </div>
        <Skeleton className="h-4 w-36 bg-brand-900/10" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <YachtCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedYachtsSectionSkeleton;
