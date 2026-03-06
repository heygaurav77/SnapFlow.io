import ParticlesCanvas from "@/components/ParticlesCanvas";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PlatformsSection from "@/components/PlatformsSection";
import DisclaimerSection from "@/components/DisclaimerSection";
import ChangesSection from "@/components/ChangesSection";
import FeedbackSection from "@/components/FeedbackSection";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";

export default function Home() {
  return (
    <>
      <ParticlesCanvas />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <FeedbackSection />
        <DisclaimerSection />
      </main>
      <Footer />
    </>
  );
}
