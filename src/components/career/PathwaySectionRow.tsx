"use client";

import { motion } from "framer-motion";
import { PathwaySection, ProgressState } from "@/types";
import NodeCard from "./NodeCard";

export default function PathwaySectionRow({
  section,
  statuses,
  onNodeClick,
  isLast,
}: {
  section: PathwaySection;
  statuses: Record<string, ProgressState>;
  onNodeClick: (nodeId: string) => void;
  isLast: boolean;
}) {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
        className="mb-4 flex items-center gap-3"
      >
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${section.gradient} text-lg shadow-lg`}
        >
          {section.emoji}
        </span>
        <h3 className="font-display text-sm font-bold uppercase tracking-widest text-text-primary">
          {section.title}
        </h3>
        <span className="h-px flex-1 bg-gradient-to-r from-border-strong to-transparent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="flex flex-wrap gap-3 pl-1"
      >
        {section.nodes.map((node) => (
          <NodeCard
            key={node.id}
            node={node}
            status={statuses[node.id] ?? "not-started"}
            onClick={() => onNodeClick(node.id)}
          />
        ))}
      </motion.div>

      {!isLast && (
        <div className="my-2 ml-[18px] h-8 w-px bg-gradient-to-b from-border-strong to-transparent" />
      )}
    </div>
  );
}
