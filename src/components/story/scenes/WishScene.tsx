"use client";

import { useState } from "react";
import { WishEnvelope } from "@/components/illustrations/WishEnvelope";
import { copy } from "@/content/story";
import { ContinueButton } from "../Buttons";
import { Hint } from "../RevealText";
import { SceneLayout } from "../SceneLayout";
import type { SceneProps } from "../types";

export function WishScene({ revealed, onReveal, onNext }: SceneProps) {
  const { label, hint, message } = copy.wish;
  const [revealedOnArrival] = useState(revealed);

  return (
    <SceneLayout
      label={label}
      stage={<WishEnvelope open={revealed} onOpen={onReveal} message={message} />}
      actions={
        revealed && (
          <ContinueButton onClick={onNext} delay={revealedOnArrival ? 0 : 2.3} autoFocus={!revealedOnArrival} />
        )
      }
    >
      {/* The letter itself is decorative, so screen readers hear the wish from here. */}
      <div aria-live="polite" className="grid min-h-[3.25rem] place-items-center">
        {revealed ? <p className="sr-only">{message}</p> : <Hint>{hint}</Hint>}
      </div>
    </SceneLayout>
  );
}
