"use client";

import { useMemo } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function StarField({ count = 70 }: { count?: number }) {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      // deterministic pseudo-random so SSR/CSR markup matches
      const seed = i * 9301 + 49297;
      const r1 = ((seed * 233280) % 233280) / 233280;
      const r2 = ((seed * 9301) % 233280) / 233280;
      const r3 = ((seed * 49297) % 233280) / 233280;
      const r4 = ((seed * 1103515245) % 233280) / 233280;
      return {
        x: Math.abs(r1) * 100,
        y: Math.abs(r2) * 100,
        size: Math.abs(r3) * 2 + 0.5,
        delay: Math.abs(r4) * 4,
        duration: 2.5 + Math.abs(r1) * 3,
      };
    });
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_30%,transparent_75%)]" />
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
