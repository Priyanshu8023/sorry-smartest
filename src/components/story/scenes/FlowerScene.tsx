"use client";

import { m } from "framer-motion";
import { useState } from "react";
import { Bunny } from "@/components/illustrations/Bunny";
import { FlowerBouquet } from "@/components/illustrations/FlowerBouquet";
import { copy } from "@/content/story";
import { ContinueButton, PrimaryButton } from "../Buttons";
import { HandwrittenMessage } from "../RevealText";
import { SceneLayout } from "../SceneLayout";
import type { SceneProps } from "../types";

export function FlowerScene({ revealed, onReveal, onNext }: SceneProps) {
  const { label, tag } = copy.flower;
  const [revealedOnArrival] = useState(revealed);

  return (
    <SceneLayout
      label={label}
      stage={
        <div className="relative flex items-center justify-center">
          <FlowerBouquet open={revealed} onBloom={onReveal} tag={tag} />
          {revealed && (
            <div className="absolute -bottom-2 -left-6 animate-pop">
              <Bunny pose="cheer" className="w-14 drop-shadow-xs" />
            </div>
          )}
        </div>
      }
      actions={
        <div className="flex flex-col items-center">
          {!revealed ? (
            <div className="animate-pop">
              <PrimaryButton onClick={onReveal} className="px-6 py-3.5 text-[1rem]">
                A little bouquet for you 💐
              </PrimaryButton>
            </div>
          ) : (
            <ContinueButton onClick={onNext} delay={revealedOnArrival ? 0 : 2.0} autoFocus={!revealedOnArrival} />
          )}
        </div>
      }
    >
      <div className="grid place-items-center min-h-[5.5rem] px-2">
        <m.div
          aria-hidden={!revealed}
          initial={false}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.8, delay: revealedOnArrival ? 0 : 0.9 }}
          className={!revealed ? "invisible" : undefined}
        >
          <div className="space-y-1.5 max-w-[25rem]">
            <HandwrittenMessage>
              Not just any flowers... a little bouquet for someone special. 💐
            </HandwrittenMessage>
            <p className="font-display text-[clamp(0.85rem,0.75rem+0.5vw,0.95rem)] leading-relaxed text-ink-soft">
              I wish I could express everything through these flowers, but for now, this is my little way of saying I’m sorry.
            </p>
          </div>
        </m.div>

        {!revealed && (
          <p className="font-display text-sm font-semibold text-blush-500 animate-pulse">
            Tap the bouquet to see it bloom 🌸
          </p>
        )}
      </div>
    </SceneLayout>
  );
}
