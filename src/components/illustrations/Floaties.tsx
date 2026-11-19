import { cn } from "@/lib/cn";
import type { CSSVars } from "@/lib/svg";
import { HEART_PATH, HEART_VIEWBOX, PETAL_PATH, PETAL_VIEWBOX } from "./paths";

export type Floaty = {
  shape: "heart" | "petal";
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

/** Gently looping hearts or petals drifting away from a single point (pure CSS). */
export function Floaties({ items, className }: FloatiesProps) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute size-0", className)}>
      {items.map((item, i) => {
        const isHeart = item.shape === "heart";
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
              viewBox={isHeart ? HEART_VIEWBOX : PETAL_VIEWBOX}
              width={item.size}
              height={isHeart ? item.size : item.size * 1.5}
              fill={item.color}
            >
              <path d={isHeart ? HEART_PATH : PETAL_PATH} />
            </svg>
          </span>
        );
      })}
    </div>
  );
}
