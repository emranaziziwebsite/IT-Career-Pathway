"use client";

import { motion } from "framer-motion";
import { Hammer, Rocket } from "lucide-react";
import { PathwayNode } from "@/types";
import { getItem } from "@/data/items";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/LocaleContext";
import { translateItem } from "@/i18n/content/translate";

export default function NodeCard({
  node,
  onClick,
  isStart,
}: {
  node: PathwayNode;
  onClick: () => void;
  isStart?: boolean;
}) {
  const { t, locale } = useLocale();

  if (node.kind === "milestone") {
    return (
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="flex flex-col items-center gap-1.5 rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-amber-300/30 to-yellow-300/20 px-6 py-4 text-center shadow-[0_0_30px_-6px_rgba(251,191,36,0.7)]"
      >
        <span className="text-3xl">{node.emoji ?? "🏆"}</span>
        <span className="font-display text-sm font-bold text-text-primary">{node.label}</span>
      </motion.button>
    );
  }

  if (node.kind === "project-group") {
    return (
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="flex min-w-[132px] flex-col items-center gap-1.5 rounded-2xl border-2 border-dashed border-violet-300 bg-violet-50 px-4 py-3.5 text-center transition-colors hover:bg-violet-100"
      >
        <span className="text-2xl">{node.emoji ?? <Hammer size={20} />}</span>
        <span className="text-xs font-semibold text-text-primary">{node.label}</span>
        <span className="text-[10px] text-text-muted">
          {node.projects?.length ?? 0} {t("roadmap.ideas")}
        </span>
      </motion.button>
    );
  }

  const rawItem = node.itemId ? getItem(node.itemId) : undefined;
  const item = rawItem ? translateItem(rawItem, locale) : undefined;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06, y: -3, rotate: -1 }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "toon-card relative flex min-w-[104px] flex-col items-center gap-1.5 rounded-2xl border-2 bg-surface px-4 py-3.5 text-center",
        isStart ? "border-emerald-400" : "border-border-soft"
      )}
    >
      {isStart && (
        <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-md">
          <Rocket size={10} /> {t("roadmap.startHere")}
        </span>
      )}
      <span className="text-2xl">{item?.emoji ?? node.emoji ?? "❔"}</span>
      <span className="text-xs font-semibold text-text-primary">{item?.name ?? node.label}</span>
    </motion.button>
  );
}
