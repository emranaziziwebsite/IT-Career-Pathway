import { allCareers } from "@/data/careers";
import { allItems } from "@/data/items";
import { Career, LearningItem } from "@/types";

export interface SearchEntry {
  id: string;
  type: "career" | "item";
  title: string;
  subtitle: string;
  emoji: string;
  href: string;
}

const careerEntries: SearchEntry[] = allCareers.map((c) => ({
  id: c.id,
  type: "career",
  title: c.name,
  subtitle: c.category,
  emoji: c.emoji,
  href: `/careers/${c.slug}`,
}));

const itemEntries: SearchEntry[] = allItems.map((i) => ({
  id: i.id,
  type: "item",
  title: i.name,
  subtitle: capitalize(i.category),
  emoji: i.emoji,
  href: `/technologies?item=${i.id}`,
}));

const index: SearchEntry[] = [...careerEntries, ...itemEntries];

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function scoreEntry(entry: SearchEntry, q: string): number {
  const t = entry.title.toLowerCase();
  if (t === q) return 100;
  if (t.startsWith(q)) return 80;
  if (t.includes(q)) return 55;
  if (entry.subtitle.toLowerCase().includes(q)) return 20;
  return 0;
}

export function searchAll(query: string, limit = 8): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return index
    .map((entry) => ({ entry, score: scoreEntry(entry, q) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.entry);
}

/** All careers that reference a given LearningItem, anywhere in their tech lists or pathway. */
export function careersUsingItem(itemId: string, careers: Career[] = allCareers): Career[] {
  return careers.filter((career) => {
    const flatLists = [
      career.languages,
      career.frameworks,
      career.libraries,
      career.databases,
      career.tools,
      career.certifications,
    ].flat();
    if (flatLists.includes(itemId)) return true;
    return career.pathway.some((section) => section.nodes.some((node) => node.itemId === itemId));
  });
}

export function findItemByName(name: string): LearningItem | undefined {
  const q = name.trim().toLowerCase();
  return allItems.find((i) => i.name.toLowerCase() === q);
}
