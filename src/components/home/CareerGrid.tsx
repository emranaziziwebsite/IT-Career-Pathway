"use client";

import { useMemo, useState } from "react";
import { Career } from "@/types";
import CareerCard from "./CareerCard";
import { cn } from "@/lib/utils";

export default function CareerGrid({ careers, categories }: { careers: Career[]; categories: string[] }) {
  const [active, setActive] = useState<string>("All");

  const filtered = useMemo(() => {
    if (active === "All") return careers;
    return careers.filter((c) => c.category === active);
  }, [careers, active]);

  return (
    <div>
      <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-1">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              active === cat
                ? "border-transparent bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-violet-500/20"
                : "border-border-soft bg-surface text-text-secondary hover:border-border-strong hover:text-text-primary"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((career, i) => (
          <CareerCard key={career.id} career={career} index={i} />
        ))}
      </div>
    </div>
  );
}
