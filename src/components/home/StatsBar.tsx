import { allCareers } from "@/data/careers";
import { allItems } from "@/data/items";
import { certifications } from "@/data/items";

export default function StatsBar() {
  const stats = [
    { label: "IT Careers", value: allCareers.length, emoji: "🧭" },
    { label: "Skills & Technologies", value: allItems.length, emoji: "🧩" },
    { label: "Certifications Mapped", value: certifications.length, emoji: "🏅" },
    { label: "Project Ideas", value: allCareers.reduce((n, c) => n + c.projects.length, 0) + "+", emoji: "🛠️" },
  ];

  return (
    <div className="mx-auto -mt-6 mb-16 grid max-w-4xl grid-cols-2 gap-3 px-4 sm:grid-cols-4 sm:px-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="glass rounded-2xl px-4 py-4 text-center"
        >
          <div className="text-2xl">{s.emoji}</div>
          <div className="mt-1 font-display text-xl font-bold text-text-primary">{s.value}</div>
          <div className="text-[11px] uppercase tracking-wide text-text-muted">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
