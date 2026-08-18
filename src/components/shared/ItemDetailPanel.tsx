"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  X,
  CheckCircle2,
  Circle,
  Flame,
  ArrowRight,
  Trophy,
  Gift,
  Briefcase,
  BadgeCheck,
  Hammer,
  Compass,
} from "lucide-react";
import { getItem } from "@/data/items";
import { careersUsingItem } from "@/lib/search";
import { ProgressState, ResourceType } from "@/types";
import { cn } from "@/lib/utils";

const resourceMeta: Record<ResourceType, { label: string; icon: React.ReactNode; color: string }> = {
  best: { label: "Best Course", icon: <Trophy size={14} />, color: "text-amber-300 bg-amber-500/10" },
  free: { label: "Best Free Option", icon: <Gift size={14} />, color: "text-emerald-300 bg-emerald-500/10" },
  "job-focused": { label: "Job-Focused Pick", icon: <Briefcase size={14} />, color: "text-cyan-300 bg-cyan-500/10" },
  certification: { label: "Certification", icon: <BadgeCheck size={14} />, color: "text-violet-300 bg-violet-500/10" },
};

const progressMeta: Record<ProgressState, { label: string; icon: React.ReactNode; color: string }> = {
  "not-started": { label: "Not Started", icon: <Circle size={14} />, color: "text-text-muted" },
  learning: { label: "Learning", icon: <Flame size={14} />, color: "text-amber-300" },
  completed: { label: "Completed", icon: <CheckCircle2 size={14} />, color: "text-emerald-300" },
  current: { label: "Current", icon: <Compass size={14} />, color: "text-cyan-300" },
  locked: { label: "Locked", icon: <Circle size={14} />, color: "text-text-muted" },
};

export interface CareerContext {
  status: ProgressState;
  onCycle: () => void;
}

export default function ItemDetailPanel({
  itemId,
  open,
  onClose,
  onNavigate,
  careerContext,
}: {
  itemId: string | null;
  open: boolean;
  onClose: () => void;
  onNavigate: (itemId: string) => void;
  careerContext?: CareerContext;
}) {
  const item = itemId ? getItem(itemId) : undefined;
  const relatedCareers = itemId ? careersUsingItem(itemId) : [];

  return (
    <AnimatePresence>
      {open && item && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="glass fixed right-0 top-0 z-[95] h-full w-full max-w-md overflow-y-auto shadow-2xl shadow-black/60 sm:max-w-lg"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-border-soft bg-surface/90 px-6 py-5 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-2xl">
                  {item.emoji}
                </span>
                <div>
                  <h2 className="font-display text-lg font-bold text-text-primary">{item.name}</h2>
                  <p className="text-xs uppercase tracking-wide text-text-muted">
                    {item.category} · {item.difficulty}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-text-muted hover:bg-white/10 hover:text-text-primary"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6 px-6 py-6">
              <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>

              {careerContext && (
                <button
                  onClick={careerContext.onCycle}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl border border-border-soft bg-white/5 px-4 py-3 text-sm font-medium transition-colors hover:bg-white/10",
                    progressMeta[careerContext.status].color
                  )}
                >
                  <span className="flex items-center gap-2">
                    {progressMeta[careerContext.status].icon}
                    {progressMeta[careerContext.status].label}
                  </span>
                  <span className="text-xs text-text-muted">tap to update</span>
                </button>
              )}

              <div>
                <SectionLabel>Used For</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {item.usedFor.map((u) => (
                    <Chip key={u}>{u}</Chip>
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>What You&apos;ll Learn</SectionLabel>
                <ul className="space-y-1.5">
                  {item.learn.map((l) => (
                    <li key={l} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>

              {item.prerequisites.length > 0 && (
                <div>
                  <SectionLabel>Prerequisites</SectionLabel>
                  <div className="flex flex-wrap gap-2">
                    {item.prerequisites.map((p) => {
                      const pi = getItem(p);
                      return (
                        <button key={p} onClick={() => onNavigate(p)}>
                          <Chip interactive>{pi ? `${pi.emoji} ${pi.name}` : p}</Chip>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {item.nextSteps.length > 0 && (
                <div>
                  <SectionLabel>What Comes Next</SectionLabel>
                  <div className="flex flex-wrap gap-2">
                    {item.nextSteps.map((n) => {
                      const ni = getItem(n);
                      return (
                        <button key={n} onClick={() => onNavigate(n)}>
                          <Chip interactive>
                            <span className="flex items-center gap-1">
                              {ni ? `${ni.emoji} ${ni.name}` : n} <ArrowRight size={11} />
                            </span>
                          </Chip>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <SectionLabel>Recommended Resources</SectionLabel>
                <p className="mb-2 text-xs text-text-muted">
                  Starting points, not absolutes — the right pick depends on your budget and background.
                </p>
                <div className="space-y-2">
                  {item.resources.map((r, i) => (
                    <div key={i} className="rounded-xl border border-border-soft bg-white/[0.03] p-3">
                      <div className="flex items-center justify-between">
                        <span
                          className={cn(
                            "flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                            resourceMeta[r.type].color
                          )}
                        >
                          {resourceMeta[r.type].icon}
                          {resourceMeta[r.type].label}
                        </span>
                        <span className="text-[11px] text-text-muted">
                          {r.cost === "free" ? "🆓 Free" : "💰 Paid"} · {r.level}
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-medium text-text-primary">{r.title}</p>
                      <p className="text-xs text-text-muted">{r.provider}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>Practice Projects</SectionLabel>
                <ul className="space-y-1.5">
                  {item.projects.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-text-secondary">
                      <Hammer size={13} className="mt-0.5 shrink-0 text-violet-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {relatedCareers.length > 0 && (
                <div>
                  <SectionLabel>Careers Using This</SectionLabel>
                  <div className="flex flex-wrap gap-2">
                    {relatedCareers.map((c) => (
                      <Link key={c.id} href={`/careers/${c.slug}`}>
                        <Chip interactive>
                          {c.emoji} {c.name}
                        </Chip>
                      </Link>
                    ))}
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
        "inline-flex items-center rounded-full border border-border-soft bg-white/5 px-3 py-1 text-xs font-medium text-text-secondary",
        interactive && "cursor-pointer transition-colors hover:border-border-strong hover:bg-white/10 hover:text-text-primary"
      )}
    >
      {children}
    </span>
  );
}
