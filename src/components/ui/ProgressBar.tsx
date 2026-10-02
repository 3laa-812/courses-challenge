"use client";

import { useEffect, useState } from "react";
import { useIntersectionObserver } from "@/lib/useIntersectionObserver";

export function ProgressBar({ progress, level }: { progress: number; level?: string }) {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });
  const [displayed, setDisplayed] = useState(0);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!hasIntersected) return;
    if (prefersReduced) {
      const timer = setTimeout(() => setDisplayed(progress), 0);
      return () => clearTimeout(timer);
    }
    let start = 0;
    const duration = 900;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const fraction = Math.min(elapsed / duration, 1);
      setDisplayed(Math.round(fraction * progress));
      if (fraction < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [hasIntersected, progress, prefersReduced]);

  return (
    <div ref={ref} className="w-full">
      {/* "You" marker */}
      <div className="relative h-10 mb-2">
        <div
          className="absolute flex flex-col items-center transition-none"
          style={{ left: `${displayed}%`, transform: "translateX(-50%)" }}
        >
          <div className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-[11px] font-semibold text-[#334e7a] shadow-sm">
            You
          </div>
          {/* downward triangle */}
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "6px solid #d1d5db",
              marginTop: "-1px",
            }}
          />
        </div>
      </div>

      {/* Track */}
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--color-primary)] rounded-full"
          style={{
            width: `${displayed}%`,
            transition: prefersReduced ? "none" : undefined,
          }}
        />
      </div>

      {/* Percentage label centered under the marker */}
      <div className="relative h-6 mt-1">
        <span
          className="absolute text-xs font-semibold text-[#334e7a]"
          style={{ left: `${displayed}%`, transform: "translateX(-50%)" }}
        >
          {displayed}%
        </span>
      </div>

      {level && (
        <p className="text-xs text-gray-400 mt-1 text-center">
          Level: <span className="font-semibold text-gray-600">{level}</span>
        </p>
      )}
    </div>
  );
}
