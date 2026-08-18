"use client";

import Link from "next/link";
import { Career } from "@/types";
import { getItems } from "@/data/items";
import { careersById } from "@/data/careers";
import { useLocale } from "@/i18n/LocaleContext";
import { translateCareer, translateCategory, translateItem } from "@/i18n/content/translate";
import { TranslationKey } from "@/i18n/dictionary";

const statRows: { key: keyof Career["stats"]; labelKey: TranslationKey }[] = [
  { key: "difficulty", labelKey: "compare.statDifficulty" },
  { key: "math", labelKey: "compare.statMath" },
  { key: "creativity", labelKey: "compare.statCreativity" },
  { key: "peopleWork", labelKey: "compare.statPeople" },
  { key: "handsOnHardware", labelKey: "compare.statHardware" },
  { key: "dataFocus", labelKey: "compare.statData" },
];

export default function CompareCard({ career: rawCareer, onRemove }: { career: Career; onRemove: () => void }) {
  const { t, locale } = useLocale();
  const career = translateCareer(rawCareer, locale);
  const techIds = [...rawCareer.languages, ...rawCareer.frameworks, ...rawCareer.libraries].slice(0, 6);
  const techItems = getItems(techIds).map((i) => translateItem(i, locale));
  const toolItems = getItems(rawCareer.tools.slice(0, 5)).map((i) => translateItem(i, locale));
  const certItems = getItems(rawCareer.certifications.slice(0, 4)).map((i) => translateItem(i, locale));

  return (
    <div className="toon-card glass w-[280px] shrink-0 rounded-3xl border-2 border-border-soft p-5 sm:w-[320px]">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${rawCareer.color} text-2xl`}
          >
            {rawCareer.emoji}
          </span>
          <div>
            <p className="font-display text-sm font-bold text-text-primary">{career.name}</p>
            <p className="text-[11px] text-text-muted">{translateCategory(rawCareer.category, locale)}</p>
          </div>
        </div>
        <button onClick={onRemove} className="text-xs text-text-muted hover:text-text-primary">
          ✕
        </button>
      </div>

      <div className="space-y-2.5">
        {statRows.map((row) => {
          const value = rawCareer.stats[row.key];
          return (
            <div key={row.labelKey}>
              <div className="mb-1 flex justify-between text-[11px] text-text-muted">
                <span>{t(row.labelKey)}</span>
                <span>{value}/5</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/5">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${rawCareer.color}`}
                  style={{ width: `${(value / 5) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <Section title={t("compare.mainTech")}>
        <ChipRow items={techItems.map((i) => `${i.emoji} ${i.name}`)} />
      </Section>

      <Section title={t("compare.mainTools")}>
        <ChipRow items={toolItems.map((i) => `${i.emoji} ${i.name}`)} />
      </Section>

      <Section title={t("compare.certifications")}>
        {certItems.length > 0 ? (
          <ChipRow items={certItems.map((i) => `${i.emoji} ${i.name}`)} />
        ) : (
          <p className="text-xs text-text-muted">{t("compare.noneRequired")}</p>
        )}
      </Section>

      <Section title={t("compare.typicalProjects")}>
        <ul className="space-y-1">
          {career.projects.slice(0, 3).map((p) => (
            <li key={p} className="text-xs text-text-secondary">
              • {p}
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t("compare.learningAreas")}>
        <ChipRow items={career.pathway.slice(0, -2).map((s) => `${s.emoji} ${s.title}`)} />
      </Section>

      <Section title={t("compare.relatedCareers")}>
        <div className="flex flex-wrap gap-1.5">
          {rawCareer.relatedCareers.slice(0, 3).map((id) => {
            const rc = careersById[id];
            if (!rc) return null;
            const rcT = translateCareer(rc, locale);
            return (
              <Link
                key={id}
                href={`/careers/${rc.slug}`}
                className="rounded-full border border-border-soft px-2 py-0.5 text-[11px] text-text-secondary hover:border-border-strong hover:text-text-primary"
              >
                {rcT.name}
              </Link>
            );
          })}
        </div>
      </Section>

      <Link
        href={`/careers/${rawCareer.slug}`}
        className="mt-4 block rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-2 text-center text-xs font-semibold text-white hover:opacity-90"
      >
        {t("compare.viewFullPathway")}
      </Link>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 border-t border-border-soft pt-3">
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-muted">{title}</p>
      {children}
    </div>
  );
}

function ChipRow({ items }: { items: string[] }) {
  if (items.length === 0) return <p className="text-xs text-text-muted">—</p>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((i) => (
        <span key={i} className="rounded-full bg-black/5 px-2 py-0.5 text-[11px] text-text-secondary">
          {i}
        </span>
      ))}
    </div>
  );
}
