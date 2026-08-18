import TechnologiesView from "@/components/technologies/TechnologiesView";
import Footer from "@/components/shared/Footer";

export default async function TechnologiesPage({
  searchParams,
}: {
  searchParams: Promise<{ item?: string }>;
}) {
  const params = await searchParams;
  return (
    <>
      <TechnologiesView initialItemId={params.item} />
      <Footer />
    </>
  );
}
