"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Flame, Lock, Compass, Hammer } from "lucide-react";
import { PathwayNode, ProgressState } from "@/types";
import { getItem } from "@/data/items";
import { cn } from "@/lib/utils";

const statusRing: Record<ProgressState, string> = {
  "not-started": "border-border-soft",
  learning: "border-amber-400/70 shadow-[0_0_20px_-4px_rgba(251,191,36,0.6)]",
  completed: "border-emerald-400/70 shadow-[0_0_20px_-4px_rgba(52,211,153,0.6)]",
  current: "border-cyan-400/80 shadow-[0_0_24px_-4px_rgba(34,211,238,0.7)]",
  locked: "border-border-soft opacity-45",
};

const statusBadge: Record<ProgressState, React.ReactNode> = {
  "not-started": null,
  learning: <Flame size={12} className="text-amber-300" />,
  completed: <CheckCircle2 size={12} className="text-emerald-300" />,
  current: <Compass size={12} className="text-cyan-300" />,
  locked: <Lock size={11} className="text-text-muted" />,
};

export default function NodeCard({
  node,
  status,
  onClick,
}: {
  node: PathwayNode;
  status: ProgressState;
  onClick: () => void;
}) {
  if (node.kind === "milestone") {
    return (
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "flex flex-col items-center gap-1.5 rounded-2xl border-2 px-6 py-4 text-center",
          status === "completed"
            ? "border-amber-400 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 shadow-[0_0_30px_-6px_rgba(251,191,36,0.7)]"
            : "border-dashed border-border-soft opacity-60"
        )}
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
        className="flex min-w-[132px] flex-col items-center gap-1.5 rounded-2xl border border-dashed border-violet-400/40 bg-violet-500/5 px-4 py-3.5 text-center transition-colors hover:bg-violet-500/10"
      >
        <span className="text-2xl">{node.emoji ?? <Hammer size={20} />}</span>
        <span className="text-xs font-semibold text-text-primary">{node.label}</span>
        <span className="text-[10px] text-text-muted">{node.projects?.length ?? 0} ideas</span>
      </motion.button>
    );
  }

  const item = node.itemId ? getItem(node.itemId) : undefined;
  const disabled = status === "locked";

  return (
    <motion.button
      onClick={onClick}
      whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      className={cn(
        "relative flex min-w-[104px] flex-col items-center gap-1.5 rounded-2xl border bg-surface px-4 py-3.5 text-center transition-shadow",
        statusRing[status],
        status === "current" && "animate-pulse-ring",
        disabled ? "cursor-pointer" : "cursor-pointer hover:bg-surface-2"
      )}
    >
      {statusBadge[status] && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-void ring-1 ring-border-soft">
          {statusBadge[status]}
        </span>
      )}
      <span className={cn("text-2xl", disabled && "grayscale")}>{item?.emoji ?? node.emoji ?? "❔"}</span>
      <span className="text-xs font-semibold text-text-primary">{item?.name ?? node.label}</span>
    </motion.button>
  );
}
