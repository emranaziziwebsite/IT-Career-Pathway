import { Locale } from "../locales";
import { ItemTranslation } from "./types";
import { itemsDe } from "./items.de";
import { itemsFa } from "./items.fa";

export const itemTranslations: Partial<Record<Locale, Record<string, ItemTranslation>>> = {
  de: itemsDe,
  fa: itemsFa,
};
