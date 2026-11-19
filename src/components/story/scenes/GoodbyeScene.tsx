"use client";

import { m } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { Bunny } from "@/components/illustrations/Bunny";
import { Floaties, type Floaty } from "@/components/illustrations/Floaties";
import { Teddy } from "@/components/illustrations/Teddy";
import { copy } from "@/content/story";
import { GhostButton } from "../Buttons";
import { SceneLayout } from "../SceneLayout";
import type { SceneProps } from "../types";

const RISING_HEARTS: readonly Floaty[] = [
  { shape: "heart", color: "#f9afc9", size: 14, dx: "-90px", dy: "-120px", spin: "-30deg", dur: "6s", delay: "0.8s" },
  { shape: "heart", color: "#cbb9f6", size: 11, dx: "80px", dy: "-140px", spin: "25deg", dur: "6.8s", delay: "1.6s" },
  { shape: "heart", color: "#ffcfb8", size: 12, dx: "-40px", dy: "-160px", spin: "20deg", dur: "7.2s", delay: "2.6s" },
  { shape: "heart", color: "#a9d1f3", size: 10, dx: "110px", dy: "-90px", spin: "-20deg", dur: "6.4s", delay: "3.4s" },
  { shape: "heart", color: "#f9afc9", size: 9, dx: "40px", dy: "-170px", spin: "30deg", dur: "7.6s", delay: "4.2s" },
  { shape: "petal", color: "#ffc2d6", size: 10, dx: "-70px", dy: "-100px", spin: "-160deg", dur: "7s", delay: "2s" },
  { shape: "petal", color: "#e4d6ff", size: 8, dx: "60px", dy: "-130px", spin: "140deg", dur: "6.6s", delay: "3s" },
];

export function GoodbyeScene({ onRestart }: SceneProps) {
  const { label, title, subtitle, signature, replay } = copy.goodbye;

  return (
    <SceneLayout
      label={label}
      stage={
        <div className="relative">
          <Floaties items={RISING_HEARTS} className="left-1/2 top-[45%]" />
          <Teddy pose="wave" className="w-[min(80cqw,17rem,94cqh)] animate-enter [animation-delay:100ms]" />
          <Bunny
            pose="cheer"
            className="absolute -bottom-1 -left-2 w-16 animate-enter [animation-delay:400ms] drop-shadow-xs"
          />
        </div>
      }
      actions={
        <div className="animate-enter [animation-delay:900ms]">
          <GhostButton onClick={onRestart}>
            <RotateCcw aria-hidden className="size-4" />
            {replay}
          </GhostButton>
        </div>
      }
    >
      <m.p
        className="animate-enter font-hand text-[clamp(1.6rem,calc((100vw_-_4.75rem)/6.6),2.5rem)] font-bold leading-none text-ink [animation-delay:250ms] desk:text-[2.9rem] landscape-phone:text-[clamp(1.6rem,10svh,2.5rem)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {title}
      </m.p>
      <p className="animate-enter mt-2 font-hand text-[clamp(1.45rem,1rem+3.4vw,2rem)] leading-tight text-blush-600 [animation-delay:450ms] short:mt-1 landscape-phone:text-[clamp(1.3rem,8svh,2rem)]">
        {subtitle}
      </p>
      <div className="animate-enter mt-4 flex flex-col items-center [animation-delay:700ms] short:mt-2">
        <p className="font-hand text-[clamp(1.35rem,1rem+2.2vw,1.6rem)] text-ink-soft landscape-phone:text-[clamp(1.2rem,6.4svh,1.6rem)]">
          {signature}
        </p>
        <svg viewBox="0 0 120 12" aria-hidden className="-mt-1 w-32">
          <defs>
            <linearGradient id="signature-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#f9afc9" />
              <stop offset="0.5" stopColor="#cbb9f6" />
              <stop offset="1" stopColor="#f9afc9" />
            </linearGradient>
          </defs>
          <path
            d="M2 8 C30 2 60 12 88 5 C98 3 108 4 118 7"
            fill="none"
            stroke="url(#signature-line)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </SceneLayout>
  );
}
