"use client";

import { Clock, ListChecks, Rocket } from "lucide-react";
import { PathwaySection } from "@/types";
import { getItem } from "@/data/items";
import { getTrackableNodes } from "@/lib/pathway";
import { useLocale } from "@/i18n/LocaleContext";
import { translateItem } from "@/i18n/content/translate";

export default function RoadmapIntro({
  sections,
  estimatedMonths,
}: {
  sections: PathwaySection[];
  estimatedMonths: number;
}) {
  const { t, locale } = useLocale();
  const trackable = getTrackableNodes(sections);
  const firstRawItem = trackable[0]?.itemId ? getItem(trackable[0].itemId as string) : undefined;
  const firstItem = firstRawItem ? translateItem(firstRawItem, locale) : undefined;

  return (
    <div className="toon-card rounded-3xl border-2 border-border-soft bg-surface p-5 sm:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat icon={<ListChecks size={18} />} label={t("roadmap.skillsOnRoadmap")} value={`${trackable.length}`} />
        <Stat icon={<Clock size={18} />} label={t("roadmap.at10hrs")} value={`~${estimatedMonths} ${t("roadmap.months")}`} />
        <Stat
          icon={<Rocket size={18} />}
          label={t("roadmap.startWith")}
          value={firstItem ? `${firstItem.emoji} ${firstItem.name}` : "—"}
        />
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-surface-2 px-4 py-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-white shadow-md">
        {icon}
      </span>
      <div>
        <p className="text-[11px] uppercase tracking-wide text-text-muted">{label}</p>
        <p className="font-display text-sm font-bold text-text-primary">{value}</p>
      </div>
    </div>
  );
}
