import Skeleton from "@/src/components/Common/Skeleton/Skeleton";
import CardGridSkeleton from "@/src/components/Common/Skeleton/CardGridSkeleton";

const ExperiencesSectionSkeleton = () => (
  <section className="bg-brand-50/50 py-16 md:py-24">
    <div className="container">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
        <div>
          <Skeleton className="h-3 w-40 bg-brand-900/10" />
          <Skeleton className="mt-3 h-9 w-72 bg-brand-900/10" />
        </div>
        <Skeleton className="h-4 w-32 bg-brand-900/10" />
      </div>

      <CardGridSkeleton count={3} lines={2} />
    </div>
  </section>
);

export default ExperiencesSectionSkeleton;
