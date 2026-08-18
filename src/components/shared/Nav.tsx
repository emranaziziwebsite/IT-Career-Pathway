"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Rocket, Search, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/LocaleContext";
import { locales, localeMeta } from "@/i18n/locales";

export default function Nav({ onSearchClick }: { onSearchClick: () => void }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, locale, setLocale } = useLocale();

  const links = [
    { href: "/", label: t("nav.careers") },
    { href: "/compare", label: t("nav.compare") },
    { href: "/technologies", label: t("nav.tech") },
    { href: "/projects", label: t("nav.projects") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border-soft bg-void/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 via-violet-500 to-pink-500 text-base shadow-lg shadow-violet-500/30">
            <Rocket size={16} className="text-white" />
          </span>
          <span className="hidden text-gradient sm:inline">{t("nav.brand")}</span>
        </Link>

        <nav className="ml-4 hidden flex-1 items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/60 text-text-primary"
                    : "text-text-secondary hover:bg-white/40 hover:text-text-primary"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-full border border-border-soft bg-surface px-3 py-1.5 text-sm text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary"
            >
              <span>{localeMeta[locale].flag}</span>
              <span className="hidden sm:inline">{localeMeta[locale].nativeLabel}</span>
              <ChevronDown size={13} />
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                <div className="absolute end-0 z-20 mt-2 w-40 overflow-hidden rounded-2xl border border-border-soft bg-surface shadow-xl">
                  {locales.map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLocale(l);
                        setLangOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-2 px-3.5 py-2.5 text-sm hover:bg-surface-2",
                        l === locale ? "font-bold text-text-primary" : "text-text-secondary"
                      )}
                    >
                      <span>{localeMeta[l].flag}</span>
                      {localeMeta[l].nativeLabel}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <button
            onClick={onSearchClick}
            className="flex items-center gap-2 rounded-full border border-border-soft bg-surface px-3 py-1.5 text-sm text-text-muted transition-colors hover:border-border-strong hover:text-text-primary"
          >
            <Search size={15} />
            <span className="hidden sm:inline">{t("nav.search")}</span>
            <kbd className="hidden rounded border border-border-soft bg-surface-2 px-1.5 py-0.5 text-[10px] sm:inline">
              ⌘K
            </kbd>
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-full border border-border-soft bg-surface p-2 text-text-secondary lg:hidden"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-border-soft px-4 py-3 lg:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium",
                pathname === link.href
                  ? "bg-white/60 text-text-primary"
                  : "text-text-secondary hover:bg-white/40"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
