"use client";

import { CheckCircle2, Flame, Lock, RotateCcw } from "lucide-react";
import { PathwaySection, ProgressState } from "@/types";
import { getItem } from "@/data/items";
import { getTrackableNodes } from "@/lib/progress";

export default function ProgressSummary({
  careerName,
  sections,
  statuses,
  percent,
  onReset,
}: {
  careerName: string;
  sections: PathwaySection[];
  statuses: Record<string, ProgressState>;
  percent: number;
  onReset: () => void;
}) {
  const trackable = getTrackableNodes(sections);
  const completed = trackable.filter((n) => statuses[n.id] === "completed");
  const learning = trackable.filter((n) => statuses[n.id] === "learning");
  const next = trackable.filter((n) => statuses[n.id] === "current" || statuses[n.id] === "locked").slice(0, 4);

  return (
    <div className="glass rounded-2xl p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-text-muted">Your Journey</p>
          <h3 className="font-display text-lg font-bold text-text-primary">{careerName}</h3>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl font-bold text-gradient">{percent}%</p>
          {percent >= 100 && <p className="text-[11px] font-semibold text-amber-300">🏆 Job Ready!</p>}
        </div>
      </div>

      <div className="mb-5 h-2.5 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ProgressColumn
          icon={<CheckCircle2 size={14} className="text-emerald-300" />}
          label="Completed"
          items={completed.map((n) => getItem(n.itemId ?? "")?.name).filter(Boolean) as string[]}
          empty="Nothing yet — pick a node below to start."
        />
        <ProgressColumn
          icon={<Flame size={14} className="text-amber-300" />}
          label="Learning"
          items={learning.map((n) => getItem(n.itemId ?? "")?.name).filter(Boolean) as string[]}
          empty="Nothing in progress."
        />
        <ProgressColumn
          icon={<Lock size={14} className="text-cyan-300" />}
          label="Up Next"
          items={next.map((n) => getItem(n.itemId ?? "")?.name).filter(Boolean) as string[]}
          empty="You're at the end of the path!"
        />
      </div>

      {(completed.length > 0 || learning.length > 0) && (
        <button
          onClick={onReset}
          className="mt-5 flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-text-primary"
        >
          <RotateCcw size={12} /> Reset progress for this career
        </button>
      )}
    </div>
  );
}

function ProgressColumn({
  icon,
  label,
  items,
  empty,
}: {
  icon: React.ReactNode;
  label: string;
  items: string[];
  empty: string;
}) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-text-muted">
        {icon}
        {label}
      </p>
      {items.length === 0 ? (
        <p className="text-xs text-text-muted">{empty}</p>
      ) : (
        <ul className="space-y-1">
          {items.map((name) => (
            <li key={name} className="text-sm text-text-secondary">
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
