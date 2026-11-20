import { cn } from "@/lib/cn";
import type { CSSVars } from "@/lib/svg";
import { HEART_PATH, HEART_VIEWBOX, PETAL_PATH, PETAL_VIEWBOX, SPARKLE_PATH, SPARKLE_VIEWBOX } from "./paths";

export type Floaty = {
  shape: "heart" | "petal" | "sparkle";
  color: string;
  size: number;
  dx: string;
  dy: string;
  spin: string;
  dur: string;
  delay: string;
};

type FloatiesProps = {
  items: readonly Floaty[];
  /** Positions the point the floaties drift away from. */
  className: string;
};

/** Gently looping hearts, petals or sparkles drifting away from a single point (pure CSS). */
export function Floaties({ items, className }: FloatiesProps) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute size-0", className)}>
      {items.map((item, i) => {
        const isHeart = item.shape === "heart";
        const isSparkle = item.shape === "sparkle";
        const viewBox = isHeart ? HEART_VIEWBOX : isSparkle ? SPARKLE_VIEWBOX : PETAL_VIEWBOX;
        const path = isHeart ? HEART_PATH : isSparkle ? SPARKLE_PATH : PETAL_PATH;
        return (
          <span
            key={i}
            className="absolute -left-2 -top-2 animate-floaty opacity-0"
            style={
              {
                "--dx": item.dx,
                "--dy": item.dy,
                "--spin": item.spin,
                "--dur": item.dur,
                animationDelay: item.delay,
              } as CSSVars
            }
          >
            <svg
              viewBox={viewBox}
              width={item.size}
              height={item.shape === "petal" ? item.size * 1.5 : item.size}
              fill={item.color}
            >
              <path d={path} />
            </svg>
          </span>
        );
      })}
    </div>
  );
}
