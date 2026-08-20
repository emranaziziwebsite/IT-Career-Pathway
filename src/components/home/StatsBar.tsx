"use client";

import { allCareers } from "@/data/careers";
import { allItems } from "@/data/items";
import { certifications } from "@/data/items";
import { useLocale } from "@/i18n/LocaleContext";

export default function StatsBar() {
  const { t } = useLocale();
  const stats = [
    { label: t("stats.careers"), value: allCareers.length, emoji: "🧭" },
    { label: t("stats.skills"), value: allItems.length, emoji: "🧩" },
    { label: t("stats.certs"), value: certifications.length, emoji: "🏅" },
    { label: t("stats.projects"), value: allCareers.reduce((n, c) => n + c.projects.length, 0) + "+", emoji: "🛠️" },
  ];

  return (
    <div className="mx-auto -mt-6 mb-16 grid max-w-4xl grid-cols-2 gap-3 px-4 sm:grid-cols-4 sm:px-6">
      {stats.map((s) => (
        <div key={s.label} className="toon-card rounded-2xl border-2 border-border-soft bg-surface px-4 py-4 text-center">
          <div className="text-2xl">{s.emoji}</div>
          <div className="mt-1 font-display text-xl font-bold text-text-primary">{s.value}</div>
          <div className="text-[11px] uppercase tracking-wide text-text-muted">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
