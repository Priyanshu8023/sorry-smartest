"use client";

import { useState } from "react";
import { Bunny } from "@/components/illustrations/Bunny";
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
      stage={
        <div className="relative">
          <WishEnvelope open={revealed} onOpen={onReveal} message={message} />
          {revealed && (
            <div className="absolute -bottom-1 -right-3 animate-pop">
              <Bunny pose="shy" className="w-13 drop-shadow-xs" />
            </div>
          )}
        </div>
      }
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
