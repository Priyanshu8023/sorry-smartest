"use client";

import { useState } from "react";
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
      stage={<MendableHeart mended={revealed} onMend={onReveal} />}
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
