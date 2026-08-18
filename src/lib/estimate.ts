import { Career } from "@/types";
import { getTrackableNodes } from "@/lib/pathway";
import { getItem } from "@/data/items";

const HOURS_BY_DIFFICULTY: Record<string, number> = {
  beginner: 12,
  intermediate: 28,
  advanced: 50,
};

const HOURS_PER_WEEK = 10;
const WEEKS_PER_MONTH = 4.345;

/** Rough estimate of months to go from zero to job-ready, studying 10 hrs/week. */
export function estimateMonths(career: Career): number {
  const nodes = getTrackableNodes(career.pathway);
  const totalHours = nodes.reduce((sum, node) => {
    const item = node.itemId ? getItem(node.itemId) : undefined;
    return sum + (item ? HOURS_BY_DIFFICULTY[item.difficulty] ?? 20 : 20);
  }, 0);
  const weeks = totalHours / HOURS_PER_WEEK;
  const months = weeks / WEEKS_PER_MONTH;
  return Math.max(1, Math.round(months * 2) / 2); // round to nearest 0.5
}

export function formatMonths(months: number): string {
  return `${months} mo`;
}
