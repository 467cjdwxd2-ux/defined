import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import FeaturedDefinitions from "@/components/landing/FeaturedDefinitions";
import HallOfFame from "@/components/landing/HallOfFame";
import HowItWorks from "@/components/landing/HowItWorks";
import ProductShowcase from "@/components/landing/ProductShowcase";
import Testimonials from "@/components/landing/Testimonials";
import GiftSection from "@/components/landing/GiftSection";
import FinalCTA from "@/components/landing/FinalCTA";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <FeaturedDefinitions />
      <HallOfFame />
      <HowItWorks />
      <ProductShowcase />
      <GiftSection />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
