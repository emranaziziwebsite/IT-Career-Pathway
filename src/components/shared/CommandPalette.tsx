"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Sparkles } from "lucide-react";
import { searchAll } from "@/lib/search";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/LocaleContext";

export default function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [wasOpen, setWasOpen] = useState(open);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { t, locale } = useLocale();

  const results = useMemo(() => searchAll(query, locale, 10), [query, locale]);

  // Reset the palette's state when it transitions to open, without an effect
  // (see https://react.dev/learn/you-might-not-need-an-effect#adjusting-state-based-on-a-prop-change).
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setQuery("");
      setActiveIndex(0);
    }
  }

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  function handleQueryChange(value: string) {
    setQuery(value);
    setActiveIndex(0);
  }

  function go(href: string) {
    router.push(href);
    onClose();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = results[activeIndex];
      if (r) go(r.href);
    } else if (e.key === "Escape") {
      onClose();
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="glass relative w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl shadow-black/60"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex items-center gap-3 border-b border-border-soft px-4 py-3">
              <Search size={18} className="text-text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("search.placeholder")}
                className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
              />
              <button
                onClick={onClose}
                className="rounded-md p-1 text-text-muted hover:bg-emerald-500/10 hover:text-text-primary"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {query.trim() === "" && (
                <div className="flex flex-col items-center gap-2 px-6 py-10 text-center text-text-muted">
                  <Sparkles size={22} className="text-emerald-400" />
                  <p className="text-sm">{t("search.hint")}</p>
                </div>
              )}
              {query.trim() !== "" && results.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-text-muted">
                  {t("search.empty")} &ldquo;{query}&rdquo;
                </p>
              )}
              {results.map((r, i) => (
                <button
                  key={`${r.type}-${r.id}`}
                  onClick={() => go(r.href)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                    i === activeIndex ? "bg-emerald-500/10" : "hover:bg-emerald-500/5"
                  )}
                >
                  <span className="text-xl">{r.emoji}</span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-text-primary">{r.title}</span>
                    <span className="block text-xs text-text-muted">{r.subtitle}</span>
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                      r.type === "career" ? "bg-emerald-500/15 text-emerald-300" : "bg-lime-500/15 text-lime-300"
                    )}
                  >
                    {r.type === "career" ? t("search.tagCareer") : t("search.tagTech")}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
