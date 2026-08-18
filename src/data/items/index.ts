import { LearningItem } from "@/types";
import { languages } from "./languages";
import { frameworks } from "./frameworks";
import { libraries } from "./libraries";
import { databases } from "./databases";
import { tools } from "./tools";
import { concepts } from "./concepts";
import { certifications } from "./certifications";

export const allItems: LearningItem[] = [
  ...languages,
  ...frameworks,
  ...libraries,
  ...databases,
  ...tools,
  ...concepts,
  ...certifications,
];

export const itemsById: Record<string, LearningItem> = Object.fromEntries(
  allItems.map((item) => [item.id, item])
);

export function getItem(id: string): LearningItem | undefined {
  return itemsById[id];
}

export function getItems(ids: string[]): LearningItem[] {
  return ids.map((id) => itemsById[id]).filter(Boolean) as LearningItem[];
}

export {
  languages,
  frameworks,
  libraries,
  databases,
  tools,
  concepts,
  certifications,
};
