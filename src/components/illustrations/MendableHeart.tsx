"use client";

import { m } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { useSvgIds } from "@/lib/svg";
import { Burst } from "./Burst";

const VIEWBOX = "0 0 200 190";
const WHOLE =
  "M100 172 C70 152 14 118 14 66 C14 36 36 16 62 16 C80 16 93 27 100 41 C107 27 120 16 138 16 C164 16 186 36 186 66 C186 118 130 152 100 172 Z";
const CRACK = "L93 146 L107 120 L92 94 L106 68 Z";
const LEFT_HALF = `M100 41 C93 27 80 16 62 16 C36 16 14 36 14 66 C14 118 70 152 100 172 ${CRACK}`;
const RIGHT_HALF = `M100 41 C107 27 120 16 138 16 C164 16 186 36 186 66 C186 118 130 152 100 172 ${CRACK}`;
const FACE_INK = "#4a3048";

const snapTogether = { type: "spring", stiffness: 210, damping: 16 } as const;

type MendableHeartProps = {
  mended: boolean;
  onMend: () => void;
};

export function MendableHeart({ mended, onMend }: MendableHeartProps) {
  const [celebrate, setCelebrate] = useState(false);

  const mend = () => {
    setCelebrate(true);
    onMend();
  };

  return (
    <div className="relative aspect-[200/190] w-[min(74cqw,16.5rem,100cqh)]">
      <div
        aria-hidden
        className={cn(
          "absolute -inset-[14%] rounded-full bg-[radial-gradient(circle,rgb(255_196_218/0.75),transparent_62%)] transition-opacity duration-700",
          mended ? "opacity-100" : "opacity-60",
        )}
      />
      {!mended && (
        <span aria-hidden className="absolute inset-[4%] animate-ping-soft rounded-full border-2 border-blush-300/70" />
      )}

      <div aria-hidden className={cn("absolute inset-0", !mended && "animate-nudge")}>
        <m.div
          className="absolute inset-0 origin-[50%_90%]"
          initial={false}
          animate={mended ? { x: "0%", rotate: 0 } : { x: "-9%", rotate: -10 }}
          transition={snapTogether}
        >
          <HeartHalf side="left" />
        </m.div>
        <m.div
          className="absolute inset-0 origin-[50%_90%]"
          initial={false}
          animate={mended ? { x: "0%", rotate: 0 } : { x: "9%", rotate: 10 }}
          transition={snapTogether}
        >
          <HeartHalf side="right" />
        </m.div>

        <div className={cn("absolute inset-0", mended && "animate-heartbeat [animation-delay:1.4s]")}>
          <m.div
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: mended ? 1 : 0 }}
            transition={{ duration: 0.3, delay: mended ? 0.3 : 0 }}
          >
            <WholeHeart />
          </m.div>
          <m.div
            className="absolute inset-0 origin-[50%_69.5%]"
            initial={false}
            animate={mended ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.3, rotate: -40 }}
            transition={{ ...snapTogether, delay: mended ? 0.55 : 0 }}
          >
            <Bandage />
          </m.div>
        </div>
      </div>

      {celebrate && <Burst delay={0.35} />}
      {!mended && (
        <button
          type="button"
          onClick={mend}
          aria-label="Mend the heart"
          className="absolute inset-0 cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blush-300/70"
        />
      )}
    </div>
  );
}

/** Shared in user space so the halves and the whole heart shade identically and cross-fade seamlessly. */
function HeartGradient({ id }: { id: string }) {
  return (
    <radialGradient id={id} gradientUnits="userSpaceOnUse" cx="72" cy="58" r="125">
      <stop offset="0" stopColor="#ffe8f0" />
      <stop offset="0.5" stopColor="#fbb0c9" />
      <stop offset="1" stopColor="#ec84ab" />
    </radialGradient>
  );
}

function Shine() {
  return (
    <>
      <ellipse cx="50" cy="46" rx="15" ry="8.5" fill="#fff" opacity="0.6" transform="rotate(-35 50 46)" />
      <circle cx="70" cy="33" r="3.5" fill="#fff" opacity="0.6" />
    </>
  );
}

function HeartHalf({ side }: { side: "left" | "right" }) {
  const { id, paint } = useSvgIds();
  const isLeft = side === "left";
  const eyeX = isLeft ? 66 : 134;

  return (
    <svg viewBox={VIEWBOX} className="size-full overflow-visible">
      <defs>
        <HeartGradient id={id("fill")} />
      </defs>
      <path d={isLeft ? LEFT_HALF : RIGHT_HALF} fill={paint("fill")} />
      {isLeft && <Shine />}
      <path d={isLeft ? "M55 72 L75 66" : "M145 72 L125 66"} stroke={FACE_INK} strokeWidth="3.2" strokeLinecap="round" />
      <ellipse cx={eyeX} cy="86" rx="6" ry="7" fill={FACE_INK} />
      <circle cx={eyeX + 2} cy="83.5" r="2.1" fill="#fff" />
      {isLeft && <path d="M60 98 C62.5 102 64 104 64 106.5 A4 4 0 0 1 56 106.5 C56 104 57.5 102 60 98 Z" fill="#bfe0fa" />}
    </svg>
  );
}

function WholeHeart() {
  const { id, paint } = useSvgIds();

  return (
    <svg viewBox={VIEWBOX} className="size-full overflow-visible">
      <defs>
        <HeartGradient id={id("fill")} />
      </defs>
      <path d={WHOLE} fill={paint("fill")} />
      <Shine />
      <path
        d="M57 90 Q66 80 75 90 M125 90 Q134 80 143 90"
        stroke={FACE_INK}
        strokeWidth="3.6"
        strokeLinecap="round"
        fill="none"
      />
      <g fill="#ee7fa8" opacity="0.35">
        <ellipse cx="52" cy="106" rx="11" ry="6.5" />
        <ellipse cx="148" cy="106" rx="11" ry="6.5" />
      </g>
      <path d="M90 104 Q100 114 110 104" stroke={FACE_INK} strokeWidth="3.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function Bandage() {
  return (
    <svg viewBox={VIEWBOX} className="size-full overflow-visible">
      <g transform="rotate(-22 100 132)">
        <rect x="65" y="119" width="70" height="26" rx="13" fill="#cfe6fb" stroke="#a9d1f3" strokeWidth="1.5" />
        <rect x="87" y="122" width="26" height="20" rx="6" fill="#b5d8f6" />
        <g fill="#fff" opacity="0.9">
          <circle cx="74" cy="127" r="1.6" />
          <circle cx="79" cy="136" r="1.6" />
          <circle cx="121" cy="127" r="1.6" />
          <circle cx="126" cy="136" r="1.6" />
        </g>
      </g>
    </svg>
  );
}
