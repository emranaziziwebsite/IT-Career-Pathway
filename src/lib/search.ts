import { allCareers } from "@/data/careers";
import { allItems } from "@/data/items";
import { Career, LearningItem } from "@/types";
import { Locale } from "@/i18n/locales";
import { translateCareer, translateCategory, translateItemCategory, translateItem } from "@/i18n/content/translate";

export interface SearchEntry {
  id: string;
  type: "career" | "item";
  title: string;
  subtitle: string;
  emoji: string;
  href: string;
  matchText: string;
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function buildIndex(locale: Locale): SearchEntry[] {
  const careerEntries: SearchEntry[] = allCareers.map((c) => {
    const t = translateCareer(c, locale);
    return {
      id: c.id,
      type: "career",
      title: t.name,
      subtitle: translateCategory(c.category, locale),
      emoji: c.emoji,
      href: `/careers/${c.slug}`,
      matchText: `${t.name} ${c.name}`.toLowerCase(),
    };
  });

  const itemEntries: SearchEntry[] = allItems.map((i) => {
    const it = translateItem(i, locale);
    return {
      id: i.id,
      type: "item",
      title: it.name,
      subtitle: capitalize(translateItemCategory(i.category, locale)),
      emoji: i.emoji,
      href: `/technologies?item=${i.id}`,
      matchText: `${it.name} ${i.name}`.toLowerCase(),
    };
  });

  return [...careerEntries, ...itemEntries];
}

function scoreEntry(entry: SearchEntry, q: string): number {
  const t = entry.matchText;
  if (t === q) return 100;
  if (t.startsWith(q)) return 80;
  if (t.includes(q)) return 55;
  if (entry.subtitle.toLowerCase().includes(q)) return 20;
  return 0;
}

export function searchAll(query: string, locale: Locale, limit = 8): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const index = buildIndex(locale);
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
