import DestinationsSection from "../DestinationsSection/DestinationsSection";
import ExperiencesSection from "../ExperiencesSection/ExperiencesSection";
import FeaturedYachtsSection from "../FeaturedYachtsSection/FeaturedYachtsSection";
import HeroSection from "../HeroSection/HeroSection";
import InsightsSection from "../InsightsSection/InsightsSection";
import NewsletterSection from "../NewsletterSection/NewsletterSection";
import PromiseSection from "../PromiseSection/PromiseSection";
import SustainabilitySection from "../SustainabilitySection/SustainabilitySection";
import TestimonialsSection from "../TestimonialsSection/TestimonialsSection";
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

      <div id="yachts" className="scroll-mt-[100px]">
        <FeaturedYachtsSection />
      </div>

      <div id="destinations" className="scroll-mt-[100px]">
        <DestinationsSection />
      </div>

      <PromiseSection />

      <TestimonialsSection />

      <InsightsSection />

      <NewsletterSection />
    </>
  );
};

export default RootHomePage;
