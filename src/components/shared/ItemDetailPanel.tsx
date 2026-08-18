"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  X,
  ArrowRight,
  Trophy,
  Gift,
  Briefcase,
  BadgeCheck,
  Hammer,
  Clock,
} from "lucide-react";
import { getItem } from "@/data/items";
import { careersUsingItem } from "@/lib/search";
import { ResourceType } from "@/types";
import { cn } from "@/lib/utils";
import { hoursForDifficulty } from "@/lib/estimate";
import { useLocale } from "@/i18n/LocaleContext";
import { translateItem, translateItemCategory, translateCareer } from "@/i18n/content/translate";
import { TranslationKey } from "@/i18n/dictionary";

const resourceMeta: Record<ResourceType, { key: TranslationKey; icon: React.ReactNode; color: string }> = {
  best: { key: "item.resourceBest", icon: <Trophy size={14} />, color: "text-amber-300 bg-amber-500/10" },
  free: { key: "item.resourceFree", icon: <Gift size={14} />, color: "text-emerald-300 bg-emerald-500/10" },
  "job-focused": { key: "item.resourceJob", icon: <Briefcase size={14} />, color: "text-lime-300 bg-lime-500/10" },
  certification: { key: "item.resourceCert", icon: <BadgeCheck size={14} />, color: "text-teal-300 bg-teal-500/10" },
};

export default function ItemDetailPanel({
  itemId,
  open,
  onClose,
  onNavigate,
}: {
  itemId: string | null;
  open: boolean;
  onClose: () => void;
  onNavigate: (itemId: string) => void;
}) {
  const { t, locale } = useLocale();
  const rawItem = itemId ? getItem(itemId) : undefined;
  const item = rawItem ? translateItem(rawItem, locale) : undefined;
  const relatedCareers = itemId ? careersUsingItem(itemId) : [];

  return (
    <AnimatePresence>
      {open && item && rawItem && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="glass fixed end-0 top-0 z-[95] h-full w-full max-w-md overflow-y-auto shadow-2xl shadow-black/60 sm:max-w-lg"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-border-soft bg-surface/90 px-6 py-5 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl">
                  {rawItem.emoji}
                </span>
                <div>
                  <h2 className="font-display text-lg font-bold text-text-primary">{item.name}</h2>
                  <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-text-muted">
                    {translateItemCategory(rawItem.category, locale)} · {t(`level.${rawItem.difficulty}` as TranslationKey)}
                    <span className="flex items-center gap-0.5 text-emerald-400">
                      · <Clock size={11} /> ~{hoursForDifficulty(rawItem.difficulty)}h {t("item.hoursToLearn")}
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-text-muted hover:bg-emerald-500/10 hover:text-text-primary"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6 px-6 py-6">
              <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>

              <div>
                <SectionLabel>{t("item.usedFor")}</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {item.usedFor.map((u) => (
                    <Chip key={u}>{u}</Chip>
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>{t("item.whatYoullLearn")}</SectionLabel>
                <ul className="space-y-1.5">
                  {item.learn.map((l) => (
                    <li key={l} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>

              {rawItem.prerequisites.length > 0 && (
                <div>
                  <SectionLabel>{t("item.prerequisites")}</SectionLabel>
                  <div className="flex flex-wrap gap-2">
                    {rawItem.prerequisites.map((p) => {
                      const pi = getItem(p);
                      const piT = pi ? translateItem(pi, locale) : undefined;
                      return (
                        <button key={p} onClick={() => onNavigate(p)}>
                          <Chip interactive>{piT ? `${piT.emoji} ${piT.name}` : p}</Chip>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {rawItem.nextSteps.length > 0 && (
                <div>
                  <SectionLabel>{t("item.whatComesNext")}</SectionLabel>
                  <div className="flex flex-wrap gap-2">
                    {rawItem.nextSteps.map((n) => {
                      const ni = getItem(n);
                      const niT = ni ? translateItem(ni, locale) : undefined;
                      return (
                        <button key={n} onClick={() => onNavigate(n)}>
                          <Chip interactive>
                            <span className="flex items-center gap-1">
                              {niT ? `${niT.emoji} ${niT.name}` : n} <ArrowRight size={11} />
                            </span>
                          </Chip>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <SectionLabel>{t("item.recommendedResources")}</SectionLabel>
                <div className="space-y-2">
                  {rawItem.resources.map((r, i) => (
                    <div key={i} className="rounded-xl border border-border-soft bg-white/[0.02] p-3">
                      <div className="flex items-center justify-between">
                        <span
                          className={cn(
                            "flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                            resourceMeta[r.type].color
                          )}
                        >
                          {resourceMeta[r.type].icon}
                          {t(resourceMeta[r.type].key)}
                        </span>
                        <span className="text-[11px] text-text-muted">
                          {r.cost === "free" ? t("item.free") : t("item.paid")} · {t(`level.${r.level}` as TranslationKey)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-medium text-text-primary">{r.title}</p>
                      <p className="text-xs text-text-muted">{r.provider}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>{t("item.practiceProjects")}</SectionLabel>
                <ul className="space-y-1.5">
                  {item.projects.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-text-secondary">
                      <Hammer size={13} className="mt-0.5 shrink-0 text-lime-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {relatedCareers.length > 0 && (
                <div>
                  <SectionLabel>{t("item.careersUsingThis")}</SectionLabel>
                  <div className="flex flex-wrap gap-2">
                    {relatedCareers.map((c) => {
                      const cT = translateCareer(c, locale);
                      return (
                        <Link key={c.id} href={`/careers/${c.slug}`}>
                          <Chip interactive>
                            {c.emoji} {cT.name}
                          </Chip>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">{children}</h3>
  );
}

function Chip({ children, interactive }: { children: React.ReactNode; interactive?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border-soft bg-white/[0.03] px-3 py-1 text-xs font-medium text-text-secondary",
        interactive && "cursor-pointer transition-colors hover:border-border-strong hover:bg-emerald-500/10 hover:text-text-primary"
      )}
    >
      {children}
    </span>
  );
}
