export const locales = ["en", "de", "fa"] as const;
export type Locale = (typeof locales)[number];

export const localeMeta: Record<Locale, { label: string; nativeLabel: string; flag: string; dir: "ltr" | "rtl" }> = {
  en: { label: "English", nativeLabel: "English", flag: "🇬🇧", dir: "ltr" },
  de: { label: "German", nativeLabel: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  fa: { label: "Dari", nativeLabel: "دری", flag: "🇦🇫", dir: "rtl" },
};

export const defaultLocale: Locale = "en";
