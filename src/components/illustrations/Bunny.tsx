"use client";

import type { CSSProperties } from "react";
import { pivot, useSvgIds } from "@/lib/svg";

export type BunnyPose = "peek" | "cheer" | "shy";

type BunnyProps = {
  pose?: BunnyPose;
  className?: string;
  style?: CSSProperties;
};

const INK = "#3d2a31";
const BLUSH = "#f59ab7";

export function Bunny({ pose = "peek", className, style }: BunnyProps) {
  const { id, paint } = useSvgIds();

  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label="A tiny cute white bunny"
      className={className}
      style={style}
    >
      <defs>
        <radialGradient id={id("bunnyBody")} cx="0.4" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.65" stopColor="#fff2f6" />
          <stop offset="1" stopColor="#fedae5" />
        </radialGradient>
        <radialGradient id={id("bunnyPink")} cx="0.4" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffe6ee" />
          <stop offset="1" stopColor="#f7acc4" />
        </radialGradient>
      </defs>

      <g className="animate-breathe" style={pivot(60, 110)}>
        {/* Ears */}
        <g className="animate-sway" style={pivot(42, 50)}>
          <ellipse cx="42" cy="30" rx="9" ry="24" fill={paint("bunnyBody")} transform="rotate(-12 42 30)" />
          <ellipse cx="42" cy="30" rx="4.5" ry="16" fill={paint("bunnyPink")} transform="rotate(-12 42 30)" />
        </g>
        <g className="animate-sway" style={{ ...pivot(78, 50), animationDelay: "-1.5s" }}>
          <ellipse cx="78" cy="30" rx="9" ry="24" fill={paint("bunnyBody")} transform="rotate(12 78 30)" />
          <ellipse cx="78" cy="30" rx="4.5" ry="16" fill={paint("bunnyPink")} transform="rotate(12 78 30)" />
        </g>

        {/* Bunny Body */}
        <ellipse cx="60" cy="85" rx="36" ry="28" fill={paint("bunnyBody")} />

        {/* Head */}
        <ellipse cx="60" cy="62" rx="32" ry="26" fill={paint("bunnyBody")} />

        {/* Cheeks */}
        <ellipse cx="42" cy="70" rx="6" ry="3.5" fill={BLUSH} opacity="0.55" />
        <ellipse cx="78" cy="70" rx="6" ry="3.5" fill={BLUSH} opacity="0.55" />

        {/* Eyes with blinking */}
        <g className="animate-blink" style={pivot(60, 60)}>
          {pose === "cheer" ? (
            <>
              <path d="M46 62 Q50 56 54 62" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
              <path d="M66 62 Q70 56 74 62" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
            </>
          ) : (
            <>
              <ellipse cx="50" cy="60" rx="4" ry="4.5" fill={INK} />
              <ellipse cx="70" cy="60" rx="4" ry="4.5" fill={INK} />
              <circle cx="51.5" cy="58" r="1.5" fill="#fff" />
              <circle cx="71.5" cy="58" r="1.5" fill="#fff" />
            </>
          )}
        </g>

        {/* Nose & Mouth */}
        <polygon points="58,66 62,66 60,68" fill="#e57ea6" />
        <path
          d="M57 69 Q60 72 63 69"
          fill="none"
          stroke={INK}
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* Paws */}
        {pose === "cheer" ? (
          <>
            <ellipse cx="36" cy="64" rx="6" ry="9" fill={paint("bunnyBody")} transform="rotate(-30 36 64)" />
            <ellipse cx="84" cy="64" rx="6" ry="9" fill={paint("bunnyBody")} transform="rotate(30 84 64)" />
          </>
        ) : (
          <>
            <ellipse cx="50" cy="84" rx="6" ry="7" fill={paint("bunnyBody")} />
            <ellipse cx="70" cy="84" rx="6" ry="7" fill={paint("bunnyBody")} />
          </>
        )}
      </g>
    </svg>
  );
}
