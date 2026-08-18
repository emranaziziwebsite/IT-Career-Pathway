"use client";

import { useMemo } from "react";

interface Blob {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

const colors = [
  "rgba(34,211,238,0.18)",
  "rgba(167,139,250,0.18)",
  "rgba(244,114,182,0.16)",
  "rgba(251,191,36,0.16)",
  "rgba(52,211,153,0.16)",
];

export default function StarField({ count = 8 }: { count?: number }) {
  const blobs = useMemo<Blob[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const seed = i * 9301 + 49297;
      const r1 = Math.abs(((seed * 233280) % 233280) / 233280);
      const r2 = Math.abs(((seed * 9301) % 233280) / 233280);
      const r3 = Math.abs(((seed * 49297) % 233280) / 233280);
      return {
        x: r1 * 100,
        y: r2 * 90,
        size: 220 + r3 * 260,
        delay: r1 * 4,
        duration: 8 + r2 * 6,
        color: colors[i % colors.length],
      };
    });
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_30%,transparent_75%)]" />
      {blobs.map((b, i) => (
        <span
          key={i}
          className="absolute rounded-full blur-3xl animate-float-slow"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.size,
            height: b.size,
            background: b.color,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
