"use client";

import { useState } from "react";
import { Career, PathwayNode } from "@/types";
import { getFirstNodeId } from "@/lib/pathway";
import { useLocale } from "@/i18n/LocaleContext";
import { translateCareer } from "@/i18n/content/translate";
import PathwaySectionRow from "./PathwaySectionRow";
import RoadmapIntro from "./RoadmapIntro";
import ProjectGroupModal from "./ProjectGroupModal";
import ItemDetailPanel from "@/components/shared/ItemDetailPanel";

export default function PathwayView({ career: rawCareer }: { career: Career }) {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [activeProjectNode, setActiveProjectNode] = useState<PathwayNode | null>(null);
  const { locale } = useLocale();

  const career = translateCareer(rawCareer, locale);
  const firstNodeId = getFirstNodeId(career.pathway);

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

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-10">
        <RoadmapIntro sections={career.pathway} />
      </div>

      <div className="space-y-2">
        {career.pathway.map((section, i) => (
          <PathwaySectionRow
            key={section.id}
            section={section}
            onNodeClick={handleNodeClick}
            isLast={i === career.pathway.length - 1}
            firstNodeId={firstNodeId}
          />
        ))}
      </div>

      <ItemDetailPanel
        itemId={activeItemId}
        open={activeItemId !== null}
        onClose={() => setActiveItemId(null)}
        onNavigate={(id) => setActiveItemId(id)}
      />

      <ProjectGroupModal node={activeProjectNode} onClose={() => setActiveProjectNode(null)} />
    </div>
  );
}
