"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useLocale } from "@/i18n/LocaleContext";

const floatingEmojis = [
  { emoji: "💻", top: "12%", left: "8%", delay: 0 },
  { emoji: "🔐", top: "22%", left: "88%", delay: 0.4 },
  { emoji: "🤖", top: "70%", left: "6%", delay: 0.8 },
  { emoji: "☁️", top: "8%", left: "48%", delay: 1.2 },
  { emoji: "🎮", top: "76%", left: "90%", delay: 0.6 },
  { emoji: "📊", top: "50%", left: "94%", delay: 1.0 },
];

export default function Hero() {
  const { t } = useLocale();
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-24 sm:px-6 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        {floatingEmojis.map((f, i) => (
          <motion.span
            key={i}
            className="absolute select-none text-3xl opacity-70 animate-bob"
            style={{ top: f.top, left: f.left, animationDelay: `${f.delay}s` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: f.delay, duration: 1 }}
          >
            {f.emoji}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface px-4 py-1.5 text-xs font-medium text-text-secondary shadow-sm"
        >
          <Sparkles size={13} className="text-emerald-400" />
          {t("hero.badge")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gradient font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
            className="rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/30 transition-transform hover:scale-105"
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
          <ArrowRight size={12} className="text-emerald-500" />
          <span className="rounded-full border border-border-soft bg-surface px-3 py-1">{t("home.step2")}</span>
        </motion.div>
      </div>
    </section>
  );
}
