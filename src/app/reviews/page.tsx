import ParticlesCanvas from "@/components/ParticlesCanvas";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewsSection from "@/components/ReviewsSection";

export const metadata = {
  title: "User Reviews - SnapFlow",
  description: "See what thousands of users worldwide are saying about SnapFlow, the world's most powerful social media archiver.",
};

export default function ReviewsPage() {
  return (
    <>
      <ParticlesCanvas />
      <Navbar />
      <main className="relative z-10 pt-32 min-h-screen">
        <ReviewsSection />
      </main>
      <Footer />
    </>
  );
}
