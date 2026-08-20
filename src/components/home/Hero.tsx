"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ChevronDown } from "lucide-react";
import { useLocale } from "@/i18n/LocaleContext";

export default function Hero() {
  const { t } = useLocale();
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-20 sm:px-6 sm:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-8 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-white/10 opacity-60 blur-[100px]"
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface px-4 py-1.5 text-xs font-medium text-text-secondary shadow-sm"
        >
          <Sparkles size={13} className="animate-wiggle text-white/70" />
          {t("hero.badge")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-gradient animate-gradient font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#careers"
            className="group relative overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black shadow-lg shadow-white/20 transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 inline-flex items-center gap-1.5">
              {t("hero.cta")}
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-text-muted"
        >
          <span className="rounded-full border border-border-soft bg-surface px-3 py-1">{t("home.step1")}</span>
          <ArrowRight size={12} className="text-white/60" />
          <span className="rounded-full border border-border-soft bg-surface px-3 py-1">{t("home.step2")}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="#careers"
            aria-label="Scroll to careers"
            className="animate-bob flex h-9 w-9 items-center justify-center rounded-full border border-border-soft bg-surface text-text-muted transition-colors hover:border-border-strong hover:text-text-primary"
          >
            <ChevronDown size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
