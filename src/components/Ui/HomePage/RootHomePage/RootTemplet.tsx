import DestinationsSection from "../DestinationsSection/DestinationsSection";
import ExperiencesSection from "../ExperiencesSection/ExperiencesSection";
import FaqSection from "../FaqSection/FaqSection";
import FeaturedYachtsSection from "../FeaturedYachtsSection/FeaturedYachtsSection";
import HeroSection from "../HeroSection/HeroSection";
import InsightsSection from "../InsightsSection/InsightsSection";
import NewsletterSection from "../NewsletterSection/NewsletterSection";
import PromiseSection from "../PromiseSection/PromiseSection";
import SustainabilitySection from "../SustainabilitySection/SustainabilitySection";
import TestimonialsSection from "../TestimonialsSection/TestimonialsSection";
import VideoSection from "../VideoSection/VideoSection";
import YachtSearchSection from "../YachtSearchSection/YachtSearchSection";

const RootHomePage = () => {
  return (
    <>
      <div id="home" className="scroll-mt-[100px]">
        <HeroSection />
      </div>

      <SustainabilitySection />

      <div id="experiences" className="scroll-mt-[100px]">
        <ExperiencesSection />
      </div>

      <div id="yacht-search" className="scroll-mt-[100px]">
        <YachtSearchSection />
      </div>

      <FeaturedYachtsSection />

      <VideoSection />

      <DestinationsSection />

      <PromiseSection />

      <TestimonialsSection />

      <FaqSection />

      <div id="insights" className="scroll-mt-[100px]">
        <InsightsSection />
      </div>

      <NewsletterSection />
    </>
  );
};

export default RootHomePage;
