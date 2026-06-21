import Navbar from "@/app/components/navbar/Navbar";

import HeroSection from "@/app/components/hero/HeroSection";

import TopLocations from "@/app/components/locations/TopLocations";

import FeaturedProperties from "@/app/components/properties/FeaturedProperties";

// import WhyChooseUs from "@/components/features/WhyChooseUs";

import RecentlyAdded from "@/app/components/recent/RecentlyAdded";

import Testimonials from "@/app/components/testimonials/Testimonials";
import Footer from "@/app/components/footer/Footer";



export default function Home() {
  return (
    <main>

      <HeroSection />

      <TopLocations />

      <FeaturedProperties />

      {/* <WhyChooseUs /> */}

      <RecentlyAdded />

      <Testimonials />

    </main>
  );
}