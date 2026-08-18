"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Hammer, FlaskConical } from "lucide-react";
import { allCareers, careerCategories } from "@/data/careers";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/LocaleContext";
import { translateCareer, translateCategory } from "@/i18n/content/translate";

export default function ProjectsView() {
  const [category, setCategory] = useState("All");
  const { t, locale } = useLocale();

  const filtered = useMemo(
    () => (category === "All" ? allCareers : allCareers.filter((c) => c.category === category)),
    [category]
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">{t("projects.title")}</h1>
        <p className="mt-2 text-text-secondary">{t("projects.subtitle")}</p>
      </div>

      <div className="no-scrollbar mb-10 flex justify-center gap-2 overflow-x-auto pb-1">
        {["All", ...careerCategories].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "shrink-0 rounded-full border-2 px-3.5 py-1.5 text-xs font-semibold transition-colors",
              category === cat
                ? "border-transparent bg-blue-500 text-white"
                : "border-border-soft bg-surface text-text-secondary hover:border-border-strong hover:text-text-primary"
            )}
          >
            {cat === "All" ? t("home.categoryAll") : translateCategory(cat, locale)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((rawCareer) => {
          const career = translateCareer(rawCareer, locale);
          return (
            <div key={rawCareer.id} className="toon-card rounded-3xl border-2 border-border-soft bg-surface p-5">
              <div className="mb-3 flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${rawCareer.color} text-xl`}
                >
                  {rawCareer.emoji}
                </span>
                <p className="font-display font-bold text-text-primary">{career.name}</p>
              </div>

              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-text-muted">
                <Hammer size={12} /> {t("projects.flagship")}
              </p>
              <ul className="mb-4 space-y-1">
                {career.projects.map((p) => (
                  <li key={p} className="text-sm text-text-secondary">
                    • {p}
                  </li>
                ))}
              </ul>

              {career.labs.length > 0 && (
                <>
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-text-muted">
                    <FlaskConical size={12} /> {t("projects.labs")}
                  </p>
                  <ul className="mb-4 space-y-1">
                    {career.labs.map((l) => (
                      <li key={l} className="text-sm text-text-secondary">
                        • {l}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <Link
                href={`/careers/${rawCareer.slug}`}
                className="mt-1 inline-block text-xs font-semibold text-text-primary underline decoration-white/30 hover:decoration-white/60"
              >
                {t("projects.seeFullPathway")}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
