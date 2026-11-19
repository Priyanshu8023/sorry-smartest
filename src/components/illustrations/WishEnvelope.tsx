"use client";

import { m } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { useSvgIds } from "@/lib/svg";
import { Burst } from "./Burst";
import { HEART_PATH, HEART_VIEWBOX } from "./paths";

const EASE = [0.22, 1, 0.36, 1] as const;

/*
 * Opening choreography: the seal pops, the flap folds back (and drops behind the letter),
 * the letter rises out of the pocket, then comes forward and settles in front of it.
 */
const LETTER_RISE = { delay: 0.75, duration: 1.25 };
const LETTER_IN_FRONT_AT = LETTER_RISE.delay + LETTER_RISE.duration / 2;

type WishEnvelopeProps = {
  open: boolean;
  onOpen: () => void;
  message: string;
};

export function WishEnvelope({ open, onOpen, message }: WishEnvelopeProps) {
  // Celebrate only when the envelope gets opened during this visit, not when coming back to it.
  const [openOnArrival] = useState(open);
  const celebrate = open && !openOnArrival;

  return (
    <div className="relative w-[min(96cqw,19rem,100cqh)] pt-[30%]">
      <div className="relative animate-float">
        <div className="@container relative aspect-[1.55] perspective-[1000px]">
          <div
            aria-hidden
            className="absolute inset-0 rounded-[1.1rem] bg-linear-to-b from-[#f1a9c3] to-[#fbd3e1] shadow-[0_26px_44px_-22px_rgb(214_110_155/0.6)]"
          />

          <m.div
            aria-hidden
            className="letter-paper absolute inset-x-[6%] top-[7%] flex h-[86%] items-center justify-center rounded-[0.8rem] px-[6%] py-[4%] shadow-[0_10px_24px_-12px_rgb(150_90_130/0.5)] ring-1 ring-blush-100"
            initial={false}
            animate={
              open
                ? { y: ["0%", "-64%", "-30%"], scale: [1, 1, 1.07], zIndex: 5 }
                : { y: "0%", scale: 1, zIndex: 1 }
            }
            transition={
              open
                ? {
                    y: { ...LETTER_RISE, times: [0, 0.5, 1], ease: EASE },
                    scale: { ...LETTER_RISE, times: [0, 0.5, 1] },
                    zIndex: { duration: 0, delay: LETTER_IN_FRONT_AT },
                  }
                : { duration: 0 }
            }
          >
            <p className="text-center font-hand text-[7.2cqw] leading-[1.16] text-ink">{message}</p>
            <svg viewBox={HEART_VIEWBOX} className="absolute bottom-[6%] right-[4%] w-[6%]" fill="#f9afc9">
              <path d={HEART_PATH} />
            </svg>
          </m.div>

          <div aria-hidden className="pointer-events-none absolute inset-0 z-[2]">
            <div className="absolute inset-0 rounded-[1.1rem] bg-[#f9c3d6] [clip-path:polygon(0_0,50%_54%,0_100%)]" />
            <div className="absolute inset-0 rounded-[1.1rem] bg-[#f9c3d6] [clip-path:polygon(100%_0,50%_54%,100%_100%)]" />
            <div className="absolute inset-0 rounded-[1.1rem] bg-linear-to-b from-[#fcd6e3] to-[#ffe6ee] [clip-path:polygon(0_100%,50%_50%,100%_100%)]" />
          </div>

          <m.div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[58%] origin-top rounded-t-[1.1rem] bg-linear-to-b from-[#f8bdd2] to-[#f1a2c0] [clip-path:polygon(0_0,100%_0,50%_100%)]"
            initial={false}
            animate={open ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 3 }}
            transition={
              open
                ? { rotateX: { duration: 0.6, delay: 0.2, ease: EASE }, zIndex: { duration: 0, delay: 0.55 } }
                : { duration: 0 }
            }
          />

          <m.div
            aria-hidden
            className="absolute left-1/2 top-[58%] z-[4] w-[17%] -translate-x-1/2 -translate-y-1/2"
            initial={false}
            animate={open ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className={cn(!open && "animate-heartbeat")}>
              <Seal />
            </div>
          </m.div>

          {!open && (
            <button
              type="button"
              onClick={onOpen}
              aria-label="Open the envelope"
              className="absolute inset-0 z-10 cursor-pointer rounded-[1.1rem] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blush-300/70"
            />
          )}
        </div>
        {celebrate && <Burst distance={150} delay={0.1} />}
      </div>
    </div>
  );
}

function Seal() {
  const { id, paint } = useSvgIds();
  return (
    <svg viewBox={HEART_VIEWBOX} className="h-auto w-full drop-shadow-[0_3px_4px_rgb(180_90_130/0.35)]">
      <defs>
        <radialGradient id={id("wax")} cx="0.38" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffd6e4" />
          <stop offset="0.6" stopColor="#f08db3" />
          <stop offset="1" stopColor="#d4628f" />
        </radialGradient>
      </defs>
      <path d={HEART_PATH} fill={paint("wax")} />
      <ellipse cx="-11" cy="-15" rx="6" ry="3.6" fill="#fff" opacity="0.55" transform="rotate(-30 -11 -15)" />
    </svg>
  );
}
