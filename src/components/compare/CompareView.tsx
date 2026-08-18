"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import { allCareers, careersById } from "@/data/careers";
import CompareCard from "./CompareCard";
import { cn } from "@/lib/utils";

const MAX_SELECTED = 3;

export default function CompareView({ initialIds }: { initialIds: string[] }) {
  const valid = initialIds.filter((id) => careersById[id]);
  const [selected, setSelected] = useState<string[]>(valid.slice(0, MAX_SELECTED));

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
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border-soft bg-white/5 px-4 py-1.5 text-xs text-text-secondary">
          <Scale size={13} className="text-cyan-400" />
          Pick up to {MAX_SELECTED} careers
        </div>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Compare Careers</h1>
        <p className="mt-2 text-text-secondary">See how paths stack up before you commit to one.</p>
      </div>

      <div className="no-scrollbar mb-10 flex flex-wrap justify-center gap-2">
        {allCareers.map((c) => {
          const active = selected.includes(c.id);
          const disabled = !active && selected.length >= MAX_SELECTED;
          return (
            <button
              key={c.id}
              disabled={disabled}
              onClick={() => toggle(c.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "border-transparent bg-gradient-to-r from-cyan-500 to-violet-500 text-white"
                  : disabled
                  ? "cursor-not-allowed border-border-soft text-text-muted opacity-40"
                  : "border-border-soft bg-surface text-text-secondary hover:border-border-strong hover:text-text-primary"
              )}
            >
              {c.emoji} {c.name}
            </button>
          );
        })}
      </div>

      {selected.length < 2 ? (
        <div className="glass mx-auto max-w-md rounded-2xl p-8 text-center text-text-secondary">
          Select at least two careers above to see a side-by-side comparison.
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
