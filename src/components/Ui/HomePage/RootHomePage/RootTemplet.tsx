import { Suspense } from "react";
import DestinationsSection from "../DestinationsSection/DestinationsSection";
import DestinationsSectionSkeleton from "../DestinationsSection/DestinationsSectionSkeleton";
import ExperiencesSection from "../ExperiencesSection/ExperiencesSection";
import ExperiencesSectionSkeleton from "../ExperiencesSection/ExperiencesSectionSkeleton";
import FaqSection from "../FaqSection/FaqSection";
import FaqSectionSkeleton from "../FaqSection/FaqSectionSkeleton";
import FeaturedYachtsSection from "../FeaturedYachtsSection/FeaturedYachtsSection";
import FeaturedYachtsSectionSkeleton from "../FeaturedYachtsSection/FeaturedYachtsSectionSkeleton";
import HeroSection from "../HeroSection/HeroSection";
import HeroSectionSkeleton from "../HeroSection/HeroSectionSkeleton";
import InsightsSection from "../InsightsSection/InsightsSection";
import NewsletterSection from "../NewsletterSection/NewsletterSection";
import PromiseSection from "../PromiseSection/PromiseSection";
import SustainabilitySection from "../SustainabilitySection/SustainabilitySection";
import SustainabilitySectionSkeleton from "../SustainabilitySection/SustainabilitySectionSkeleton";
import TestimonialsSection from "../TestimonialsSection/TestimonialsSection";
import TestimonialsSectionSkeleton from "../TestimonialsSection/TestimonialsSectionSkeleton";
import VideoSection from "../VideoSection/VideoSection";
import YachtSearchSection from "../YachtSearchSection/YachtSearchSection";
import YachtSearchSectionSkeleton from "../YachtSearchSection/YachtSearchSectionSkeleton";

const RootHomePage = () => {
  return (
    <>
      <div id="home" className="scroll-mt-[100px]">
        <Suspense fallback={<HeroSectionSkeleton />}>
          <HeroSection />
        </Suspense>
      </div>

      <Suspense fallback={<SustainabilitySectionSkeleton />}>
        <SustainabilitySection />
      </Suspense>

      <div id="experiences" className="scroll-mt-[100px]">
        <Suspense fallback={<ExperiencesSectionSkeleton />}>
          <ExperiencesSection />
        </Suspense>
      </div>

      <div id="yacht-search" className="scroll-mt-[100px]">
        <Suspense fallback={<YachtSearchSectionSkeleton />}>
          <YachtSearchSection />
        </Suspense>
      </div>

      <Suspense fallback={<FeaturedYachtsSectionSkeleton />}>
        <FeaturedYachtsSection />
      </Suspense>

      <VideoSection />

      <Suspense fallback={<DestinationsSectionSkeleton />}>
        <DestinationsSection />
      </Suspense>

      <PromiseSection />

      <Suspense fallback={<TestimonialsSectionSkeleton />}>
        <TestimonialsSection />
      </Suspense>

      <Suspense fallback={<FaqSectionSkeleton />}>
        <FaqSection />
      </Suspense>

      <div id="insights" className="scroll-mt-[100px]">
        <InsightsSection />
      </div>

      <NewsletterSection />
    </>
  );
};

export default RootHomePage;
