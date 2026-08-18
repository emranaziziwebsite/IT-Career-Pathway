"use client";

import Link from "next/link";
import { Career } from "@/types";
import { careersById } from "@/data/careers";
import { useLocale } from "@/i18n/LocaleContext";
import { translateCareer, translateCategory } from "@/i18n/content/translate";

export default function CareerHeader({ career: rawCareer }: { career: Career }) {
  const { t, locale } = useLocale();
  const career = translateCareer(rawCareer, locale);

  return (
    <div className="relative overflow-hidden border-b border-border-soft px-4 pb-10 pt-12 sm:px-6">
      <div
        className={`pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-br ${rawCareer.color} opacity-20 blur-3xl`}
      />
      <div className="relative z-10 mx-auto max-w-4xl">
        <Link href="/" className="mb-6 inline-block text-xs font-medium text-text-muted hover:text-text-primary">
          {t("career.allCareers")}
        </Link>
        <div className="flex flex-wrap items-start gap-5">
          <span
            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${rawCareer.color} text-3xl shadow-xl`}
          >
            {rawCareer.emoji}
          </span>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              {translateCategory(rawCareer.category, locale)}
            </p>
            <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">{career.name}</h1>
            <p className="mt-1.5 text-base text-text-secondary">{career.tagline}</p>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-text-secondary">{career.description}</p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-text-muted">{t("career.difficulty")}</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-4 rounded-full ${
                    i < rawCareer.stats.difficulty ? `bg-gradient-to-r ${rawCareer.color}` : "bg-black/10"
                  }`}
                />
              ))}
            </div>
          </div>
          <Link
            href={`/compare?careers=${rawCareer.id}`}
            className="rounded-full border border-border-soft bg-surface px-3 py-1 text-xs font-medium text-text-secondary hover:border-border-strong hover:text-text-primary"
          >
            {t("career.compareThis")}
          </Link>
        </div>

        {career.specializations.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
              {t("career.specializations")}
            </p>
            <div className="flex flex-wrap gap-2">
              {career.specializations.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border-soft bg-black/5 px-3 py-1 text-xs text-text-secondary"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {rawCareer.relatedCareers.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
              {t("career.relatedCareers")}
            </p>
            <div className="flex flex-wrap gap-2">
              {rawCareer.relatedCareers.map((id) => {
                const rc = careersById[id];
                if (!rc) return null;
                const rcT = translateCareer(rc, locale);
                return (
                  <Link
                    key={id}
                    href={`/careers/${rc.slug}`}
                    className="rounded-full border border-border-soft bg-black/5 px-3 py-1 text-xs text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary"
                  >
                    {rc.emoji} {rcT.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
