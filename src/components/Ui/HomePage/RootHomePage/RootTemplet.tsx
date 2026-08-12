import AboutSection from "../AboutSection/AboutSection";
import AppointmentSection from "../AppointmentSection/AppointmentSection";
import BlogSection from "../BlogSection/BlogSection";
import ContactSection from "../ContactSection/ContactSection";
import EducationSection from "../EducationSection/EducationSection";
import FaqSection from "../FaqSection/FaqSection";
import GallerySection from "../GallerySection/GallerySection";
import HeroSection from "../HeroSection/HeroSection";
import ProfessionalMedicalCard from "../ProfessionalMedicalCard/ProfessionalMedicalCard";
import ReviewsSection from "../ReviewsSection/ReviewsSection";
import ServicesSection from "../ServicesSection/ServicesSection";
import VideoSection from "../VideoSection/VideoSection";

// Sections are being rebuilt one by one per the doctor site plan
// (Hero, About, Education (incl. experience/leadership/certs/awards),
// Services, Appointment, Video, Blog, Reviews, FAQ, Gallery, Contact done;
// Prescription still to come).
const RootHomePage = () => {
  return (
    <>
      <div id="home">
        <HeroSection />
      </div>

      <div id="home-medical-card">
        <ProfessionalMedicalCard />
      </div>

      <div id="about">
        <AboutSection />
        <EducationSection />
      </div>

      <div id="services">
        <ServicesSection />
      </div>

      <div id="appointment">
        <AppointmentSection />
      </div>

      <div id="video">
        <VideoSection />
      </div>

      <div id="blog">
        <BlogSection />
      </div>

      <div id="reviews">
        <ReviewsSection />
      </div>

      <div id="faq">
        <FaqSection />
      </div>

      <div id="gallery">
        <GallerySection />
      </div>

      <div id="contact">
        <ContactSection />
      </div>
    </>
  );
};

export default RootHomePage;
