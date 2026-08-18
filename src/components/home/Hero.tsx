"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Sparkles } from "lucide-react";

const floatingEmojis = [
  { emoji: "💻", top: "12%", left: "8%", delay: 0 },
  { emoji: "🔐", top: "22%", left: "88%", delay: 0.4 },
  { emoji: "🤖", top: "70%", left: "6%", delay: 0.8 },
  { emoji: "☁️", top: "8%", left: "48%", delay: 1.2 },
  { emoji: "🎮", top: "76%", left: "90%", delay: 0.6 },
  { emoji: "📊", top: "50%", left: "94%", delay: 1.0 },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-24 sm:px-6 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        {floatingEmojis.map((f, i) => (
          <motion.span
            key={i}
            className="absolute select-none text-3xl opacity-40 animate-float-slow"
            style={{ top: f.top, left: f.left, animationDelay: `${f.delay}s` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
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
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-soft bg-white/5 px-4 py-1.5 text-xs font-medium text-text-secondary"
        >
          <Sparkles size={13} className="text-cyan-400" />
          20 careers · 100+ skills mapped · always free to explore
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
        >
          Where do you want to go
          <br />
          in <span className="text-gradient">IT?</span> 🚀
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-base text-text-secondary sm:text-lg"
        >
          Pick a career below and get an interactive, game-like pathway of exactly what to learn —
          languages, frameworks, tools, certifications, and projects — from zero to job-ready.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#careers"
            className="rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-transform hover:scale-105"
          >
            Explore Careers ↓
          </a>
          <Link
            href="/finder"
            className="flex items-center gap-2 rounded-full border border-border-soft bg-surface px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-border-strong hover:bg-white/5"
          >
            <Compass size={16} />
            Not sure? Take the Career Finder
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
