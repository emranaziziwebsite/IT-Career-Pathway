"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { allItems } from "@/data/items";
import ItemDetailPanel from "@/components/shared/ItemDetailPanel";
import { cn } from "@/lib/utils";

const categoryLabels: Record<string, string> = {
  language: "Languages",
  framework: "Frameworks",
  library: "Libraries",
  database: "Databases",
  tool: "Tools",
  platform: "Platforms",
  concept: "Concepts",
  certification: "Certifications",
  protocol: "Protocols",
  os: "Operating Systems",
};

export default function TechnologiesView({ initialItemId }: { initialItemId?: string }) {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [activeItemId, setActiveItemId] = useState<string | null>(initialItemId ?? null);

  const categories = useMemo(() => Array.from(new Set(allItems.map((i) => i.category))), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter((item) => {
      if (category !== "All" && item.category !== category) return false;
      if (q && !item.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [category, query]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Technologies</h1>
        <p className="mt-2 text-text-secondary">
          Every language, framework, tool, and certification mapped across all careers.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {["All", ...categories].map((cat) => (
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
              {cat === "All" ? "All" : categoryLabels[cat] ?? cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border-soft bg-surface px-3 py-1.5">
          <Search size={14} className="text-text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by name…"
            className="w-40 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filtered.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItemId(item.id)}
            className="flex flex-col items-center gap-2 rounded-2xl border border-border-soft bg-surface p-4 text-center transition-all hover:-translate-y-1 hover:border-border-strong hover:bg-surface-2"
          >
            <span className="text-2xl">{item.emoji}</span>
            <span className="text-xs font-semibold text-text-primary">{item.name}</span>
            <span className="text-[10px] uppercase tracking-wide text-text-muted">
              {categoryLabels[item.category] ?? item.category}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-text-muted">No technologies match that filter.</p>
      )}

      <ItemDetailPanel
        itemId={activeItemId}
        open={activeItemId !== null}
        onClose={() => setActiveItemId(null)}
        onNavigate={(id) => setActiveItemId(id)}
      />
    </div>
  );
}
