import { useId, type CSSProperties } from "react";

export type CSSVars = CSSProperties & Record<`--${string}`, string | number>;

export type Paint = (name: string) => string;

/** Rotate or scale an SVG part around a point given in viewBox units. */
export function pivot(x: number, y: number): CSSProperties {
  return { transformOrigin: `${x}px ${y}px`, transformBox: "view-box" };
}

/** Collision-free gradient ids, so several inline SVGs can share gradient names. */
export function useSvgIds() {
  const base = `s${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const id = (name: string) => `${base}-${name}`;
  const paint: Paint = (name) => `url(#${id(name)})`;
  return { id, paint };
}
