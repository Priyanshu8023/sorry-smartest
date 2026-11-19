"use client";

import { useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { pivot, useSvgIds, type Paint } from "@/lib/svg";
import { Burst } from "./Burst";
import { Floaties, type Floaty } from "./Floaties";

const BOUNCY = "cubic-bezier(0.34, 1.56, 0.64, 1)";

const DRIFTING_PETALS: readonly Floaty[] = [
  { shape: "petal", color: "#e6194b", size: 13, dx: "-85px", dy: "-75px", spin: "-220deg", dur: "5.6s", delay: "0.6s" },
  { shape: "petal", color: "#c40833", size: 11, dx: "80px", dy: "-95px", spin: "200deg", dur: "6.2s", delay: "1.2s" },
  { shape: "petal", color: "#8c021c", size: 12, dx: "-40px", dy: "-125px", spin: "160deg", dur: "6.8s", delay: "1.8s" },
  { shape: "petal", color: "#ff4d6d", size: 10, dx: "98px", dy: "-40px", spin: "-180deg", dur: "5.9s", delay: "2.4s" },
  { shape: "petal", color: "#d90429", size: 13, dx: "-105px", dy: "-25px", spin: "240deg", dur: "6.5s", delay: "3.0s" },
  { shape: "petal", color: "#ff758c", size: 11, dx: "35px", dy: "-140px", spin: "-150deg", dur: "7.2s", delay: "3.6s" },
];

type FlowerBouquetProps = {
  open: boolean;
  onBloom: () => void;
  tag: readonly [string, string];
};

export function FlowerBouquet({ open, onBloom, tag }: FlowerBouquetProps) {
  const { id, paint } = useSvgIds();
  const [openOnArrival] = useState(open);
  const celebrate = open && !openOnArrival;

  // Unfold helper
  const unfold = (x: number, y: number, closed: string, delayMs: number): CSSProperties => ({
    ...pivot(x, y),
    transform: open ? "rotate(0deg) scale(1)" : closed,
    transition: `transform 900ms ${BOUNCY} ${delayMs}ms`,
  });

  return (
    <div className="@container relative aspect-[240/280] w-[min(82cqw,18rem,84cqh)]">
      {/* Warm rosy aura around the bouquet */}
      <div
        aria-hidden
        className="absolute -inset-x-[20%] -top-[6%] h-[75%] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(255_190_210/0.65),rgb(255_240_245/0.2)_50%,transparent_75%)]"
      />

      {!open && (
        <span
          aria-hidden
          className="absolute left-[32%] top-[12%] aspect-square w-[36%] animate-ping-soft rounded-full border-2 border-red-300/70"
        />
      )}

      <div className="absolute inset-0 origin-[50%_92%] animate-sway">
        <svg
          viewBox="0 0 240 280"
          role="img"
          aria-label={
            open ? "A gorgeous bouquet of blooming red roses and flowers wrapped in paper" : "A beautifully wrapped bouquet of red rosebuds"
          }
          className="size-full overflow-visible"
        >
          <BouquetDefs id={id} />

          {/* 1. Back Layer: Eucalyptus & Foliage */}
          <g>
            <path d="M70 120 C50 85 65 50 85 40 C95 65 90 95 80 120 Z" fill={paint("leafDeep")} />
            <path d="M170 120 C190 85 175 50 155 40 C145 65 150 95 160 120 Z" fill={paint("leafDeep")} />
            <path d="M120 100 C110 60 120 30 130 20 C138 45 132 75 125 100 Z" fill={paint("leaf")} />
          </g>

          {/* 2. Back Wrapping Paper Cone */}
          <path
            d="M38 128 L104 266 C112 274 128 274 136 266 L202 128 C208 116 198 102 184 106 L120 122 L56 106 C42 102 32 116 38 128 Z"
            fill={paint("paperBack")}
            stroke="#f5cfdc"
            strokeWidth="1.5"
          />

          {/* 3. Baby's breath filler flowers (white & pale pink florets) */}
          <g className="animate-breathe" style={pivot(120, 90)}>
            {/* Left sprig */}
            <circle cx="68" cy="85" r="4.2" fill="#fff" />
            <circle cx="68" cy="85" r="1.5" fill="#fcd34d" />
            <circle cx="56" cy="95" r="3.6" fill="#fff" />
            <circle cx="56" cy="95" r="1.2" fill="#fcd34d" />
            <circle cx="78" cy="74" r="3.4" fill="#fff" />

            {/* Right sprig */}
            <circle cx="172" cy="85" r="4.2" fill="#fff" />
            <circle cx="172" cy="85" r="1.5" fill="#fcd34d" />
            <circle cx="184" cy="95" r="3.6" fill="#fff" />
            <circle cx="184" cy="95" r="1.2" fill="#fcd34d" />
            <circle cx="162" cy="74" r="3.4" fill="#fff" />

            {/* Top sprig */}
            <circle cx="120" cy="52" r="3.8" fill="#fff" />
            <circle cx="120" cy="52" r="1.3" fill="#fcd34d" />
            <circle cx="132" cy="45" r="3.2" fill="#fff" />
            <circle cx="108" cy="45" r="3.2" fill="#fff" />
          </g>

          {/* 4. Left Rosebud */}
          <g
            style={unfold(78, 110, "rotate(-18deg) scale(0.85)", 100)}
            className="origin-bottom-left"
          >
            <MiniRose cx={78} cy={108} scale={0.88} paint={paint} open={open} />
          </g>

          {/* 5. Right Rosebud */}
          <g
            style={unfold(162, 110, "rotate(18deg) scale(0.85)", 150)}
            className="origin-bottom-right"
          >
            <MiniRose cx={162} cy={108} scale={0.88} paint={paint} open={open} />
          </g>

          {/* 6. Top Center Accent Rosebud */}
          <g
            style={unfold(120, 68, "scale(0.8)", 80)}
            className="origin-center"
          >
            <MiniRose cx={120} cy={68} scale={0.78} paint={paint} open={open} />
          </g>

          {/* 7. Center Queen Rose (Large Blooming Rose) */}
          <g
            style={{
              ...pivot(120, 118),
              transform: open ? "scale(1.04)" : "scale(0.94)",
              transition: `transform 800ms ${BOUNCY}`,
            }}
          >
            <CenterRose cx={120} cy={118} paint={paint} open={open} unfold={unfold} />
          </g>

          {/* 8. Front Wrapping Paper Folds */}
          <path
            d="M48 132 L112 268 C116 272 124 272 128 268 L192 132 C178 142 152 148 120 148 C88 148 62 142 48 132 Z"
            fill={paint("paperFront")}
            stroke="#f0bccd"
            strokeWidth="1.2"
          />

          {/* Inner Paper Fold Left */}
          <path
            d="M44 126 C68 136 94 142 120 142 L112 268 L48 132 Z"
            fill={paint("paperFold")}
            opacity="0.55"
          />

          {/* 9. Ribbon & Bow */}
          <g>
            {/* Ribbon Waist Wrap */}
            <path
              d="M92 206 C108 212 132 212 148 206 L144 218 C128 223 112 223 96 218 Z"
              fill={paint("ribbonDeep")}
            />
            {/* Bow Tails */}
            <path d="M116 218 C110 234 102 246 95 254 L103 252 L106 260 C114 246 118 232 119 218 Z" fill={paint("ribbonDeep")} />
            <path d="M124 218 C130 234 138 246 145 254 L137 252 L134 260 C126 246 122 232 121 218 Z" fill={paint("ribbonDeep")} />
            {/* Bow Loops */}
            <path d="M117 214 C100 200 84 204 88 216 C92 228 108 224 117 218 Z" fill={paint("ribbon")} />
            <path d="M123 214 C140 200 156 204 152 216 C148 228 132 224 123 218 Z" fill={paint("ribbon")} />
            {/* Bow Knot */}
            <rect x="114" y="210" width="12" height="11" rx="4" fill={paint("ribbonDeep")} />
            <circle cx="120" cy="215.5" r="2.5" fill="#fff" opacity="0.6" />
          </g>

          {/* Ribbon string connecting tag */}
          <path d="M128 218 Q144 235 156 242" fill="none" stroke="#cbb9f6" strokeWidth="1.4" strokeLinecap="round" />
        </svg>

        {/* Gift tag tied to the bouquet */}
        <BouquetGiftTag lines={tag} />
      </div>

      {open && <Floaties items={DRIFTING_PETALS} className="left-1/2 top-[32%]" />}
      {celebrate && <Burst className="inset-x-0 top-0 h-[65%]" distance={125} delay={0.6} />}

      {!open && (
        <button
          type="button"
          onClick={onBloom}
          aria-label="Make the flower bouquet bloom"
          className="absolute inset-0 cursor-pointer rounded-[2rem] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-400/70"
        />
      )}
    </div>
  );
}

/** Center Full Red Rose */
function CenterRose({
  cx,
  cy,
  paint,
  open,
  unfold,
}: {
  cx: number;
  cy: number;
  paint: Paint;
  open: boolean;
  unfold: (x: number, y: number, closed: string, delayMs: number) => CSSProperties;
}) {
  return (
    <g transform={`translate(${cx - 100}, ${cy - 80})`}>
      {/* Outer Petals that unfold */}
      <g style={unfold(100, 75, "scale(0)", 100)}>
        <path d="M72 65 C68 42 88 30 100 32 C112 30 132 42 128 65 C120 54 80 54 72 65 Z" fill={paint("back")} />
        <ellipse cx="100" cy="78" rx="28" ry="20" fill="#6e0015" />
      </g>

      <g style={unfold(100, 105, "rotate(32deg) scale(0)", 160)}>
        <path d="M100 108 C80 110 52 102 46 82 C42 68 52 58 64 62 C76 66 88 72 100 78 Z" fill={paint("outer")} />
        <circle cx="58" cy="72" r="2.2" fill="#fff" opacity="0.85" />
      </g>

      <g style={unfold(100, 105, "rotate(-32deg) scale(0)", 200)}>
        <path d="M100 108 C120 110 148 102 154 82 C158 68 148 58 136 62 C124 66 112 72 100 78 Z" fill={paint("outer")} />
        <circle cx="142" cy="74" r="2.2" fill="#fff" opacity="0.85" />
      </g>

      {/* Core Cup */}
      <g style={pivot(100, 80)} className={cn(!open && "animate-nudge")}>
        <path d="M100 40 C114 42 123 54 121 66 C119 80 81 80 79 66 C77 54 86 42 100 40 Z" fill={paint("core")} />
        <path d="M100 42 C92 52 90 64 96 76" fill="none" stroke="#7a0016" strokeWidth="1.8" strokeLinecap="round" opacity="0.45" />
        <path d="M100 48 C108 47 112 54 107 59 C102 63 95 59 97 54 C99 50 104 52 103 55" fill="none" stroke="#660012" strokeWidth="2.2" strokeLinecap="round" />
        <ellipse cx="90" cy="54" rx="3.5" ry="6.5" fill="#fff" opacity="0.4" transform="rotate(20 90 54)" />
      </g>

      {/* Front wrapping petals */}
      <g style={unfold(100, 92, "rotate(22deg) scale(0)", 280)}>
        <path d="M100 94 C84 96 68 88 64 72 C62 62 66 52 74 50 C72 62 78 74 90 78 C97 80 101 86 100 94 Z" fill={paint("wrapLeft")} />
        <path d="M72 55 C71 61 73 67 77 71" fill="none" stroke="#ff859c" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
      </g>

      <g style={unfold(100, 92, "rotate(-22deg) scale(0)", 320)}>
        <path d="M100 94 C116 96 132 88 136 72 C138 62 134 52 126 50 C128 62 122 74 110 78 C103 80 99 86 100 94 Z" fill={paint("wrapRight")} />
        <path d="M128 55 C129 61 127 67 123 71" fill="none" stroke="#ff859c" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
      </g>

      {/* Front Cup Petal */}
      <g style={unfold(100, 110, "scale(0)", 380)}>
        <path d="M66 78 C64 98 82 114 100 114 C118 114 136 98 134 78 C124 90 112 94 100 94 C88 94 76 90 66 78 Z" fill={paint("cup")} />
        <path d="M71 83 C80 90 90 92.5 100 92.5 C110 92.5 120 90 129 83" fill="none" stroke="#ff8da3" strokeWidth="2.2" strokeLinecap="round" opacity="0.85" />
        <circle cx="102" cy="88" r="2.2" fill="#fff" opacity="0.9" />
      </g>
    </g>
  );
}

/** Flanking Mini Roses */
function MiniRose({
  cx,
  cy,
  scale,
  paint,
  open,
}: {
  cx: number;
  cy: number;
  scale: number;
  paint: Paint;
  open: boolean;
}) {
  return (
    <g
      transform={`translate(${cx}, ${cy}) scale(${scale})`}
      className={cn(!open && "animate-breathe")}
    >
      <circle cx="0" cy="0" r="22" fill={paint("outer")} />
      <path d="M-18 -4 C-14 -16 14 -16 18 -4 C14 12 -14 12 -18 -4 Z" fill={paint("core")} />
      <path d="M-10 -2 Q0 -10 10 -2 Q0 8 -10 -2 Z" fill="#660012" />
      <path d="M-6 -2 Q0 -6 6 -2" fill="none" stroke="#ff859c" strokeWidth="1.8" strokeLinecap="round" />
      {/* Sepal leaves */}
      <path d="M-16 12 C-22 18 -18 24 -12 20 Z" fill={paint("leaf")} />
      <path d="M16 12 C22 18 18 24 12 20 Z" fill={paint("leaf")} />
    </g>
  );
}

function BouquetGiftTag({ lines }: { lines: readonly [string, string] }) {
  return (
    <div className="absolute left-[65%] top-[87%]">
      <div className="origin-top-left animate-swing">
        <p className="absolute -left-2.5 top-0 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#fffdf8] py-1 pl-5 pr-3 text-left font-hand text-[clamp(0.8rem,7.5cqw,1.05rem)] font-bold leading-[1.05] text-red-700 shadow-[0_8px_18px_-8px_rgb(180_40_70/0.45)] ring-1 ring-red-200">
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

function BouquetDefs({ id }: { id: (name: string) => string }) {
  return (
    <defs>
      {/* Petal Gradients */}
      <radialGradient id={id("outer")} cx="0.5" cy="0.25" r="0.85">
        <stop offset="0" stopColor="#ff4769" />
        <stop offset="0.55" stopColor="#d90429" />
        <stop offset="1" stopColor="#8c021c" />
      </radialGradient>
      <radialGradient id={id("back")} cx="0.5" cy="0.8" r="0.9">
        <stop offset="0" stopColor="#b80628" />
        <stop offset="1" stopColor="#6e0015" />
      </radialGradient>
      <radialGradient id={id("core")} cx="0.42" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#ff5e7e" />
        <stop offset="0.5" stopColor="#e0113a" />
        <stop offset="1" stopColor="#96031a" />
      </radialGradient>
      <radialGradient id={id("wrapLeft")} cx="0.3" cy="0.3" r="0.9">
        <stop offset="0" stopColor="#ff4d6d" />
        <stop offset="0.55" stopColor="#c90a31" />
        <stop offset="1" stopColor="#7a0018" />
      </radialGradient>
      <radialGradient id={id("wrapRight")} cx="0.7" cy="0.3" r="0.9">
        <stop offset="0" stopColor="#ff4d6d" />
        <stop offset="0.55" stopColor="#c90a31" />
        <stop offset="1" stopColor="#7a0018" />
      </radialGradient>
      <linearGradient id={id("cup")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ff5778" />
        <stop offset="0.45" stopColor="#bd042b" />
        <stop offset="1" stopColor="#660014" />
      </linearGradient>

      {/* Wrapping Paper Gradients */}
      <linearGradient id={id("paperBack")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff8fa" />
        <stop offset="0.5" stopColor="#ffe6ee" />
        <stop offset="1" stopColor="#ffd0e0" />
      </linearGradient>
      <linearGradient id={id("paperFront")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.6" stopColor="#fff0f5" />
        <stop offset="1" stopColor="#ffd9e6" />
      </linearGradient>
      <linearGradient id={id("paperFold")} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#f7c2d4" />
        <stop offset="1" stopColor="#ffe3ed" stopOpacity="0" />
      </linearGradient>

      {/* Foliage Gradients */}
      <linearGradient id={id("leaf")} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#b7e8c8" />
        <stop offset="1" stopColor="#489965" />
      </linearGradient>
      <linearGradient id={id("leafDeep")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#78c996" />
        <stop offset="1" stopColor="#2d6e44" />
      </linearGradient>

      {/* Ribbon Gradients */}
      <linearGradient id={id("ribbon")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ece4ff" />
        <stop offset="1" stopColor="#b9a3f0" />
      </linearGradient>
      <linearGradient id={id("ribbonDeep")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#cdbcf7" />
        <stop offset="1" stopColor="#9d86e0" />
      </linearGradient>
    </defs>
  );
}
