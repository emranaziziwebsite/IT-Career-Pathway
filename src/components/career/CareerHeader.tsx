import Link from "next/link";
import { Career } from "@/types";
import { careersById } from "@/data/careers";

export default function CareerHeader({ career }: { career: Career }) {
  return (
    <div className="relative overflow-hidden border-b border-border-soft px-4 pb-10 pt-12 sm:px-6">
      <div
        className={`pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-br ${career.color} opacity-20 blur-3xl`}
      />
      <div className="relative z-10 mx-auto max-w-4xl">
        <Link href="/" className="mb-6 inline-block text-xs font-medium text-text-muted hover:text-text-primary">
          ← All careers
        </Link>
        <div className="flex flex-wrap items-start gap-5">
          <span
            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${career.color} text-3xl shadow-xl`}
          >
            {career.emoji}
          </span>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">{career.category}</p>
            <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">{career.name}</h1>
            <p className="mt-1.5 text-base text-text-secondary">{career.tagline}</p>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-text-secondary">{career.description}</p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-text-muted">Difficulty</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-4 rounded-full ${
                    i < career.stats.difficulty ? `bg-gradient-to-r ${career.color}` : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>
          <Link
            href={`/compare?careers=${career.id}`}
            className="rounded-full border border-border-soft bg-surface px-3 py-1 text-xs font-medium text-text-secondary hover:border-border-strong hover:text-text-primary"
          >
            ⚖️ Compare this career
          </Link>
        </div>

        {career.specializations.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">Specializations</p>
            <div className="flex flex-wrap gap-2">
              {career.specializations.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border-soft bg-white/5 px-3 py-1 text-xs text-text-secondary"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {career.relatedCareers.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">Related Careers</p>
            <div className="flex flex-wrap gap-2">
              {career.relatedCareers.map((id) => {
                const rc = careersById[id];
                if (!rc) return null;
                return (
                  <Link
                    key={id}
                    href={`/careers/${rc.slug}`}
                    className="rounded-full border border-border-soft bg-white/5 px-3 py-1 text-xs text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary"
                  >
                    {rc.emoji} {rc.name}
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
