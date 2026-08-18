"use client";

import { useState } from "react";
import { Career, PathwayNode } from "@/types";
import { useCareerProgress, computeNodeStatuses, computeCareerCompletion } from "@/lib/progress";
import PathwaySectionRow from "./PathwaySectionRow";
import ProgressSummary from "./ProgressSummary";
import ProjectGroupModal from "./ProjectGroupModal";
import ItemDetailPanel from "@/components/shared/ItemDetailPanel";

export default function PathwayView({ career }: { career: Career }) {
  const { progress, cycleNodeState, resetProgress } = useCareerProgress(career.id);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [activeProjectNode, setActiveProjectNode] = useState<PathwayNode | null>(null);

  const statuses = computeNodeStatuses(career.pathway, progress);
  const { percent } = computeCareerCompletion(career.pathway, progress);

  const nodesById: Record<string, PathwayNode> = {};
  for (const section of career.pathway) {
    for (const node of section.nodes) nodesById[node.id] = node;
  }

  function handleNodeClick(nodeId: string) {
    const node = nodesById[nodeId];
    if (!node) return;
    if (node.kind === "project-group") {
      setActiveProjectNode(node);
    } else if (node.kind === "skill" || node.kind === "certification") {
      setActiveItemId(node.itemId ?? null);
    }
  }

  const activeNodeForItem = activeItemId
    ? Object.values(nodesById).find((n) => n.itemId === activeItemId)
    : undefined;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-10">
        <ProgressSummary
          careerName={career.name}
          sections={career.pathway}
          statuses={statuses}
          percent={percent}
          onReset={resetProgress}
        />
      </div>

      <div className="space-y-2">
        {career.pathway.map((section, i) => (
          <PathwaySectionRow
            key={section.id}
            section={section}
            statuses={statuses}
            onNodeClick={handleNodeClick}
            isLast={i === career.pathway.length - 1}
          />
        ))}
      </div>

      <ItemDetailPanel
        itemId={activeItemId}
        open={activeItemId !== null}
        onClose={() => setActiveItemId(null)}
        onNavigate={(id) => setActiveItemId(id)}
        careerContext={
          activeNodeForItem
            ? {
                status: statuses[activeNodeForItem.id] ?? "not-started",
                onCycle: () => cycleNodeState(activeNodeForItem.id),
              }
            : undefined
        }
      />

      <ProjectGroupModal node={activeProjectNode} onClose={() => setActiveProjectNode(null)} />
    </div>
  );
}
