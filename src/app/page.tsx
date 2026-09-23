import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ReviewsBanner from "@/components/ReviewsBanner";
import Destinations from "@/components/Destinations";
import VisaFreeDestinations from "@/components/VisaFreeDestinations";
import PackagesByDuration from "@/components/PackagesByDuration";
import CommunityTrips from "@/components/CommunityTrips";
import VideoBannerSlideshow from "@/components/VideoBannerSlideshow";
import Banner from "@/components/Banner";
import EnquiryBanner from "@/components/EnquiryBanner";
import Features from "@/components/Features";
import JourneyInFrames from "@/components/JourneyInFrames";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <ReviewsBanner />
      <Destinations />
      <VisaFreeDestinations />
      <PackagesByDuration />
      <CommunityTrips />
      <VideoBannerSlideshow />
      <Banner />
      <EnquiryBanner />
      <Features />
      <JourneyInFrames />
      <ReviewsSection />
      <Footer />
    </main>
  );
}

