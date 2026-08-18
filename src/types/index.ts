// Core data model for the IT Career Pathway Explorer.
// Content (src/data) is kept fully separate from UI (src/components, src/app).

export type ItemCategory =
  | "language"
  | "framework"
  | "library"
  | "database"
  | "tool"
  | "platform"
  | "concept"
  | "certification"
  | "protocol"
  | "os";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export type ResourceType = "best" | "free" | "job-focused" | "certification";

export interface Resource {
  type: ResourceType;
  title: string;
  provider: string;
  level: DifficultyLevel;
  cost: "free" | "paid";
  note?: string; // context for why this fits (kept short, non-absolute)
}

export interface LearningItem {
  id: string;
  name: string;
  category: ItemCategory;
  emoji: string;
  description: string;
  usedFor: string[];
  learn: string[];
  prerequisites: string[]; // LearningItem ids or short free-text
  nextSteps: string[]; // LearningItem ids
  resources: Resource[];
  projects: string[];
  difficulty: DifficultyLevel;
}

export type NodeKind = "skill" | "certification" | "project-group" | "milestone";

export interface PathwayNode {
  id: string;
  kind: NodeKind;
  itemId?: string; // resolves to a LearningItem when kind is skill/certification
  label?: string; // required for project-group/milestone; skill/certification fall back to the item's name
  projects?: string[]; // used when kind === "project-group"
  emoji?: string;
}

export interface PathwaySection {
  id: string;
  title: string;
  emoji: string;
  gradient: string; // tailwind gradient class fragment, e.g. "from-cyan-400 to-blue-500"
  nodes: PathwayNode[];
}

export interface CareerStats {
  math: number; // 1-5
  creativity: number; // 1-5
  difficulty: number; // 1-5
  peopleWork: number; // 1-5 (collaboration / stakeholder facing)
  handsOnHardware: number; // 1-5
  dataFocus: number; // 1-5
}

export interface Career {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  category: string; // grouping used for homepage filters
  tagline: string;
  description: string;
  color: string; // gradient theme key, e.g. "cyan-violet"
  pathway: PathwaySection[];
  languages: string[];
  frameworks: string[];
  libraries: string[];
  databases: string[];
  apis: string[];
  tools: string[];
  certifications: string[];
  courses: string[];
  labs: string[];
  projects: string[];
  specializations: string[];
  relatedCareers: string[]; // career ids
  stats: CareerStats;
}

export type QuizDimension =
  | "programming"
  | "creativity"
  | "mathematics"
  | "hardware"
  | "security"
  | "data"
  | "games"
  | "ai"
  | "people"
  | "problemSolving";

export interface QuizOption {
  id: string;
  label: string;
  emoji: string;
  weights: Partial<Record<QuizDimension, number>>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface CareerMatch {
  career: Career;
  score: number; // 0-100
}

export type ProgressState = "not-started" | "learning" | "completed" | "current" | "locked";
