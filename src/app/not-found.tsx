"use client";

import Link from "next/link";
import { Compass } from "lucide-react";
import { useLocale } from "@/i18n/LocaleContext";

export default function NotFound() {
  const { t } = useLocale();
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 text-center sm:px-6">
      <span className="toon-card flex h-20 w-20 items-center justify-center rounded-3xl bg-surface text-4xl">
        <Compass size={36} className="text-blue-400" />
      </span>
      <p className="mt-6 font-display text-6xl font-bold text-gradient">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-text-primary">{t("notFound.title")}</h1>
      <p className="mt-2 text-text-secondary">{t("notFound.subtitle")}</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-105"
      >
        {t("notFound.cta")}
      </Link>
    </div>
  );
}
