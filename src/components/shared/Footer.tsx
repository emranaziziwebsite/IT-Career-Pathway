"use client";

import Link from "next/link";
import { Rocket } from "lucide-react";
import { useLocale } from "@/i18n/LocaleContext";

export default function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  const links = [
    { href: "/", label: t("nav.careers") },
    { href: "/compare", label: t("nav.compare") },
    { href: "/technologies", label: t("nav.tech") },
    { href: "/projects", label: t("nav.projects") },
  ];

  return (
    <footer className="relative px-4 pb-10 pt-14 sm:px-6">
      <div className="divider-glow absolute inset-x-0 top-0" />

      <div className="mx-auto flex max-w-7xl flex-col gap-10 sm:flex-row sm:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2 font-display text-base font-bold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-lg shadow-white/20">
              <Rocket size={16} className="text-black" />
            </span>
            <span className="text-gradient">{t("nav.brand")}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">{t("footer.tagline")}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">{t("footer.explore")}</p>
          <nav className="mt-3 flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col-reverse items-center justify-between gap-3 border-t border-border-soft pt-6 text-xs text-text-muted sm:flex-row">
        <span>
          © {year} {t("nav.brand")}
        </span>
        <span>{t("footer.rights")}</span>
      </div>
    </footer>
  );
}
