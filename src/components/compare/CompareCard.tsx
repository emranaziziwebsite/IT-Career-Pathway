import Link from "next/link";
import { Career } from "@/types";
import { getItems } from "@/data/items";

const statRows: { key: keyof Career["stats"]; label: string }[] = [
  { key: "difficulty", label: "Difficulty" },
  { key: "math", label: "Mathematics" },
  { key: "creativity", label: "Creativity" },
  { key: "peopleWork", label: "People / Collab" },
  { key: "handsOnHardware", label: "Hands-on Hardware" },
  { key: "dataFocus", label: "Data Focus" },
];

export default function CompareCard({ career, onRemove }: { career: Career; onRemove: () => void }) {
  const techIds = [...career.languages, ...career.frameworks, ...career.libraries].slice(0, 6);
  const techItems = getItems(techIds);
  const toolItems = getItems(career.tools.slice(0, 5));
  const certItems = getItems(career.certifications.slice(0, 4));

  return (
    <div className="glass w-[280px] shrink-0 rounded-2xl p-5 sm:w-[320px]">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${career.color} text-2xl`}
          >
            {career.emoji}
          </span>
          <div>
            <p className="font-display text-sm font-bold text-text-primary">{career.name}</p>
            <p className="text-[11px] text-text-muted">{career.category}</p>
          </div>
        </div>
        <button onClick={onRemove} className="text-xs text-text-muted hover:text-text-primary">
          ✕
        </button>
      </div>

      <div className="space-y-2.5">
        {statRows.map((row) => {
          const value = career.stats[row.key];
          return (
            <div key={row.label}>
              <div className="mb-1 flex justify-between text-[11px] text-text-muted">
                <span>{row.label}</span>
                <span>{value}/5</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${career.color}`}
                  style={{ width: `${(value / 5) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <Section title="Main Technologies">
        <ChipRow items={techItems.map((i) => `${i.emoji} ${i.name}`)} />
      </Section>

      <Section title="Main Tools">
        <ChipRow items={toolItems.map((i) => `${i.emoji} ${i.name}`)} />
      </Section>

      <Section title="Certifications">
        {certItems.length > 0 ? (
          <ChipRow items={certItems.map((i) => `${i.emoji} ${i.name}`)} />
        ) : (
          <p className="text-xs text-text-muted">None required to start</p>
        )}
      </Section>

      <Section title="Typical Projects">
        <ul className="space-y-1">
          {career.projects.slice(0, 3).map((p) => (
            <li key={p} className="text-xs text-text-secondary">
              • {p}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Learning Areas">
        <ChipRow items={career.pathway.slice(0, -2).map((s) => `${s.emoji} ${s.title}`)} />
      </Section>

      <Section title="Related Careers">
        <div className="flex flex-wrap gap-1.5">
          {career.relatedCareers.slice(0, 3).map((id) => (
            <Link
              key={id}
              href={`/careers/${id}`}
              className="rounded-full border border-border-soft px-2 py-0.5 text-[11px] text-text-secondary hover:border-border-strong hover:text-text-primary"
            >
              {id.replace(/-/g, " ")}
            </Link>
          ))}
        </div>
      </Section>

      <Link
        href={`/careers/${career.slug}`}
        className="mt-4 block rounded-full bg-white/10 px-4 py-2 text-center text-xs font-semibold text-text-primary hover:bg-white/20"
      >
        View Full Pathway →
      </Link>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 border-t border-border-soft pt-3">
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-muted">{title}</p>
      {children}
    </div>
  );
}

function ChipRow({ items }: { items: string[] }) {
  if (items.length === 0) return <p className="text-xs text-text-muted">—</p>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((i) => (
        <span key={i} className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-text-secondary">
          {i}
        </span>
      ))}
    </div>
  );
}
