"use client";

import { m, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { HEART_PATH, HEART_VIEWBOX, SPARKLE_PATH, SPARKLE_VIEWBOX } from "./paths";

const COLORS = ["#f9afc9", "#cbb9f6", "#a9d1f3", "#ffcfb8", "#f7b6d0"];

type BurstProps = {
  count?: number;
  distance?: number;
  delay?: number;
  /** Sizes the area whose centre the burst starts from. */
  className?: string;
};

/** A one-off ring of tiny hearts and sparkles flying outward from the centre. */
export function Burst({ count = 12, distance = 120, delay = 0.2, className = "inset-0" }: BurstProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div aria-hidden className={cn("pointer-events-none absolute z-20", className)}>
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        const reach = distance * [1, 0.78, 0.9][i % 3];
        const isHeart = i % 2 === 0;
        const size = isHeart ? 14 : 11;

        return (
          <m.span
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ color: COLORS[i % COLORS.length] }}
            initial={{ x: 0, y: 0, scale: 0.2, opacity: 0 }}
            animate={{
              x: Math.cos(angle) * reach,
              y: Math.sin(angle) * reach,
              scale: [0.2, 1.1, 0.85],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 1.3, delay, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg viewBox={isHeart ? HEART_VIEWBOX : SPARKLE_VIEWBOX} width={size} height={size} fill="currentColor">
              <path d={isHeart ? HEART_PATH : SPARKLE_PATH} />
            </svg>
          </m.span>
        );
      })}
    </div>
  );
}
