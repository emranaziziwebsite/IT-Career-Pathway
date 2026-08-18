import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import CareerGrid from "@/components/home/CareerGrid";
import Footer from "@/components/shared/Footer";
import { allCareers, careerCategories } from "@/data/careers";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <section id="careers" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <CareerGrid careers={allCareers} categories={careerCategories} />
      </section>
      <Footer />
    </>
  );
}
