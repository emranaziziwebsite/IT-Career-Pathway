"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, ArrowLeft } from "lucide-react";
import { quizQuestions } from "@/data/quiz";
import { matchCareers } from "@/data/quiz";
import { allCareers } from "@/data/careers";
import { QuizOption } from "@/types";
import { cn } from "@/lib/utils";

const medals = ["🥇", "🥈", "🥉"];

export default function FinderQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizOption[]>([]);
  const [done, setDone] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const question = quizQuestions[step];
  const progress = Math.round((step / quizQuestions.length) * 100);

  function selectOption(option: QuizOption) {
    if (transitioning) return;
    setTransitioning(true);
    const nextAnswers = [...answers.slice(0, step), option];
    setAnswers(nextAnswers);
    setTimeout(() => {
      if (step + 1 < quizQuestions.length) {
        setStep(step + 1);
      } else {
        setDone(true);
      }
      setTransitioning(false);
    }, 260);
  }

  function restart() {
    setAnswers([]);
    setStep(0);
    setDone(false);
    setTransitioning(false);
  }

  if (done) {
    const matches = matchCareers(answers, allCareers).slice(0, 3);
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">Results are in</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Your Best Matches</h1>
          <p className="mt-2 text-text-secondary">Based on how you answered — not a life sentence, just a great place to start.</p>
        </motion.div>

        <div className="mt-10 space-y-4">
          {matches.map((m, i) => (
            <motion.div
              key={m.career.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className="glass flex items-center gap-4 rounded-2xl p-5 text-left"
            >
              <span className="text-3xl">{medals[i]}</span>
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${m.career.color} text-2xl`}
              >
                {m.career.emoji}
              </span>
              <div className="flex-1">
                <p className="font-display font-bold text-text-primary">{m.career.name}</p>
                <div className="mt-1.5 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-white/5">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${m.career.color}`}
                    style={{ width: `${Math.min(100, Math.max(4, m.score))}%` }}
                  />
                </div>
              </div>
              <span className="font-display text-lg font-bold text-text-primary">{Math.min(100, Math.max(0, m.score))}%</span>
              <Link
                href={`/careers/${m.career.slug}`}
                className="hidden shrink-0 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-text-primary hover:bg-white/20 sm:block"
              >
                Explore →
              </Link>
            </motion.div>
          ))}
        </div>

        <button
          onClick={restart}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface px-5 py-2.5 text-sm font-medium text-text-secondary hover:border-border-strong hover:text-text-primary"
        >
          <RotateCcw size={14} /> Retake the quiz
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs text-text-muted">
          <span>
            Question {step + 1} of {quizQuestions.length}
          </span>
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1 hover:text-text-primary"
            >
              <ArrowLeft size={12} /> Back
            </button>
          )}
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
        >
          <h2 className="mb-6 font-display text-2xl font-bold sm:text-3xl">{question.question}</h2>
          <div className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2", transitioning && "pointer-events-none")}>
            {question.options.map((option) => {
              const selected = answers[step]?.id === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => selectOption(option)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border bg-surface px-4 py-4 text-left transition-all hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-2",
                    selected ? "border-cyan-400/70 bg-cyan-500/10" : "border-border-soft"
                  )}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="text-sm font-medium text-text-primary">{option.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
