"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useLocale } from "@/i18n/LocaleContext";

export default function Hero() {
  const { t } = useLocale();
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 sm:pt-28">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface px-4 py-1.5 text-xs font-medium text-text-secondary shadow-sm"
        >
          <Sparkles size={13} className="text-white/70" />
          {t("hero.badge")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-gradient font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-5 max-w-xl text-base text-text-secondary sm:text-lg"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#careers"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-white/20 transition-transform hover:scale-105"
          >
            {t("hero.cta")}
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
      </div>
    </section>
  );
}
