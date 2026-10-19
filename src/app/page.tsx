import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FeatureTabsSection from "@/components/FeatureTabsSection";
import DetailedExportSection from "@/components/DetailedExportSection";
import ProvidersGrid from "@/components/ProvidersGrid";
import ComparisonSection from "@/components/ComparisonSection";
import SecuritySection from "@/components/SecuritySection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white w-full">
      <Navbar />
      <main className="flex-1 w-full max-w-full">
        <HeroSection />
        <StatsSection />
        <FeatureTabsSection />
        <DetailedExportSection />
        <ProvidersGrid />
        <ComparisonSection />
        <SecuritySection />
        <PricingSection />
        <FaqSection />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
