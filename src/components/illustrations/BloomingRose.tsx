"use client";

import { useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { pivot, useSvgIds, type Paint } from "@/lib/svg";
import { Burst } from "./Burst";
import { Floaties, type Floaty } from "./Floaties";

const BOUNCY = "cubic-bezier(0.34, 1.56, 0.64, 1)";

/** Velvety red and soft rose petals drifting gently */
const DRIFTING_PETALS: readonly Floaty[] = [
  { shape: "petal", color: "#e6194b", size: 13, dx: "-85px", dy: "-75px", spin: "-220deg", dur: "5.6s", delay: "0.6s" },
  { shape: "petal", color: "#c40833", size: 11, dx: "80px", dy: "-95px", spin: "200deg", dur: "6.2s", delay: "1.2s" },
  { shape: "petal", color: "#8c021c", size: 12, dx: "-40px", dy: "-125px", spin: "160deg", dur: "6.8s", delay: "1.8s" },
  { shape: "petal", color: "#ff4d6d", size: 10, dx: "98px", dy: "-40px", spin: "-180deg", dur: "5.9s", delay: "2.4s" },
  { shape: "petal", color: "#d90429", size: 13, dx: "-105px", dy: "-25px", spin: "240deg", dur: "6.5s", delay: "3.0s" },
  { shape: "petal", color: "#ff758c", size: 11, dx: "35px", dy: "-140px", spin: "-150deg", dur: "7.2s", delay: "3.6s" },
];

type BloomingRoseProps = {
  open: boolean;
  onBloom: () => void;
  tag: readonly [string, string];
};

/** A romantic, elegant, beautifully illustrated red rose that blooms smoothly when tapped */
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
    <div className="@container relative aspect-[220/290] w-[min(78cqw,17.5rem,82cqh)]">
      {/* Soft warm romantic halo around the rose */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-[20%] -top-[8%] h-[75%] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(255_185_205/0.7),rgb(255_235_245/0.25)_50%,transparent_75%)]"
      />

      {!open && (
        <span
          aria-hidden
          className="absolute left-[32%] top-[12%] aspect-square w-[36%] animate-ping-soft rounded-full border-2 border-red-300/70"
        />
      )}

      <div className="absolute inset-0 origin-[50%_95%] animate-sway">
        <svg
          viewBox="0 0 220 290"
          role="img"
          aria-label={
            open ? "A gorgeous red rose in full bloom, tied with a ribbon" : "An elegant red rosebud ready to bloom"
          }
          className="size-full overflow-visible"
        >
          <RoseDefs id={id} />

          {/* 1. Stem & Leaves */}
          <Stem paint={paint} />

          {/* 2. Sepals (Calyx leaves at base of flower head) */}
          <g style={pivot(110, 165)}>
            <g
              style={{
                ...pivot(110, 165),
                transform: open ? "scale(0.88) rotate(12deg)" : "scale(1)",
                transition: "transform 800ms ease-out",
              }}
            >
              <path d="M110 162 C90 164 74 150 68 132 C80 142 96 148 110 150 Z" fill={paint("leaf")} />
              <path d="M110 162 C130 164 146 150 152 132 C140 142 124 148 110 150 Z" fill={paint("leaf")} />
              <path d="M110 165 C102 178 94 186 84 192 C94 182 102 174 110 165 Z" fill={paint("leafDeep")} />
              <path d="M110 165 C118 178 126 186 136 192 C126 182 118 174 110 165 Z" fill={paint("leafDeep")} />
              {/* Green Receptacle Bulb */}
              <ellipse cx="110" cy="164" rx="13" ry="9" fill={paint("leafDeep")} />
            </g>
          </g>

          {/* 3. Ribbon around stem */}
          <Ribbon paint={paint} />

          {/* ================= ROSE BLOOM HEAD ================= */}

          {/* Layer A: Back Petals (Outermost backdrop that reveals in bloom) */}
          <g style={unfold(110, 155, "scale(0)", 70)}>
            {/* Left Back Petal */}
            <path
              d="M110 155 C75 155 48 128 54 98 C58 78 82 70 98 78 C106 82 108 92 110 102 Z"
              fill={paint("petalDark")}
            />
            {/* Right Back Petal */}
            <path
              d="M110 155 C145 155 172 128 166 98 C162 78 138 70 122 78 C114 82 112 92 110 102 Z"
              fill={paint("petalDark")}
            />
            {/* Top Crown Petal */}
            <path
              d="M85 85 C85 60 105 45 110 45 C115 45 135 60 135 85 C125 78 95 78 85 85 Z"
              fill={paint("petalDark")}
            />
            {/* Depth shadow disk */}
            <ellipse cx="110" cy="115" rx="36" ry="26" fill="#4a000d" />
          </g>

          {/* Layer B: Left Side Petal */}
          <g style={unfold(110, 158, "rotate(32deg) scale(0.65)", 140)}>
            <path
              d="M110 158 C78 158 50 142 45 118 C40 96 56 82 74 86 C88 90 104 102 110 118 Z"
              fill={paint("petalOuter")}
            />
            {/* Reflexed lip highlight */}
            <path
              d="M48 114 C44 98 58 84 74 88"
              fill="none"
              stroke="#ff8da3"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* Dewdrop */}
            <circle cx="62" cy="106" r="2.2" fill="#fff" opacity="0.9" />
            <circle cx="62.7" cy="106.6" r="1" fill="#fff" />
          </g>

          {/* Layer C: Right Side Petal */}
          <g style={unfold(110, 158, "rotate(-32deg) scale(0.65)", 180)}>
            <path
              d="M110 158 C142 158 170 142 175 118 C180 96 164 82 146 86 C132 90 116 102 110 118 Z"
              fill={paint("petalOuter")}
            />
            {/* Reflexed lip highlight */}
            <path
              d="M172 114 C176 98 162 84 146 88"
              fill="none"
              stroke="#ff8da3"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* Dewdrop */}
            <circle cx="158" cy="106" r="2.2" fill="#fff" opacity="0.9" />
            <circle cx="158.7" cy="106.6" r="1" fill="#fff" />
          </g>

          {/* Layer D: Heart Spiral Vortex (The Rosebud Core) */}
          <g className={cn(!open && "animate-nudge")} style={pivot(110, 120)}>
            <g
              style={{
                ...pivot(110, 120),
                transform: open ? "scale(0.96)" : "scale(1.04)",
                transition: `transform 700ms ${BOUNCY}`,
              }}
            >
              <RoseSpiral paint={paint} />
            </g>

            {/* Closed Bud Green Sepal Guards (fade on bloom) */}
            <g
              style={{
                ...pivot(110, 130),
                transform: open ? "scale(0.35)" : "scale(1)",
                opacity: open ? 0 : 1,
                transition: "transform 400ms ease-in, opacity 300ms ease-in",
              }}
            >
              <path d="M110 145 C95 142 82 128 84 108 C92 120 102 128 110 132 Z" fill={paint("leaf")} />
              <path d="M110 145 C125 142 138 128 136 108 C128 120 118 128 110 132 Z" fill={paint("leaf")} />
              <ellipse cx="110" cy="142" rx="9" ry="5" fill="#52b788" />
            </g>
          </g>

          {/* Layer E: Mid-wrap Left Petal */}
          <g style={unfold(110, 145, "rotate(20deg) scale(0)", 260)}>
            <path
              d="M110 148 C90 150 72 138 68 118 C64 102 72 90 85 88 C82 104 92 118 108 126 C114 130 116 138 110 148 Z"
              fill={paint("petalMid")}
            />
            {/* Luminous rim highlight */}
            <path
              d="M78 94 C76 102 80 110 88 115"
              fill="none"
              stroke="#ffa2b4"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.85"
            />
          </g>

          {/* Layer F: Mid-wrap Right Petal */}
          <g style={unfold(110, 145, "rotate(-20deg) scale(0)", 300)}>
            <path
              d="M110 148 C130 150 148 138 152 118 C156 102 148 90 135 88 C138 104 128 118 112 126 C106 130 104 138 110 148 Z"
              fill={paint("petalMid")}
            />
            {/* Luminous rim highlight */}
            <path
              d="M142 94 C144 102 140 110 132 115"
              fill="none"
              stroke="#ffa2b4"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.85"
            />
          </g>

          {/* Layer G: Front Cupping Apron Petal (Gracefully folded bottom rim) */}
          <g style={unfold(110, 158, "scale(0.85)", 360)}>
            <path
              d="M68 112 C66 142 88 162 110 162 C132 162 154 142 152 112 C138 128 124 132 110 132 C96 132 82 128 68 112 Z"
              fill={paint("petalCup")}
            />
            {/* Curving heart-like lip highlight */}
            <path
              d="M74 120 C86 128 98 131 110 131 C122 131 134 128 146 120"
              fill="none"
              stroke="#ff94a8"
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity="0.9"
            />
            {/* Shadow crease */}
            <path
              d="M110 138 C105 148 105 154 110 160"
              fill="none"
              stroke="#590012"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.4"
            />
            {/* Fresh water droplet */}
            <circle cx="110" cy="148" r="2.5" fill="#fff" opacity="0.92" />
            <circle cx="110.8" cy="148.7" r="1.1" fill="#fff" />
          </g>
        </svg>

        {/* Gift Tag tied to the ribbon */}
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

/** Swirling Rose Spiral Core (No clumsy balls - pure layered petal vortex!) */
function RoseSpiral({ paint }: { paint: Paint }) {
  return (
    <g>
      {/* Background core body */}
      <path
        d="M110 72 C126 74 138 90 135 110 C132 130 88 130 85 110 C82 90 94 74 110 72 Z"
        fill={paint("petalCore")}
      />

      {/* Layer 1 Inner Spiral Crease */}
      <path
        d="M92 98 C95 82 115 78 124 88 C130 95 128 108 120 114"
        fill="none"
        stroke="#590012"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M94 96 C98 84 114 80 122 88"
        fill="none"
        stroke="#ff8da3"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Layer 2 Swirling Center Vortex */}
      <path
        d="M102 96 C105 88 116 88 118 94 C120 100 112 106 108 102 C104 98 108 92 112 94"
        fill="none"
        stroke="#4a000d"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M104 94 C108 90 114 90 116 94"
        fill="none"
        stroke="#ffa2b4"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Glossy petal reflection */}
      <ellipse
        cx="96"
        cy="90"
        rx="3.5"
        ry="6.5"
        fill="#fff"
        opacity="0.45"
        transform="rotate(22 96 90)"
      />
    </g>
  );
}

/** Realistic and adorable green stem & leaves */
function Stem({ paint }: { paint: Paint }) {
  const vein = { fill: "none", stroke: "#2d6a4f", strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.7 } as const;

  return (
    <>
      {/* Curved Stem */}
      <path
        d="M110 155 C106 195 115 235 108 282"
        fill="none"
        stroke={paint("stem")}
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Left Rose Leaf */}
      <g>
        <path
          d="M108 205 C92 192 68 192 56 204 C72 216 94 218 108 205 Z"
          fill={paint("leaf")}
        />
        <path d="M106 205 Q85 198 65 204" {...vein} />
        <path d="M94 203 Q86 195 82 201" {...vein} strokeWidth={1.2} />
        <path d="M82 207 Q74 201 72 206" {...vein} strokeWidth={1.2} />
      </g>

      {/* Right Rose Leaf */}
      <g>
        <path
          d="M110 228 C126 212 150 212 162 224 C147 237 125 239 110 228 Z"
          fill={paint("leaf")}
        />
        <path d="M112 228 Q135 221 155 224" {...vein} />
        <path d="M128 225 Q136 217 140 223" {...vein} strokeWidth={1.2} />
        <path d="M142 229 Q150 223 152 228" {...vein} strokeWidth={1.2} />
      </g>

      {/* Tiny soft thorn on stem */}
      <path d="M106 182 C101 184 98 188 97 191 C101 190 105 188 107 186 Z" fill="#2d6a4f" />
    </>
  );
}

/** Pastel Ribbon and Bow */
function Ribbon({ paint }: { paint: Paint }) {
  const shine = { fill: "none", stroke: "#fff", strokeOpacity: 0.75, strokeWidth: 1.6, strokeLinecap: "round" } as const;

  return (
    <g>
      {/* Ribbon Tails */}
      <path d="M107 252 C102 264 97 274 89 282 L99 279 L101 287 C107 275 110 264 110.5 253 Z" fill={paint("ribbonDeep")} />
      <path d="M113 252 C118 264 123 273 131 281 L121 280 L120 288 C115 275 112 264 111.5 253 Z" fill={paint("ribbonDeep")} />
      {/* Bow Left Loop */}
      <path d="M106 246 C92 232 75 234 78 247 C80 260 95 257 106 249 Z" fill={paint("ribbon")} />
      {/* Bow Right Loop */}
      <path d="M114 246 C128 232 145 234 142 247 C140 260 125 257 114 249 Z" fill={paint("ribbon")} />
      {/* Highlights */}
      <path d="M101 244 C93 238 85 239 83 245" {...shine} />
      <path d="M119 244 C127 238 135 239 137 245" {...shine} />
      {/* Center Knot */}
      <rect x="104.5" y="241" width="13" height="12" rx="4.5" fill={paint("ribbonDeep")} />
      <circle cx="111" cy="247" r="2.8" fill="#fff" opacity="0.65" />
      {/* String hanging to the gift tag */}
      <path d="M118 250 Q138 264 152 268" fill="none" stroke="#cbb9f6" strokeWidth="1.4" strokeLinecap="round" />
    </g>
  );
}

/** Gift Tag hanging from the ribbon string */
function GiftTag({ lines }: { lines: readonly [string, string] }) {
  return (
    <div className="absolute left-[68%] top-[90%]">
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

/** Radiant, rich, velvety ruby-red and emerald gradients */
function RoseDefs({ id }: { id: (name: string) => string }) {
  return (
    <defs>
      {/* Outer vibrant crimson to ruby red */}
      <radialGradient id={id("petalOuter")} cx="0.5" cy="0.25" r="0.85">
        <stop offset="0" stopColor="#ff4769" />
        <stop offset="0.55" stopColor="#d90429" />
        <stop offset="1" stopColor="#8c021c" />
      </radialGradient>

      {/* Deep burgundy back crown petals */}
      <radialGradient id={id("petalDark")} cx="0.5" cy="0.8" r="0.9">
        <stop offset="0" stopColor="#b80628" />
        <stop offset="1" stopColor="#590012" />
      </radialGradient>

      {/* Luminous ruby core */}
      <radialGradient id={id("petalCore")} cx="0.45" cy="0.35" r="0.8">
        <stop offset="0" stopColor="#ff5e7e" />
        <stop offset="0.5" stopColor="#e0113a" />
        <stop offset="1" stopColor="#800016" />
      </radialGradient>

      {/* Middle wrapping petals */}
      <radialGradient id={id("petalMid")} cx="0.4" cy="0.3" r="0.85">
        <stop offset="0" stopColor="#ff4d6d" />
        <stop offset="0.55" stopColor="#c90a31" />
        <stop offset="1" stopColor="#7a0018" />
      </radialGradient>

      {/* Front cup petal */}
      <linearGradient id={id("petalCup")} x1="0" y1="0" x2="0" y2="1">
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
