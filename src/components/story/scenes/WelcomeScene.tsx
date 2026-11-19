"use client";

import { m } from "framer-motion";
import { Bunny } from "@/components/illustrations/Bunny";
import { Teddy } from "@/components/illustrations/Teddy";
import { copy } from "@/content/story";
import { SPARKLE_PATH, SPARKLE_VIEWBOX } from "@/components/illustrations/paths";
import { PrimaryButton } from "../Buttons";
import { SceneLayout } from "../SceneLayout";
import type { SceneProps } from "../types";

const WELCOME_SPARKLES = [
  { x: -60, y: -30, size: 10, color: "#f9afc9", delay: 0.8 },
  { x: 50, y: -50, size: 12, color: "#cbb9f6", delay: 1.0 },
  { x: -40, y: 20, size: 8, color: "#a9d1f3", delay: 1.2 },
  { x: 65, y: 10, size: 9, color: "#ffcfb8", delay: 1.4 },
];

export function WelcomeScene({ onNext }: SceneProps) {
  const { label, title, subtitle, cta } = copy.welcome;

  return (
    <SceneLayout
      label={label}
      stage={
        <div className="relative">
          {/* Sparkles around the teddy */}
          {WELCOME_SPARKLES.map((s, i) => (
            <m.span
              key={i}
              className="absolute left-1/2 top-1/2 z-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.6, 1, 0],
                scale: [0, 1.2, 0.8, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                delay: s.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ marginLeft: s.x, marginTop: s.y }}
            >
              <svg viewBox={SPARKLE_VIEWBOX} width={s.size} height={s.size} fill={s.color}>
                <path d={SPARKLE_PATH} />
              </svg>
            </m.span>
          ))}
          <Teddy pose="heart" className="w-[min(80cqw,17rem,94cqh)] animate-enter [animation-delay:100ms]" />
          <Bunny
            pose="peek"
            className="absolute -bottom-1 -right-3 w-16 animate-enter [animation-delay:400ms] drop-shadow-xs"
          />
        </div>
      }
      actions={
        <div className="animate-enter [animation-delay:600ms]">
          <PrimaryButton onClick={onNext}>{cta}</PrimaryButton>
        </div>
      }
    >
      <p className="animate-enter font-hand text-[clamp(1.75rem,calc((100vw_-_4.75rem)/7),2.6rem)] font-bold leading-none text-ink [animation-delay:250ms] desk:text-5xl">
        {title}
      </p>
      <p className="animate-enter mt-3 font-display text-[clamp(0.95rem,0.8rem+1vw,1.05rem)] font-medium text-ink-soft [animation-delay:400ms] short:mt-2 desk:text-lg">
        {subtitle}
      </p>
    </SceneLayout>
  );
}
