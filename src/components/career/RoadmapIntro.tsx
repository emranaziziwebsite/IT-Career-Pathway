"use client";

import { Clock, ListChecks, Rocket, Minus, Plus } from "lucide-react";
import { PathwaySection } from "@/types";
import { getItem } from "@/data/items";
import { getTrackableNodes } from "@/lib/pathway";
import { hoursForDifficulty, durationFromHours, HOURS_PER_WEEK_OPTIONS } from "@/lib/estimate";
import { useStudyPace } from "@/lib/studyPace";
import { useLocale } from "@/i18n/LocaleContext";
import { translateItem } from "@/i18n/content/translate";

export default function RoadmapIntro({ sections }: { sections: PathwaySection[] }) {
  const { t, locale } = useLocale();
  const { hoursPerWeek, setHoursPerWeek } = useStudyPace();

  const trackable = getTrackableNodes(sections);
  const totalHours = trackable.reduce((sum, node) => {
    const item = node.itemId ? getItem(node.itemId) : undefined;
    return sum + (item ? hoursForDifficulty(item.difficulty) : 20);
  }, 0);
  const { weeks, months } = durationFromHours(totalHours, hoursPerWeek);

  const firstRawItem = trackable[0]?.itemId ? getItem(trackable[0].itemId as string) : undefined;
  const firstItem = firstRawItem ? translateItem(firstRawItem, locale) : undefined;

  const optionIndex = HOURS_PER_WEEK_OPTIONS.indexOf(hoursPerWeek);
  function step(delta: number) {
    const currentIndex = optionIndex === -1 ? 1 : optionIndex;
    const nextIndex = Math.min(HOURS_PER_WEEK_OPTIONS.length - 1, Math.max(0, currentIndex + delta));
    setHoursPerWeek(HOURS_PER_WEEK_OPTIONS[nextIndex]);
  }

  return (
    <div className="toon-card rounded-3xl border-2 border-border-soft bg-surface p-5 sm:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat icon={<ListChecks size={18} />} label={t("roadmap.skillsOnRoadmap")} value={`${trackable.length}`} />
        <Stat
          icon={<Clock size={18} />}
          label={t("roadmap.totalTime")}
          value={`~${weeks} ${t("roadmap.weeks")} (~${months} ${t("roadmap.months")})`}
        />
        <Stat
          icon={<Rocket size={18} />}
          label={t("roadmap.startWith")}
          value={firstItem ? `${firstItem.emoji} ${firstItem.name}` : "—"}
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-surface-2 px-4 py-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">{t("roadmap.pace")}</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => step(-1)}
            disabled={optionIndex <= 0}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-border-soft bg-surface text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary disabled:opacity-30"
          >
            <Minus size={13} />
          </button>
          <span className="min-w-[64px] text-center font-display text-sm font-bold text-text-primary">
            {hoursPerWeek} {t("roadmap.hoursWeekShort")}
          </span>
          <button
            onClick={() => step(1)}
            disabled={optionIndex === HOURS_PER_WEEK_OPTIONS.length - 1}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-border-soft bg-surface text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary disabled:opacity-30"
          >
            <Plus size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-surface-2 px-4 py-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-text-primary shadow-md">
        {icon}
      </span>
      <div>
        <p className="text-[11px] uppercase tracking-wide text-text-muted">{label}</p>
        <p className="font-display text-sm font-bold text-text-primary">{value}</p>
      </div>
    </div>
  );
}
