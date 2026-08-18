"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Hammer, FlaskConical } from "lucide-react";
import { allCareers, careerCategories } from "@/data/careers";
import { cn } from "@/lib/utils";

export default function ProjectsView() {
  const [category, setCategory] = useState("All");

  const filtered = useMemo(
    () => (category === "All" ? allCareers : allCareers.filter((c) => c.category === category)),
    [category]
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Project Ideas</h1>
        <p className="mt-2 text-text-secondary">
          Real things to build for every career — the fastest way to actually learn.
        </p>
      </div>

      <div className="no-scrollbar mb-10 flex justify-center gap-2 overflow-x-auto pb-1">
        {["All", ...careerCategories].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
              category === cat
                ? "border-transparent bg-gradient-to-r from-cyan-500 to-violet-500 text-white"
                : "border-border-soft bg-surface text-text-secondary hover:border-border-strong hover:text-text-primary"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((career) => (
          <div key={career.id} className="glass rounded-2xl p-5">
            <div className="mb-3 flex items-center gap-3">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${career.color} text-xl`}
              >
                {career.emoji}
              </span>
              <p className="font-display font-bold text-text-primary">{career.name}</p>
            </div>

            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-text-muted">
              <Hammer size={12} /> Flagship Projects
            </p>
            <ul className="mb-4 space-y-1">
              {career.projects.map((p) => (
                <li key={p} className="text-sm text-text-secondary">
                  • {p}
                </li>
              ))}
            </ul>

            {career.labs.length > 0 && (
              <>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-text-muted">
                  <FlaskConical size={12} /> Labs
                </p>
                <ul className="mb-4 space-y-1">
                  {career.labs.map((l) => (
                    <li key={l} className="text-sm text-text-secondary">
                      • {l}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <Link
              href={`/careers/${career.slug}`}
              className="mt-1 inline-block text-xs font-semibold text-cyan-300 hover:text-cyan-200"
            >
              See full pathway →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
