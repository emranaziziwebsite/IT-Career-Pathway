"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import { allCareers, careersById } from "@/data/careers";
import CompareCard from "./CompareCard";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/LocaleContext";
import { translateCareer } from "@/i18n/content/translate";

const MAX_SELECTED = 3;

export default function CompareView({ initialIds }: { initialIds: string[] }) {
  const valid = initialIds.filter((id) => careersById[id]);
  const [selected, setSelected] = useState<string[]>(valid.slice(0, MAX_SELECTED));
  const { t, locale } = useLocale();

  function toggle(id: string) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_SELECTED) return prev;
      return [...prev, id];
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface px-4 py-1.5 text-xs text-text-secondary">
          <Scale size={13} className="text-cyan-500" />
          {t("compare.pickUpTo")}
        </div>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">{t("compare.title")}</h1>
        <p className="mt-2 text-text-secondary">{t("compare.subtitle")}</p>
      </div>

      <div className="no-scrollbar mb-10 flex flex-wrap justify-center gap-2">
        {allCareers.map((c) => {
          const active = selected.includes(c.id);
          const disabled = !active && selected.length >= MAX_SELECTED;
          const cT = translateCareer(c, locale);
          return (
            <button
              key={c.id}
              disabled={disabled}
              onClick={() => toggle(c.id)}
              className={cn(
                "rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition-colors",
                active
                  ? "border-transparent bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                  : disabled
                  ? "cursor-not-allowed border-border-soft text-text-muted opacity-40"
                  : "border-border-soft bg-surface text-text-secondary hover:border-border-strong hover:text-text-primary"
              )}
            >
              {c.emoji} {cT.name}
            </button>
          );
        })}
      </div>

      {selected.length < 2 ? (
        <div className="toon-card glass mx-auto max-w-md rounded-3xl border-2 border-border-soft p-8 text-center text-text-secondary">
          {t("compare.selectAtLeastTwo")}
        </div>
      ) : (
        <motion.div
          layout
          className="no-scrollbar flex justify-center gap-5 overflow-x-auto pb-4"
        >
          {selected.map((id) => (
            <CompareCard key={id} career={careersById[id]} onRemove={() => toggle(id)} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
