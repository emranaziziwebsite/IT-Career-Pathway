import { notFound } from "next/navigation";
import { allCareers, getCareer } from "@/data/careers";
import CareerHeader from "@/components/career/CareerHeader";
import PathwayView from "@/components/career/PathwayView";
import Footer from "@/components/shared/Footer";

export function generateStaticParams() {
  return allCareers.map((c) => ({ slug: c.slug }));
}

export default async function CareerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const career = getCareer(slug);
  if (!career) notFound();

  return (
    <>
      <CareerHeader career={career} />
      <PathwayView career={career} />
      <Footer />
    </>
  );
}
