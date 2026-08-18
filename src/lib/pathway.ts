import { PathwaySection } from "@/types";

/** Flattens a career's trackable (skill/certification) nodes in pathway order. */
export function getTrackableNodes(sections: PathwaySection[]) {
  return sections.flatMap((s) => s.nodes.filter((n) => n.kind === "skill" || n.kind === "certification"));
}

/** The very first skill in the roadmap — the recommended starting point. */
export function getFirstNodeId(sections: PathwaySection[]): string | undefined {
  return getTrackableNodes(sections)[0]?.id;
}
