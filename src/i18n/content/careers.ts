import { Locale } from "../locales";
import { CareerTranslation } from "./types";
import { careersDe } from "./careers.de";
import { careersFa } from "./careers.fa";

export const careerTranslations: Partial<Record<Locale, Record<string, CareerTranslation>>> = {
  de: careersDe,
  fa: careersFa,
};
