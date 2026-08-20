import { Suspense } from "react";
import TechnologiesView from "@/components/technologies/TechnologiesView";
import Footer from "@/components/shared/Footer";

export default function TechnologiesPage() {
  return (
    <>
      <Suspense fallback={null}>
        <TechnologiesView />
      </Suspense>
      <Footer />
    </>
  );
}
