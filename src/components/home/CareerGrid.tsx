"use client";

import { useMemo, useState } from "react";
import { Career } from "@/types";
import CareerCard from "./CareerCard";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/LocaleContext";
import { translateCategory } from "@/i18n/content/translate";

export default function CareerGrid({ careers, categories }: { careers: Career[]; categories: string[] }) {
  const [active, setActive] = useState<string>("All");
  const { t, locale } = useLocale();

  const filtered = useMemo(() => {
    if (active === "All") return careers;
    return careers.filter((c) => c.category === active);
  }, [careers, active]);

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">{t("home.choosePath")}</h2>
        <p className="mt-2 text-text-secondary">{t("home.choosePathSubtitle")}</p>
      </div>

      <div className="no-scrollbar mb-8 flex flex-wrap justify-center gap-2 overflow-x-auto pb-1">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "shrink-0 rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition-all",
              active === cat
                ? "border-transparent bg-white text-black shadow-lg shadow-white/20"
                : "border-border-soft bg-surface text-text-secondary hover:border-border-strong hover:text-text-primary"
            )}
          >
            {cat === "All" ? t("home.categoryAll") : translateCategory(cat, locale)}
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
