import { PathwayNode, PathwaySection } from "@/types";

// Small helpers to cut boilerplate across career files while keeping full
// control over section structure per career (careers are NOT forced into
// identical shapes — see each career file for how sections differ).

export function skill(itemId: string, id?: string): PathwayNode {
  return { id: id ?? itemId, kind: "skill", itemId };
}

export function cert(itemId: string, id?: string): PathwayNode {
  return { id: id ?? itemId, kind: "certification", itemId };
}

export function projectGroup(id: string, label: string, emoji: string, projects: string[]): PathwayNode {
  return { id, kind: "project-group", label, emoji, projects };
}

export function milestone(id: string, label: string, emoji: string): PathwayNode {
  return { id, kind: "milestone", label, emoji };
}

export function practiceSection(
  id: string,
  beginner: string[],
  intermediate: string[],
  advanced: string[]
): PathwaySection {
  return {
    id,
    title: "PRACTICE",
    emoji: "🛠️",
    gradient: "from-amber-400 to-orange-500",
    nodes: [
      projectGroup(`${id}-beginner`, "Beginner Projects", "🌱", beginner),
      projectGroup(`${id}-intermediate`, "Intermediate Projects", "🌿", intermediate),
      projectGroup(`${id}-advanced`, "Advanced Projects", "🌳", advanced),
    ],
  };
}

export function careerSection(id: string): PathwaySection {
  return {
    id,
    title: "CAREER",
    emoji: "🏆",
    gradient: "from-yellow-400 to-amber-600",
    nodes: [
      projectGroup(`${id}-portfolio`, "Portfolio", "💼", [
        "Pick your 2-3 strongest projects and polish them",
        "Write clear READMEs with screenshots/demos",
        "Deploy everything live, not just on GitHub",
      ]),
      projectGroup(`${id}-interview-prep`, "Interview Preparation", "🗣️", [
        "Practice explaining your projects out loud",
        "Mock technical interviews with a peer",
        "Review core concepts you're weakest on",
      ]),
      milestone(`${id}-job-ready`, "Job Ready", "🏆"),
    ],
  };
}
