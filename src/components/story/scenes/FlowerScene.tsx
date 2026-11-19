"use client";

import { useState } from "react";
import { BloomingRose } from "@/components/illustrations/BloomingRose";
import { copy } from "@/content/story";
import { ContinueButton } from "../Buttons";
import { HandwrittenMessage, RevealText } from "../RevealText";
import { SceneLayout } from "../SceneLayout";
import type { SceneProps } from "../types";

export function FlowerScene({ revealed, onReveal, onNext }: SceneProps) {
  const { label, hint, tag, message } = copy.flower;
  const [revealedOnArrival] = useState(revealed);

  return (
    <SceneLayout
      label={label}
      stage={<BloomingRose open={revealed} onBloom={onReveal} tag={tag} />}
      actions={
        revealed && (
          <ContinueButton onClick={onNext} delay={revealedOnArrival ? 0 : 1.9} autoFocus={!revealedOnArrival} />
        )
      }
    >
      <RevealText revealed={revealed} hint={hint} delay={1}>
        <HandwrittenMessage>{message}</HandwrittenMessage>
      </RevealText>
    </SceneLayout>
  );
}
