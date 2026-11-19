"use client";

import { m } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { Teddy } from "@/components/illustrations/Teddy";
import { copy } from "@/content/story";
import { cn } from "@/lib/cn";
import { ContinueButton } from "../Buttons";
import { HandwrittenMessage } from "../RevealText";
import { SceneLayout } from "../SceneLayout";
import type { SceneProps } from "../types";

const REVEAL_AFTER_MS = 2200;

export function ApologyScene({ revealed, onReveal, onNext }: SceneProps) {
  const { label, bubble, message, sorry } = copy.apology;
  const [revealedOnArrival] = useState(revealed);

  useEffect(() => {
    if (revealed) return;
    const timer = window.setTimeout(onReveal, REVEAL_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, [revealed, onReveal]);

  return (
    <SceneLayout
      label={label}
      stage={
        <>
          <SpeechBubble className={revealedOnArrival ? undefined : "animate-pop [animation-delay:600ms]"}>
            {bubble}
          </SpeechBubble>
          <Teddy pose="shy" className="mt-1 w-[min(67cqw,15.5rem,calc((100cqh-4rem)*0.95))]" />
        </>
      }
      actions={revealed && <ContinueButton onClick={onNext} delay={revealedOnArrival ? 0 : 1.4} />}
    >
      {/* Laid out invisibly from the start so the bear doesn't shrink when the words appear. */}
      <div className="grid place-items-center">
        <m.div
          aria-hidden
          className={cn("[grid-area:1/1]", !revealed && "invisible")}
          initial={false}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.7 }}
        >
          <HandwrittenMessage>
            {message}{" "}
            <span
              className={cn(
                "whitespace-nowrap rounded-md bg-[linear-gradient(transparent_55%,rgb(255_208_224/0.95)_55%)] bg-no-repeat px-1 text-blush-600",
                revealed && !revealedOnArrival && "animate-highlight [animation-delay:900ms]",
              )}
            >
              {sorry}
            </span>
          </HandwrittenMessage>
        </m.div>
        <p aria-live="polite" className="sr-only">
          {revealed ? `${message} ${sorry}` : null}
        </p>
      </div>
    </SceneLayout>
  );
}

function SpeechBubble({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "relative whitespace-nowrap rounded-[1.4rem] bg-white px-5 py-2.5 font-hand text-[clamp(1.15rem,8.2vw,1.7rem)] leading-none text-ink shadow-[0_10px_24px_-12px_rgb(150_90_140/0.45)] ring-1 ring-blush-100",
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className="absolute -bottom-[7px] left-1/2 size-3.5 -translate-x-1/2 rotate-45 bg-white shadow-[1px_1px_0_0_var(--color-blush-100)]"
      />
    </p>
  );
}
