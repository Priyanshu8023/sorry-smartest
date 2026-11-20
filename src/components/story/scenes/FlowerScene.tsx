"use client";

import { useState } from "react";
import { BloomingRose } from "@/components/illustrations/BloomingRose";
import { Bunny } from "@/components/illustrations/Bunny";
import { copy } from "@/content/story";
import { ContinueButton, PrimaryButton } from "../Buttons";
import { HandwrittenMessage, RevealText } from "../RevealText";
import { SceneLayout } from "../SceneLayout";
import type { SceneProps } from "../types";

export function FlowerScene({ revealed, onReveal, onNext }: SceneProps) {
  const { label, hint, cta, tag, message } = copy.flower;
  const [revealedOnArrival] = useState(revealed);

  return (
    <SceneLayout
      label={label}
      stage={
        <div className="relative">
          <BloomingRose open={revealed} onBloom={onReveal} tag={tag} />
          {revealed && (
            <div className="absolute bottom-6 -left-6 animate-pop sm:-left-8">
              <Bunny pose="cheer" className="w-13 drop-shadow-xs sm:w-14" />
            </div>
          )}
        </div>
      }
      actions={
        <div className="flex flex-col items-center">
          {!revealed ? (
            <div className="animate-pop">
              <PrimaryButton onClick={onReveal} className="px-6 py-3.5 text-[1rem]">
                {cta}
              </PrimaryButton>
            </div>
          ) : (
            <ContinueButton onClick={onNext} delay={revealedOnArrival ? 0 : 2.0} autoFocus={!revealedOnArrival} />
          )}
        </div>
      }
    >
      <RevealText revealed={revealed} hint={hint} delay={0.9}>
        <HandwrittenMessage>{message}</HandwrittenMessage>
      </RevealText>
    </SceneLayout>
  );
}
