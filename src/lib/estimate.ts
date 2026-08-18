import { Career, DifficultyLevel } from "@/types";
import { getTrackableNodes } from "@/lib/pathway";
import { getItem } from "@/data/items";

const HOURS_BY_DIFFICULTY: Record<DifficultyLevel, number> = {
  beginner: 12,
  intermediate: 28,
  advanced: 50,
};

const WEEKS_PER_MONTH = 4.345;

export const DEFAULT_HOURS_PER_WEEK = 10;
export const HOURS_PER_WEEK_OPTIONS = [5, 10, 15, 20, 25, 30];

/** Rough hours needed to go from zero to working knowledge of a single skill. */
export function hoursForDifficulty(difficulty: DifficultyLevel): number {
  return HOURS_BY_DIFFICULTY[difficulty] ?? 20;
}

/** Total estimated hours for an entire career's roadmap. */
export function estimateTotalHours(career: Career): number {
  const nodes = getTrackableNodes(career.pathway);
  return nodes.reduce((sum, node) => {
    const item = node.itemId ? getItem(node.itemId) : undefined;
    return sum + (item ? hoursForDifficulty(item.difficulty) : 20);
  }, 0);
}

export interface Duration {
  weeks: number;
  months: number;
}

export function durationFromHours(totalHours: number, hoursPerWeek: number): Duration {
  const safeHoursPerWeek = Math.max(1, hoursPerWeek);
  const weeks = Math.max(1, Math.round(totalHours / safeHoursPerWeek));
  const months = Math.max(0.5, Math.round((weeks / WEEKS_PER_MONTH) * 2) / 2);
  return { weeks, months };
}

/** Convenience wrapper: full career duration at a given weekly pace (defaults to 10 hrs/week). */
export function estimateCareerDuration(career: Career, hoursPerWeek: number = DEFAULT_HOURS_PER_WEEK): Duration {
  return durationFromHours(estimateTotalHours(career), hoursPerWeek);
}

/** Backward-compatible helper: just the months figure at a given pace. */
export function estimateMonths(career: Career, hoursPerWeek: number = DEFAULT_HOURS_PER_WEEK): number {
  return estimateCareerDuration(career, hoursPerWeek).months;
}
