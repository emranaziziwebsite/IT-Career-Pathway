import Link from "next/link";
import { Rocket } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border-soft px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-text-muted sm:flex-row">
        <div className="flex items-center gap-2 font-display font-semibold text-text-secondary">
          <Rocket size={14} />
          IT Career Pathway Explorer
        </div>
        <p>Recommendations are starting points, not absolutes — pick what fits your goals and budget.</p>
        <div className="flex gap-4">
          <Link href="/finder" className="hover:text-text-primary">Career Finder</Link>
          <Link href="/compare" className="hover:text-text-primary">Compare</Link>
          <Link href="/technologies" className="hover:text-text-primary">Technologies</Link>
        </div>
      </div>
    </footer>
  );
}
