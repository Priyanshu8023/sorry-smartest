"use client";

import { m } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SPARKLE_PATH, SPARKLE_VIEWBOX } from "../illustrations/paths";

export function Hint({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3.5 py-2 text-[clamp(0.78rem,4.4vw,0.875rem)] font-semibold text-ink-soft shadow-[0_6px_16px_-10px_rgb(150_90_140/0.5)] ring-1 ring-blush-100 min-[22.5rem]:px-4 transition-all duration-300 hover:bg-white/90 hover:shadow-[0_8px_20px_-10px_rgb(150_90_140/0.6)]">
      <Sparkles aria-hidden className="size-4 shrink-0 text-blush-500 animate-bounce-soft" />
      {children}
    </p>
  );
}

type RevealTextProps = {
  revealed: boolean;
  hint: string;
  children: ReactNode;
  /** Seconds to hold the message back while the illustration finishes its moment. */
  delay?: number;
};

/** Sparkle burst when text is revealed */
function RevealSparkles({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-visible">
      {[
        { x: -30, y: -10, delay: 0, color: "#f9afc9" },
        { x: 30, y: -8, delay: 0.1, color: "#cbb9f6" },
        { x: -15, y: -16, delay: 0.15, color: "#ffcfb8" },
        { x: 20, y: -14, delay: 0.2, color: "#a9d1f3" },
      ].map((s, i) => (
        <m.span
          key={i}
          className="absolute left-1/2 top-1/2"
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
            x: s.x,
            y: s.y,
          }}
          transition={{ duration: 0.7, delay: s.delay, ease: "easeOut" }}
        >
          <svg viewBox={SPARKLE_VIEWBOX} width={10} height={10} fill={s.color}>
            <path d={SPARKLE_PATH} />
          </svg>
        </m.span>
      ))}
    </div>
  );
}

/**
 * Swaps a gentle hint for the scene's message once the illustration has been tapped.
 * Both share one grid cell and the message is laid out (invisibly) from the start,
 * so the space is reserved and the illustration never jumps when the words appear.
 */
export function RevealText({ revealed, hint, children, delay = 0.6 }: RevealTextProps) {
  return (
    <div className="relative grid place-items-center">
      <RevealSparkles visible={revealed} />
      <m.div
        aria-hidden
        className={cn("[grid-area:1/1]", !revealed && "invisible")}
        initial={false}
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.7, delay: revealed ? delay : 0 }}
      >
        {children}
      </m.div>
      <m.div
        aria-hidden={revealed}
        className={cn("[grid-area:1/1]", revealed && "pointer-events-none")}
        initial={false}
        animate={revealed ? { opacity: 0, y: -6 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Hint>{hint}</Hint>
      </m.div>
      <div aria-live="polite" className="sr-only">
        {revealed ? children : null}
      </div>
    </div>
  );
}

export function HandwrittenMessage({ children }: { children: ReactNode }) {
  return (
    <p className="font-hand text-[clamp(1.4rem,1rem+2.6vw,1.75rem)] leading-[1.22] text-ink desk:text-[2rem] landscape-phone:text-[clamp(1.3rem,6.5svh,1.75rem)]">
      {children}
    </p>
  );
}
