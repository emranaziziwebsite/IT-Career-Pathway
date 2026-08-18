"use client";

import Link from "next/link";
import { Rocket } from "lucide-react";
import { useLocale } from "@/i18n/LocaleContext";

export default function Footer() {
  const { t } = useLocale();
  return (
    <footer className="border-t border-border-soft px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-text-muted sm:flex-row">
        <div className="flex items-center gap-2 font-display font-semibold text-text-secondary">
          <Rocket size={14} />
          {t("nav.brand")}
        </div>
        <p>{t("footer.tagline")}</p>
        <div className="flex gap-4">
          <Link href="/compare" className="hover:text-text-primary">{t("nav.compare")}</Link>
          <Link href="/technologies" className="hover:text-text-primary">{t("nav.tech")}</Link>
        </div>
      </div>
    </footer>
  );
}
