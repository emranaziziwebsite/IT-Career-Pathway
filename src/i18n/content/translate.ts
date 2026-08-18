import { Career, LearningItem } from "@/types";
import { Locale } from "../locales";
import { translateSectionTitle } from "../sectionTitles";
import { dictionary, TranslationKey } from "../dictionary";
import { careerTranslations } from "./careers";
import { itemTranslations } from "./items";
import { conceptCertNames } from "./conceptCertNames";

const helperLabelSuffixes: [string, TranslationKey][] = [
  ["-beginner", "roadmap.beginnerProjects"],
  ["-intermediate", "roadmap.intermediateProjects"],
  ["-advanced", "roadmap.advancedProjects"],
  ["-portfolio", "roadmap.portfolio"],
  ["-interview-prep", "roadmap.interviewPrep"],
  ["-job-ready", "roadmap.jobReady"],
];

function translateHelperLabel(nodeId: string, locale: Locale): string | undefined {
  const match = helperLabelSuffixes.find(([suffix]) => nodeId.endsWith(suffix));
  return match ? dictionary[locale][match[1]] : undefined;
}

export function translateCareer(career: Career, locale: Locale): Career {
  const t = locale === "en" ? undefined : careerTranslations[locale]?.[career.id];

  const pathway = career.pathway.map((section) => ({
    ...section,
    title: translateSectionTitle(section.title, locale),
    nodes: section.nodes.map((node) => {
      const helperLabel = translateHelperLabel(node.id, locale);
      if (helperLabel) return { ...node, label: helperLabel };
      const customGroup = t?.projectGroups?.[node.id];
      if (customGroup) {
        return {
          ...node,
          label: customGroup.label ?? node.label,
          projects: customGroup.projects ?? node.projects,
        };
      }
      return node;
    }),
  }));

  if (!t) return { ...career, pathway };

  return {
    ...career,
    name: t.name ?? career.name,
    tagline: t.tagline ?? career.tagline,
    description: t.description ?? career.description,
    specializations: t.specializations ?? career.specializations,
    projects: t.projects ?? career.projects,
    labs: t.labs ?? career.labs,
    pathway,
  };
}

export function translateItem(item: LearningItem, locale: Locale): LearningItem {
  if (locale === "en") return item;
  const t = itemTranslations[locale]?.[item.id];
  const name = t?.name ?? conceptCertNames[locale]?.[item.id] ?? item.name;
  if (!t) return { ...item, name };
  return {
    ...item,
    name,
    description: t.description ?? item.description,
    usedFor: t.usedFor ?? item.usedFor,
    learn: t.learn ?? item.learn,
    projects: t.projects ?? item.projects,
  };
}

export function translateCategory(category: string, locale: Locale): string {
  const key = `category.${category}` as TranslationKey;
  return dictionary[locale]?.[key] ?? category;
}

const itemCategoryKeys: Record<string, TranslationKey> = {
  language: "tech.catLanguage",
  framework: "tech.catFramework",
  library: "tech.catLibrary",
  database: "tech.catDatabase",
  tool: "tech.catTool",
  platform: "tech.catPlatform",
  concept: "tech.catConcept",
  certification: "tech.catCertification",
  protocol: "tech.catProtocol",
  os: "tech.catOs",
};

export function translateItemCategory(category: string, locale: Locale): string {
  const key = itemCategoryKeys[category];
  if (!key) return category;
  return dictionary[locale]?.[key] ?? category;
}
