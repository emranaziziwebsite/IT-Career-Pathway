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
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Choose Your Path</h2>
          <p className="mt-2 text-text-secondary">
            Every career below unlocks its own interactive learning pathway.
          </p>
        </div>
        <CareerGrid careers={allCareers} categories={careerCategories} />
      </section>
      <Footer />
    </>
  );
}
