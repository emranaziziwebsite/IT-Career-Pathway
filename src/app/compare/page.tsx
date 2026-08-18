import CompareView from "@/components/compare/CompareView";
import Footer from "@/components/shared/Footer";

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ careers?: string }>;
}) {
  const params = await searchParams;
  const initialIds = params.careers?.split(",").filter(Boolean) ?? ["frontend-developer", "backend-developer"];

  return (
    <>
      <CompareView initialIds={initialIds} />
      <Footer />
    </>
  );
}
