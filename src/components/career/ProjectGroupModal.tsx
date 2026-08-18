"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Hammer } from "lucide-react";
import { PathwayNode } from "@/types";

export default function ProjectGroupModal({
  node,
  onClose,
}: {
  node: PathwayNode | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {node && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center px-4"
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
            className="glass relative w-full max-w-md rounded-2xl p-6"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1.5 text-text-muted hover:bg-white/10 hover:text-text-primary"
            >
              <X size={16} />
            </button>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-2xl">
                {node.emoji ?? "🛠️"}
              </span>
              <h3 className="font-display text-lg font-bold text-text-primary">{node.label}</h3>
            </div>
            <ul className="space-y-2.5">
              {node.projects?.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-text-secondary">
                  <Hammer size={13} className="mt-0.5 shrink-0 text-violet-400" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
