"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Career } from "@/types";

const difficultyDots = 5;

export default function CareerCard({ career, index }: { career: Career; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 12) * 0.04 }}
    >
      <Link href={`/careers/${career.slug}`} className="group block h-full">
        <div className="relative h-full overflow-hidden rounded-2xl border border-border-soft bg-surface p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-border-strong hover:shadow-2xl hover:shadow-violet-500/10">
          <div
            className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${career.color} opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40`}
          />
          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-4 flex items-start justify-between">
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${career.color} text-2xl shadow-lg`}
              >
                {career.emoji}
              </span>
              <ArrowUpRight
                size={18}
                className="text-text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text-primary group-hover:opacity-100"
              />
            </div>

            <h3 className="font-display text-lg font-bold text-text-primary">{career.name}</h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-text-muted">
              {career.category}
            </p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">{career.tagline}</p>

            <div className="mt-4 flex items-center justify-between border-t border-border-soft pt-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: difficultyDots }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full ${
                      i < career.stats.difficulty ? "bg-gradient-to-br " + career.color : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-text-muted">
                {career.pathway.reduce((n, s) => n + s.nodes.filter((no) => no.kind === "skill" || no.kind === "certification").length, 0)}{" "}
                skills
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
