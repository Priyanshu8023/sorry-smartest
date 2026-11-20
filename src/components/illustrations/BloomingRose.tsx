"use client";

import { useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { pivot, useSvgIds, type Paint } from "@/lib/svg";
import { Burst } from "./Burst";
import { Floaties, type Floaty } from "./Floaties";

const BOUNCY = "cubic-bezier(0.34, 1.56, 0.64, 1)";

/** Simple, clean red petals drifting when bloomed */
const DRIFTING_PETALS: readonly Floaty[] = [
  { shape: "petal", color: "#e6194b", size: 12, dx: "-78px", dy: "-64px", spin: "-220deg", dur: "5.6s", delay: "0.7s" },
  { shape: "petal", color: "#ff4d6d", size: 10, dx: "72px", dy: "-90px", spin: "200deg", dur: "6.2s", delay: "1.3s" },
  { shape: "petal", color: "#c40833", size: 11, dx: "-34px", dy: "-118px", spin: "160deg", dur: "6.8s", delay: "2s" },
  { shape: "petal", color: "#ff758c", size: 9, dx: "96px", dy: "-34px", spin: "-180deg", dur: "5.9s", delay: "2.6s" },
  { shape: "petal", color: "#d90429", size: 12, dx: "-100px", dy: "-18px", spin: "240deg", dur: "6.5s", delay: "3.2s" },
  { shape: "petal", color: "#8c021c", size: 10, dx: "30px", dy: "-132px", spin: "-150deg", dur: "7.2s", delay: "3.8s" },
];

type BloomingRoseProps = {
  open: boolean;
  onBloom: () => void;
  tag: readonly [string, string];
};

/**
 * A simple, clean, and classic Red Rose 🌹
 * Uncomplicated, natural, and cute.
 */
export function BloomingRose({ open, onBloom, tag }: BloomingRoseProps) {
  const { id, paint } = useSvgIds();
  const [openOnArrival] = useState(open);
  const celebrate = open && !openOnArrival;

  const unfold = (x: number, y: number, closed: string, delayMs: number): CSSProperties => ({
    ...pivot(x, y),
    transform: open ? "rotate(0deg) scale(1)" : closed,
    transition: `transform 850ms ${BOUNCY} ${delayMs}ms`,
  });

  return (
    <div className="@container relative aspect-[200/260] w-[min(72cqw,15rem,78cqh)]">
      {/* Soft warm pink aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-[22%] -top-[6%] h-[68%] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(255_190_210/0.65),transparent_70%)]"
      />

      {!open && (
        <span
          aria-hidden
          className="absolute left-[30%] top-[7%] aspect-square w-[40%] animate-ping-soft rounded-full border-2 border-red-300/70"
        />
      )}

      <div className="absolute inset-0 origin-[50%_95%] animate-sway">
        <svg
          viewBox="0 0 200 260"
          role="img"
          aria-label={
            open ? "A simple red rose in full bloom" : "A simple red rosebud ready to bloom"
          }
          className="size-full overflow-visible"
        >
          <RoseDefs id={id} />

          {/* Stem & Leaves */}
          <Stem paint={paint} />

          {/* Ribbon */}
          <Ribbon paint={paint} />

          {/* Ribbon string connecting to the tag */}
          <path d="M106 213 Q126 228 142 232" fill="none" stroke="#cbb9f6" strokeWidth="1.3" strokeLinecap="round" />

          {/* 1. Back Crown Petal */}
          <g style={unfold(100, 62, "scale(0)", 80)}>
            <path
              d="M74 62 C70 38 88 26 100 28 C112 26 130 38 126 62 C118 52 82 52 74 62 Z"
              fill={paint("back")}
            />
            <ellipse cx="100" cy="76" rx="27" ry="22" fill="#780000" />
          </g>

          {/* 2. Outer Left Petal */}
          <g style={unfold(100, 108, "rotate(32deg) scale(0)", 140)}>
            <path
              d="M100 110 C80 112 52 104 46 84 C42 70 52 60 64 64 C76 68 88 74 100 80 Z"
              fill={paint("outer")}
            />
          </g>

          {/* 3. Outer Right Petal */}
          <g style={unfold(100, 108, "rotate(-32deg) scale(0)", 180)}>
            <path
              d="M100 110 C120 112 148 104 154 84 C158 70 148 60 136 64 C124 68 112 74 100 80 Z"
              fill={paint("outer")}
            />
          </g>

          {/* 4. Simple Rose Center */}
          <g className={cn(!open && "animate-nudge")} style={pivot(100, 80)}>
            <g
              style={{
                ...pivot(100, 76),
                transform: open ? "scale(0.96)" : "scale(1.04)",
                transition: `transform 700ms ${BOUNCY}`,
              }}
            >
              <SimpleRoseCore paint={paint} />
            </g>

            {/* Closed Bud Green Guard Sepals (fade on bloom) */}
            <g
              style={{
                ...pivot(100, 80),
                transform: open ? "scale(0.5)" : "scale(1)",
                opacity: open ? 0 : 1,
                transition: "transform 400ms ease-in, opacity 300ms ease-in",
              }}
            >
              <path d="M100 82 C88 80 78 70 80 56 C86 66 92 72 100 74 Z" fill={paint("leaf")} />
              <path d="M100 82 C112 80 122 70 120 56 C114 66 108 72 100 74 Z" fill={paint("leaf")} />
              <ellipse cx="100" cy="80" rx="7" ry="4" fill="#52b788" />
            </g>
          </g>

          {/* 5. Middle Left Petal */}
          <g style={unfold(100, 90, "rotate(22deg) scale(0)", 260)}>
            <path
              d="M100 92 C84 94 68 86 64 70 C62 60 66 50 74 48 C72 60 78 72 90 76 C97 78 101 84 100 92 Z"
              fill={paint("wrapLeft")}
            />
          </g>

          {/* 6. Middle Right Petal */}
          <g style={unfold(100, 90, "rotate(-22deg) scale(0)", 300)}>
            <path
              d="M100 92 C116 94 132 86 136 70 C138 60 134 50 126 48 C128 60 122 72 110 76 C103 78 99 84 100 92 Z"
              fill={paint("wrapRight")}
            />
          </g>

          {/* 7. Front Cupping Apron Petal */}
          <g style={unfold(100, 110, "scale(0.85)", 360)}>
            <path
              d="M62 82 C58 106 78 116 100 116 C122 116 142 106 138 82 C126 94 114 96 100 96 C86 96 74 94 62 82 Z"
              fill={paint("cup")}
            />
            {/* Simple smooth highlight on the rim */}
            <path
              d="M66 88 C76 96 88 98 100 98 C112 98 124 96 134 88"
              fill="none"
              stroke="#ffa2b4"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>
        </svg>

        {/* Gift tag */}
        <GiftTag lines={tag} />
      </div>

      {open && <Floaties items={DRIFTING_PETALS} className="left-1/2 top-[30%]" />}
      {celebrate && <Burst className="inset-x-0 top-0 h-[60%]" distance={110} delay={0.6} />}

      {!open && (
        <button
          type="button"
          onClick={onBloom}
          aria-label="Make the rose bloom"
          className="absolute inset-0 cursor-pointer rounded-[2rem] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-400/70"
        />
      )}
    </div>
  );
}

/**
 * Simple, natural rose center:
 * Clean, soft curved petal wraps. No weird eyeballs or messy geometric spirals!
 */
function SimpleRoseCore({ paint }: { paint: Paint }) {
  return (
    <g>
      {/* Background red bud body */}
      <path
        d="M100 36 C114 38 123 52 121 64 C119 78 81 78 79 64 C77 52 86 38 100 36 Z"
        fill={paint("core")}
      />

      {/* Left smooth curved petal fold */}
      <path
        d="M90 46 C94 38 110 38 112 48 C114 58 102 68 96 66"
        fill="none"
        stroke="#800016"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M92 46 C96 40 108 40 110 48"
        fill="none"
        stroke="#ffa2b4"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Right smooth curved petal fold */}
      <path
        d="M108 48 C106 58 96 62 94 66"
        fill="none"
        stroke="#4a000d"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Soft natural petal reflection */}
      <ellipse
        cx="92"
        cy="52"
        rx="3.5"
        ry="7"
        fill="#ffffff"
        opacity="0.4"
        transform="rotate(20 92 52)"
      />
    </g>
  );
}

/** Clean, sweet botanical stem with 2 leaves */
function Stem({ paint }: { paint: Paint }) {
  const vein = { fill: "none", stroke: "#2d6a4f", strokeWidth: 1.4, strokeLinecap: "round", opacity: 0.65 } as const;

  return (
    <>
      <path
        d="M100 80 C96 130 106 170 99 248"
        fill="none"
        stroke={paint("stem")}
        strokeWidth="5.5"
        strokeLinecap="round"
      />

      {/* Left Leaf */}
      <path
        d="M100 152 C88 140 68 140 58 150 C70 160 88 162 100 152 Z"
        fill={paint("leaf")}
      />
      <path d="M98 152 Q80 147 64 150" {...vein} />

      {/* Right Leaf */}
      <path
        d="M101 180 C114 166 134 166 144 176 C132 186 114 188 101 180 Z"
        fill={paint("leaf")}
      />
      <path d="M103 180 Q122 174 138 176" {...vein} />
    </>
  );
}

/** Cute pastel ribbon bow */
function Ribbon({ paint }: { paint: Paint }) {
  const shine = { fill: "none", stroke: "#ffffff", strokeOpacity: 0.75, strokeWidth: 1.6, strokeLinecap: "round" } as const;

  return (
    <g>
      {/* Ribbon Tails */}
      <path d="M98 216 C94 226 90 234 84 241 L92 239 L94 246 C98 236 100 227 100.5 217 Z" fill={paint("ribbonDeep")} />
      <path d="M104 216 C108 226 112 233 118 240 L110 239.5 L109 246 C105 236 103 227 102.5 217 Z" fill={paint("ribbonDeep")} />
      {/* Bow Left Loop */}
      <path d="M97 211 C85 199 70 201 72 212 C74 223 87 221 97 214 Z" fill={paint("ribbon")} />
      {/* Bow Right Loop */}
      <path d="M105 211 C117 199 132 201 130 212 C128 223 115 221 105 214 Z" fill={paint("ribbon")} />
      {/* Highlights */}
      <path d="M93 209 C86 204 79 205 77 210" {...shine} />
      <path d="M109 209 C116 204 123 205 125 210" {...shine} />
      {/* Center Knot */}
      <rect x="95.5" y="207" width="11" height="10" rx="4" fill={paint("ribbonDeep")} />
    </g>
  );
}

/** Gift tag tied to the stem */
function GiftTag({ lines }: { lines: readonly [string, string] }) {
  return (
    <div className="absolute left-[69%] top-[91%]">
      <div className="origin-top-left animate-swing">
        <p className="absolute -left-2.5 top-0 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#fffaf3] py-1 pl-5 pr-3 text-left font-hand text-[clamp(0.8rem,7.8cqw,1.05rem)] font-semibold leading-[1.05] text-red-700 shadow-[0_8px_16px_-10px_rgb(180_40_70/0.45)] ring-1 ring-red-200">
          <span
            aria-hidden
            className="absolute left-2 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-red-100 ring-1 ring-red-300"
          />
          {lines[0]}
          <br />
          {lines[1]}
        </p>
      </div>
    </div>
  );
}

/** Simple, proper red rose gradients */
function RoseDefs({ id }: { id: (name: string) => string }) {
  return (
    <defs>
      {/* Outer vibrant crimson to ruby red */}
      <radialGradient id={id("outer")} cx="0.5" cy="0.25" r="0.85">
        <stop offset="0" stopColor="#ff4d6d" />
        <stop offset="0.6" stopColor="#d90429" />
        <stop offset="1" stopColor="#a3021f" />
      </radialGradient>

      {/* Deep burgundy back crown */}
      <radialGradient id={id("back")} cx="0.5" cy="0.8" r="0.9">
        <stop offset="0" stopColor="#d90429" />
        <stop offset="1" stopColor="#780000" />
      </radialGradient>

      {/* Rose core */}
      <radialGradient id={id("core")} cx="0.45" cy="0.35" r="0.8">
        <stop offset="0" stopColor="#ff5e7e" />
        <stop offset="0.55" stopColor="#d90429" />
        <stop offset="1" stopColor="#800016" />
      </radialGradient>

      {/* Left wrapping petal */}
      <radialGradient id={id("wrapLeft")} cx="0.3" cy="0.3" r="0.9">
        <stop offset="0" stopColor="#ff5e7e" />
        <stop offset="0.6" stopColor="#c90a31" />
        <stop offset="1" stopColor="#800016" />
      </radialGradient>

      {/* Right wrapping petal */}
      <radialGradient id={id("wrapRight")} cx="0.7" cy="0.3" r="0.9">
        <stop offset="0" stopColor="#ff5e7e" />
        <stop offset="0.6" stopColor="#c90a31" />
        <stop offset="1" stopColor="#800016" />
      </radialGradient>

      {/* Front cup petal */}
      <linearGradient id={id("cup")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ff4d6d" />
        <stop offset="0.45" stopColor="#d90429" />
        <stop offset="1" stopColor="#780000" />
      </linearGradient>

      {/* Fresh Green Stem & Leaves */}
      <linearGradient id={id("leaf")} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#95d5b2" />
        <stop offset="1" stopColor="#52b788" />
      </linearGradient>
      <linearGradient id={id("stem")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#74c69d" />
        <stop offset="1" stopColor="#40916c" />
      </linearGradient>

      {/* Lavender Ribbon */}
      <linearGradient id={id("ribbon")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ece4ff" />
        <stop offset="1" stopColor="#cbb9f6" />
      </linearGradient>
      <linearGradient id={id("ribbonDeep")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#b49be8" />
        <stop offset="1" stopColor="#8768d6" />
      </linearGradient>
    </defs>
  );
}
