"use client";

import { useState } from "react";
import { Bunny } from "@/components/illustrations/Bunny";
import { MendableHeart } from "@/components/illustrations/MendableHeart";
import { copy } from "@/content/story";
import { ContinueButton } from "../Buttons";
import { HandwrittenMessage, RevealText } from "../RevealText";
import { SceneLayout } from "../SceneLayout";
import type { SceneProps } from "../types";

export function HeartScene({ revealed, onReveal, onNext }: SceneProps) {
  const { label, hint, message } = copy.heart;
  const [revealedOnArrival] = useState(revealed);

  return (
    <SceneLayout
      label={label}
      stage={
        <div className="relative">
          <MendableHeart mended={revealed} onMend={onReveal} />
          {revealed && (
            <div className="absolute -bottom-2 -right-4 animate-pop">
              <Bunny pose="cheer" className="w-13 drop-shadow-xs" />
            </div>
          )}
        </div>
      }
      actions={
        revealed && (
          <ContinueButton onClick={onNext} delay={revealedOnArrival ? 0 : 1.7} autoFocus={!revealedOnArrival} />
        )
      }
    >
      <RevealText revealed={revealed} hint={hint} delay={0.8}>
        <HandwrittenMessage>{message}</HandwrittenMessage>
      </RevealText>
    </SceneLayout>
  );
}
