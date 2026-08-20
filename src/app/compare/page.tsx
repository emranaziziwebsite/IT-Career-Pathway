import { Suspense } from "react";
import CompareView from "@/components/compare/CompareView";
import Footer from "@/components/shared/Footer";

export default function ComparePage() {
  return (
    <>
      <Suspense fallback={null}>
        <CompareView />
      </Suspense>
      <Footer />
    </>
  );
}
