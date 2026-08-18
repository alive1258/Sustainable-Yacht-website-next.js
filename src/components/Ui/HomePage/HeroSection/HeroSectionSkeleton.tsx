import Skeleton from "@/src/components/Common/Skeleton/Skeleton";

const HeroSectionSkeleton = () => (
  <section className="relative flex min-h-[640px] items-center overflow-hidden py-10 md:py-24 md:min-h-[760px] bg-brand-900">
    <div className="container relative">
      <div className="max-w-xl">
        <Skeleton className="h-7 w-56 rounded-full bg-white/10" />
        <Skeleton className="mt-6 h-12 w-full bg-white/10" />
        <Skeleton className="mt-3 h-14 w-2/3 bg-white/10" />
        <Skeleton className="mt-6 h-4 w-full bg-white/10" />
        <Skeleton className="mt-2 h-4 w-5/6 bg-white/10" />
        <Skeleton className="mt-8 h-12 w-48 rounded-lg bg-white/10" />
      </div>
    </div>
  </section>
);

export default HeroSectionSkeleton;
