"use client";

import { useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { pivot, useSvgIds, type Paint } from "@/lib/svg";
import { Burst } from "./Burst";
import { Floaties, type Floaty } from "./Floaties";

const BOUNCY = "cubic-bezier(0.34, 1.56, 0.64, 1)";

/** Rich velvety red and soft pink petals drifting when bloomed */
const DRIFTING_PETALS: readonly Floaty[] = [
  { shape: "petal", color: "#e6194b", size: 13, dx: "-82px", dy: "-68px", spin: "-220deg", dur: "5.6s", delay: "0.6s" },
  { shape: "petal", color: "#c40833", size: 11, dx: "78px", dy: "-92px", spin: "200deg", dur: "6.2s", delay: "1.2s" },
  { shape: "petal", color: "#8c021c", size: 12, dx: "-38px", dy: "-120px", spin: "160deg", dur: "6.8s", delay: "1.8s" },
  { shape: "petal", color: "#ff4d6d", size: 10, dx: "95px", dy: "-38px", spin: "-180deg", dur: "5.9s", delay: "2.4s" },
  { shape: "petal", color: "#d90429", size: 13, dx: "-102px", dy: "-22px", spin: "240deg", dur: "6.5s", delay: "3.0s" },
  { shape: "petal", color: "#ff758c", size: 11, dx: "34px", dy: "-135px", spin: "-150deg", dur: "7.2s", delay: "3.6s" },
];

type BloomingRoseProps = {
  open: boolean;
  onBloom: () => void;
  tag: readonly [string, string];
};

/** A cute, vibrant, beautifully stylized red rose that blooms smoothly when tapped */
export function BloomingRose({ open, onBloom, tag }: BloomingRoseProps) {
  const { id, paint } = useSvgIds();
  const [openOnArrival] = useState(open);
  const celebrate = open && !openOnArrival;

  // Unfolding animation helper
  const unfold = (x: number, y: number, closed: string, delayMs: number): CSSProperties => ({
    ...pivot(x, y),
    transform: open ? "rotate(0deg) scale(1)" : closed,
    transition: `transform 950ms ${BOUNCY} ${delayMs}ms`,
  });

  return (
    <div className="@container relative aspect-[220/280] w-[min(76cqw,17rem,80cqh)]">
      {/* Warm romantic aura around the rose */}
      <div
        aria-hidden
        className="absolute -inset-x-[22%] -top-[6%] h-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(255_180_200/0.65),rgb(255_235_242/0.25)_50%,transparent_75%)]"
      />

      {!open && (
        <span
          aria-hidden
          className="absolute left-[30%] top-[9%] aspect-square w-[40%] animate-ping-soft rounded-full border-2 border-red-300/70"
        />
      )}

      <div className="absolute inset-0 origin-[50%_95%] animate-sway">
        <svg
          viewBox="0 0 220 280"
          role="img"
          aria-label={
            open ? "An adorable red rose in full bloom, tied with a ribbon" : "A cute red rosebud ready to bloom"
          }
          className="size-full overflow-visible"
        >
          <RoseDefs id={id} />

          {/* Stem & Leaves */}
          <Stem paint={paint} />

          {/* Calyx / Sepals under the rose head */}
          <g style={pivot(110, 115)}>
            <g
              style={{
                ...pivot(110, 115),
                transform: open ? "scale(0.85) rotate(10deg)" : "scale(1)",
                transition: "transform 800ms ease-out",
              }}
            >
              <path d="M110 115 C92 118 78 106 72 90 C84 98 98 102 110 105 Z" fill={paint("leaf")} />
              <path d="M110 115 C128 118 142 106 148 90 C136 98 122 102 110 105 Z" fill={paint("leaf")} />
              <path d="M110 118 C105 128 98 135 90 140 C98 132 105 125 110 118 Z" fill={paint("leafDeep")} />
              <path d="M110 118 C115 128 122 135 130 140 C122 132 115 125 110 118 Z" fill={paint("leafDeep")} />
            </g>
          </g>

          {/* Ribbon around stem */}
          <Ribbon paint={paint} />

          {/* 1. Deep Back Layer Petals (Expands into full bloom crown) */}
          <g style={unfold(110, 80, "scale(0)", 80)}>
            {/* Left Back Crown Petal */}
            <path
              d="M110 95 C78 95 62 70 70 48 C78 32 102 36 110 52 C118 36 142 32 150 48 C158 70 142 95 110 95 Z"
              fill={paint("backPetal")}
            />
            {/* Inner shadow disk behind core */}
            <ellipse cx="110" cy="85" rx="36" ry="26" fill="#590012" />
          </g>

          {/* 2. Outer Left Flared Petal */}
          <g style={unfold(110, 115, "rotate(38deg) scale(0)", 160)}>
            <path
              d="M110 120 C85 122 52 112 44 88 C38 70 50 56 66 60 C80 64 96 74 110 84 Z"
              fill={paint("outerPetal")}
            />
            {/* Petal curled margin highlight */}
            <path
              d="M48 84 C42 70 54 58 68 62"
              fill="none"
              stroke="#ff8da3"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Cute water droplet on petal */}
            <circle cx="58" cy="76" r="2.4" fill="#fff" opacity="0.9" />
            <circle cx="58.8" cy="76.6" r="1.1" fill="#fff" />
          </g>

          {/* 3. Outer Right Flared Petal */}
          <g style={unfold(110, 115, "rotate(-38deg) scale(0)", 200)}>
            <path
              d="M110 120 C135 122 168 112 176 88 C182 70 170 56 154 60 C140 64 124 74 110 84 Z"
              fill={paint("outerPetal")}
            />
            {/* Petal curled margin highlight */}
            <path
              d="M172 84 C178 70 166 58 152 62"
              fill="none"
              stroke="#ff8da3"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Cute water droplet on petal */}
            <circle cx="162" cy="78" r="2.4" fill="#fff" opacity="0.9" />
            <circle cx="162.8" cy="78.6" r="1.1" fill="#fff" />
          </g>

          {/* 4. Center Rose Core & Heart */}
          <g className={cn(!open && "animate-nudge")} style={pivot(110, 88)}>
            <g
              style={{
                ...pivot(110, 86),
                transform: open ? "scale(0.98)" : "scale(1.06)",
                transition: `transform 700ms ${BOUNCY}`,
              }}
            >
              <RoseCore paint={paint} />
            </g>

            {/* Closed Bud Green Sepal Wraps (fade out on bloom) */}
            <g
              style={{
                ...pivot(110, 88),
                transform: open ? "scale(0.4)" : "scale(1)",
                opacity: open ? 0 : 1,
                transition: "transform 400ms ease-in, opacity 300ms ease-in",
              }}
            >
              <path d="M110 92 C96 90 84 78 86 62 C94 72 102 78 110 80 Z" fill={paint("leaf")} />
              <path d="M110 92 C124 90 136 78 134 62 C126 72 118 78 110 80 Z" fill={paint("leaf")} />
              <ellipse cx="110" cy="90" rx="8" ry="4.5" fill="#52b788" />
            </g>
          </g>

          {/* 5. Left Wrapping Petal */}
          <g style={unfold(110, 100, "rotate(26deg) scale(0)", 280)}>
            <path
              d="M110 102 C90 104 70 95 65 76 C62 64 67 52 77 50 C74 64 82 78 98 83 C106 86 111 92 110 102 Z"
              fill={paint("wrapLeft")}
            />
            {/* Rim light */}
            <path
              d="M72 56 C71 63 73 70 78 75"
              fill="none"
              stroke="#ffa2b4"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.85"
            />
          </g>

          {/* 6. Right Wrapping Petal */}
          <g style={unfold(110, 100, "rotate(-26deg) scale(0)", 320)}>
            <path
              d="M110 102 C130 104 150 95 155 76 C158 64 153 52 143 50 C146 64 138 78 122 83 C114 86 109 92 110 102 Z"
              fill={paint("wrapRight")}
            />
            {/* Rim light */}
            <path
              d="M148 56 C149 63 147 70 142 75"
              fill="none"
              stroke="#ffa2b4"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.85"
            />
          </g>

          {/* 7. Front Cup Petal (Rounded bottom apron of the rose) */}
          <g style={unfold(110, 122, "scale(0)", 380)}>
            <path
              d="M72 82 C70 106 90 125 110 125 C130 125 150 106 148 82 C136 96 124 100 110 100 C96 100 84 96 72 82 Z"
              fill={paint("cup")}
            />
            {/* Petal rim highlight */}
            <path
              d="M78 88 C88 96 99 98.5 110 98.5 C121 98.5 132 96 142 88"
              fill="none"
              stroke="#ff94a8"
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity="0.9"
            />
            {/* Inner petal fold shadow */}
            <path
              d="M110 104 C105 112 105 118 110 123"
              fill="none"
              stroke="#590012"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.4"
            />
            {/* Fresh water droplet */}
            <circle cx="110" cy="112" r="2.5" fill="#fff" opacity="0.92" />
            <circle cx="110.8" cy="112.7" r="1.2" fill="#fff" />
          </g>
        </svg>

        {/* Gift tag tied to the ribbon */}
        <GiftTag lines={tag} />
      </div>

      {open && <Floaties items={DRIFTING_PETALS} className="left-1/2 top-[30%]" />}
      {celebrate && <Burst className="inset-x-0 top-0 h-[60%]" distance={120} delay={0.6} />}

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

/** Inner Rose Spiral Vortex (The Rosebud Core) */
function RoseCore({ paint }: { paint: Paint }) {
  return (
    <>
      {/* Plump curved center bulb */}
      <path
        d="M110 42 C125 44 135 58 133 72 C131 88 89 88 87 72 C85 58 95 44 110 42 Z"
        fill={paint("core")}
      />
      {/* Internal swirl shading */}
      <path
        d="M110 44 C100 55 98 70 104 82"
        fill="none"
        stroke="#7a0016"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Curved spiral vortex folds */}
      <path
        d="M110 52 C119 51 124 59 118 65 C112 70 104 65 106 60 C108 55 114 57 113 61"
        fill="none"
        stroke="#590012"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.75"
      />
      {/* Glossy petal reflection */}
      <ellipse
        cx="99"
        cy="58"
        rx="4"
        ry="7.5"
        fill="#fff"
        opacity="0.45"
        transform="rotate(22 99 58)"
      />
    </>
  );
}

/** Realistic and adorable green stem & leaves */
function Stem({ paint }: { paint: Paint }) {
  const vein = { fill: "none", stroke: "#2d6a4f", strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.7 } as const;

  return (
    <>
      {/* Main Curved Stem */}
      <path
        d="M110 100 C105 155 116 195 108 272"
        fill="none"
        stroke={paint("stem")}
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Left Rose Leaf */}
      <g>
        <path
          d="M109 168 C94 154 72 154 60 166 C74 178 95 180 109 168 Z"
          fill={paint("leaf")}
        />
        <path d="M107 168 Q87 162 68 166" {...vein} />
        {/* Subtle leaf serrations / highlights */}
        <path d="M96 166 Q88 158 84 164" {...vein} strokeWidth={1.2} />
        <path d="M84 170 Q76 164 74 169" {...vein} strokeWidth={1.2} />
      </g>

      {/* Right Rose Leaf */}
      <g>
        <path
          d="M110 198 C125 182 148 182 160 194 C146 206 125 208 110 198 Z"
          fill={paint("leaf")}
        />
        <path d="M112 198 Q134 191 153 194" {...vein} />
        <path d="M126 195 Q134 187 138 193" {...vein} strokeWidth={1.2} />
        <path d="M140 199 Q148 193 150 198" {...vein} strokeWidth={1.2} />
      </g>

      {/* Tiny soft thorn on stem */}
      <path d="M106 142 C101 144 98 148 97 151 C101 150 105 148 107 146 Z" fill="#2d6a4f" />
    </>
  );
}

/** Pastel Lavender-Pink Ribbon and Bow */
function Ribbon({ paint }: { paint: Paint }) {
  const shine = { fill: "none", stroke: "#fff", strokeOpacity: 0.75, strokeWidth: 1.6, strokeLinecap: "round" } as const;

  return (
    <g>
      {/* Ribbon Tails */}
      <path d="M107 236 C102 248 97 258 89 266 L99 263 L101 271 C107 259 110 248 110.5 237 Z" fill={paint("ribbonDeep")} />
      <path d="M113 236 C118 248 123 257 131 265 L121 264 L120 272 C115 259 112 248 111.5 237 Z" fill={paint("ribbonDeep")} />
      {/* Bow Left Loop */}
      <path d="M106 230 C92 216 75 218 78 231 C80 244 95 241 106 233 Z" fill={paint("ribbon")} />
      {/* Bow Right Loop */}
      <path d="M114 230 C128 216 145 218 142 231 C140 244 125 241 114 233 Z" fill={paint("ribbon")} />
      {/* Highlights */}
      <path d="M101 228 C93 222 85 223 83 229" {...shine} />
      <path d="M119 228 C127 222 135 223 137 229" {...shine} />
      {/* Center Knot */}
      <rect x="104.5" y="225" width="13" height="12" rx="4.5" fill={paint("ribbonDeep")} />
      <circle cx="111" cy="231" r="2.8" fill="#fff" opacity="0.65" />
      {/* String hanging to the gift tag */}
      <path d="M118 234 Q138 250 152 255" fill="none" stroke="#cbb9f6" strokeWidth="1.4" strokeLinecap="round" />
    </g>
  );
}

/** Gift Tag hanging from the ribbon string */
function GiftTag({ lines }: { lines: readonly [string, string] }) {
  return (
    <div className="absolute left-[69%] top-[91%]">
      <div className="origin-top-left animate-swing">
        <p className="absolute -left-2.5 top-0 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#fffdf8] py-1 pl-5 pr-3 text-left font-hand text-[clamp(0.82rem,7.8cqw,1.08rem)] font-bold leading-[1.05] text-red-700 shadow-[0_8px_18px_-8px_rgb(180_40_70/0.45)] ring-1 ring-red-200">
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

/** Gorgeous, rich, velvety ruby-red and emerald gradients */
function RoseDefs({ id }: { id: (name: string) => string }) {
  return (
    <defs>
      {/* Outer vibrant crimson to ruby red */}
      <radialGradient id={id("outerPetal")} cx="0.5" cy="0.25" r="0.85">
        <stop offset="0" stopColor="#ff4769" />
        <stop offset="0.5" stopColor="#d90429" />
        <stop offset="1" stopColor="#8c021c" />
      </radialGradient>

      {/* Deep burgundy back crown petals */}
      <radialGradient id={id("backPetal")} cx="0.5" cy="0.8" r="0.9">
        <stop offset="0" stopColor="#b80628" />
        <stop offset="1" stopColor="#590012" />
      </radialGradient>

      {/* Luminous ruby core */}
      <radialGradient id={id("core")} cx="0.42" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#ff5e7e" />
        <stop offset="0.48" stopColor="#e0113a" />
        <stop offset="1" stopColor="#96031a" />
      </radialGradient>

      {/* Left wrapping petal */}
      <radialGradient id={id("wrapLeft")} cx="0.3" cy="0.3" r="0.9">
        <stop offset="0" stopColor="#ff4d6d" />
        <stop offset="0.55" stopColor="#c90a31" />
        <stop offset="1" stopColor="#7a0018" />
      </radialGradient>

      {/* Right wrapping petal */}
      <radialGradient id={id("wrapRight")} cx="0.7" cy="0.3" r="0.9">
        <stop offset="0" stopColor="#ff4d6d" />
        <stop offset="0.55" stopColor="#c90a31" />
        <stop offset="1" stopColor="#7a0018" />
      </radialGradient>

      {/* Front cup petal */}
      <linearGradient id={id("cup")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ff5778" />
        <stop offset="0.45" stopColor="#bd042b" />
        <stop offset="1" stopColor="#660014" />
      </linearGradient>

      {/* Leaves & Sepals */}
      <linearGradient id={id("leaf")} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#95d5b2" />
        <stop offset="1" stopColor="#40916c" />
      </linearGradient>
      <linearGradient id={id("leafDeep")} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#52b788" />
        <stop offset="1" stopColor="#1b4332" />
      </linearGradient>

      {/* Stem */}
      <linearGradient id={id("stem")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#52b788" />
        <stop offset="1" stopColor="#2d6a4f" />
      </linearGradient>

      {/* Ribbon */}
      <linearGradient id={id("ribbon")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f2ecff" />
        <stop offset="1" stopColor="#c5b3f7" />
      </linearGradient>
      <linearGradient id={id("ribbonDeep")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#b49be8" />
        <stop offset="1" stopColor="#8768d6" />
      </linearGradient>
    </defs>
  );
}
