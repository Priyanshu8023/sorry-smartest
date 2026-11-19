"use client";

import { useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { pivot, useSvgIds, type Paint } from "@/lib/svg";
import { Burst } from "./Burst";
import { Floaties, type Floaty } from "./Floaties";

const BOUNCY = "cubic-bezier(0.34, 1.56, 0.64, 1)";

const DRIFTING_PETALS: readonly Floaty[] = [
  { shape: "petal", color: "#f48fb1", size: 12, dx: "-78px", dy: "-64px", spin: "-220deg", dur: "5.6s", delay: "0.7s" },
  { shape: "petal", color: "#f9afc9", size: 10, dx: "72px", dy: "-90px", spin: "200deg", dur: "6.2s", delay: "1.3s" },
  { shape: "petal", color: "#e86f9a", size: 11, dx: "-34px", dy: "-118px", spin: "160deg", dur: "6.8s", delay: "2s" },
  { shape: "petal", color: "#ffc2d6", size: 9, dx: "96px", dy: "-34px", spin: "-180deg", dur: "5.9s", delay: "2.6s" },
  { shape: "petal", color: "#f6a3bf", size: 12, dx: "-100px", dy: "-18px", spin: "240deg", dur: "6.5s", delay: "3.2s" },
  { shape: "petal", color: "#e4d6ff", size: 10, dx: "30px", dy: "-132px", spin: "-150deg", dur: "7.2s", delay: "3.8s" },
];

type BloomingRoseProps = {
  open: boolean;
  onBloom: () => void;
  /** Two short lines written on the gift tag tied to the stem. */
  tag: readonly [string, string];
};

/** A long-stemmed rose, tied with a ribbon and a little gift tag, that blooms when tapped. */
export function BloomingRose({ open, onBloom, tag }: BloomingRoseProps) {
  const { id, paint } = useSvgIds();
  const [celebrate, setCelebrate] = useState(false);

  const bloom = () => {
    setCelebrate(true);
    onBloom();
  };

  // Each petal unfolds from its own hinge, staggered so the rose opens from the back to the front.
  const unfold = (x: number, y: number, closed: string, delayMs: number): CSSProperties => ({
    ...pivot(x, y),
    transform: open ? "rotate(0deg) scale(1)" : closed,
    transition: `transform 900ms ${BOUNCY} ${delayMs}ms`,
  });

  return (
    <div className="@container relative aspect-[200/260] w-[min(64cqw,14.5rem,75cqh)]">
      <div
        aria-hidden
        className="absolute -inset-x-[25%] -top-[4%] h-[62%] bg-[radial-gradient(closest-side,rgb(255_205_222/0.8),transparent)]"
      />
      {!open && (
        <span
          aria-hidden
          className="absolute left-[30%] top-[6.9%] aspect-square w-[40%] animate-ping-soft rounded-full border-2 border-blush-300/70"
        />
      )}

      <div className="absolute inset-0 origin-[50%_95%] animate-sway">
        <svg
          viewBox="0 0 200 260"
          role="img"
          aria-label={
            open ? "A pink rose in full bloom, tied with a ribbon" : "A rosebud on a long stem, tied with a ribbon"
          }
          className="size-full overflow-visible"
        >
          <RoseDefs id={id} />
          <Stem paint={paint} />
          <Ribbon paint={paint} />
          <path d="M106 213 Q126 228 142 232" fill="none" stroke="#cbb9f6" strokeWidth="1.3" strokeLinecap="round" />

          <g style={unfold(100, 62, "scale(0)", 80)}>
            <path d="M74 62 C70 40 88 28 100 30 C112 28 130 40 126 62 C118 52 82 52 74 62 Z" fill={paint("back")} />
            <ellipse cx="100" cy="76" rx="27" ry="22" fill="#d24f7a" />
          </g>
          <g style={unfold(100, 108, "rotate(35deg) scale(0)", 150)}>
            <path d="M100 110 C80 112 52 104 46 84 C42 70 52 60 64 64 C76 68 88 74 100 80 Z" fill={paint("outer")} />
          </g>
          <g style={unfold(100, 108, "rotate(-35deg) scale(0)", 190)}>
            <path d="M100 110 C120 112 148 104 154 84 C158 70 148 60 136 64 C124 68 112 74 100 80 Z" fill={paint("outer")} />
          </g>

          <g className={cn(!open && "animate-nudge")} style={pivot(100, 80)}>
            <g
              style={{
                ...pivot(100, 76),
                transform: open ? "scale(0.96)" : "scale(1.04)",
                transition: `transform 700ms ${BOUNCY}`,
              }}
            >
              <RoseCore paint={paint} />
            </g>
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
              <ellipse cx="100" cy="80" rx="7" ry="4" fill="#8fcfa8" />
            </g>
          </g>

          <g style={unfold(100, 90, "rotate(24deg) scale(0)", 300)}>
            <path
              d="M100 92 C84 94 68 86 64 70 C62 60 66 50 74 48 C72 60 78 72 90 76 C97 78 101 84 100 92 Z"
              fill={paint("wrapLeft")}
            />
            <path d="M70 53 C69 59 71 65 75 69" fill="none" stroke="#ffd3e1" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
          </g>
          <g style={unfold(100, 90, "rotate(-24deg) scale(0)", 340)}>
            <path
              d="M100 92 C116 94 132 86 136 70 C138 60 134 50 126 48 C128 60 122 72 110 76 C103 78 99 84 100 92 Z"
              fill={paint("wrapRight")}
            />
            <path d="M130 53 C131 59 129 65 125 69" fill="none" stroke="#ffd3e1" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
          </g>
          <g style={unfold(100, 112, "scale(0)", 380)}>
            <path d="M100 112 C90 118 76 120 66 114 C76 110 88 108 100 110 Z" fill={paint("leaf")} />
            <path d="M100 112 C110 118 124 120 134 114 C124 110 112 108 100 110 Z" fill={paint("leaf")} />
            <path d="M98 110 C96 118 98 124 102 128 C104 122 104 116 102 110 Z" fill={paint("leaf")} />
          </g>
          <g style={unfold(100, 112, "scale(0)", 440)}>
            <path
              d="M66 76 C64 98 82 114 100 114 C118 114 136 98 134 76 C124 88 112 92 100 92 C88 92 76 88 66 76 Z"
              fill={paint("cup")}
            />
            <path
              d="M71 81 C80 88 90 90.5 100 90.5 C110 90.5 120 88 129 81"
              fill="none"
              stroke="#ffd6e3"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path d="M100 96 C96 102 96 108 100 113" fill="none" stroke="#c94672" strokeWidth="1.4" strokeLinecap="round" opacity="0.3" />
          </g>
        </svg>

        <GiftTag lines={tag} />
      </div>

      {open && <Floaties items={DRIFTING_PETALS} className="left-1/2 top-[30%]" />}
      {celebrate && <Burst className="inset-x-0 top-0 h-[60%]" distance={110} delay={0.6} />}
      {!open && (
        <button
          type="button"
          onClick={bloom}
          aria-label="Help the rose bloom"
          className="absolute inset-0 cursor-pointer rounded-[2rem] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blush-300/70"
        />
      )}
    </div>
  );
}

/** Hangs from the ribbon's string; the zero-size anchor sits exactly where the string ends (142, 232). */
function GiftTag({ lines }: { lines: readonly [string, string] }) {
  return (
    <div className="absolute left-[71%] top-[89.2%]">
      <div className="origin-top-left animate-swing">
        <p className="absolute -left-2.5 top-0 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#fffaf3] py-1 pl-5 pr-3 text-left font-hand text-[clamp(0.8rem,7.8cqw,1.05rem)] font-semibold leading-[1.05] text-blush-600 shadow-[0_8px_16px_-10px_rgb(150_90_130/0.6)] ring-1 ring-blush-200">
          <span
            aria-hidden
            className="absolute left-2 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-blush-100 ring-1 ring-blush-300"
          />
          {lines[0]}
          <br />
          {lines[1]}
        </p>
      </div>
    </div>
  );
}

function RoseDefs({ id }: { id: (name: string) => string }) {
  return (
    <defs>
      <radialGradient id={id("outer")} cx="0.5" cy="0.25" r="0.85">
        <stop offset="0" stopColor="#ffb0c8" />
        <stop offset="0.6" stopColor="#e9668f" />
        <stop offset="1" stopColor="#cc4673" />
      </radialGradient>
      <radialGradient id={id("back")} cx="0.5" cy="0.8" r="0.9">
        <stop offset="0" stopColor="#f27ea4" />
        <stop offset="1" stopColor="#d24f7a" />
      </radialGradient>
      <radialGradient id={id("core")} cx="0.42" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#ffd0de" />
        <stop offset="0.55" stopColor="#f383a8" />
        <stop offset="1" stopColor="#d9517e" />
      </radialGradient>
      <radialGradient id={id("wrapLeft")} cx="0.3" cy="0.3" r="0.9">
        <stop offset="0" stopColor="#ffc3d6" />
        <stop offset="0.6" stopColor="#f17aa1" />
        <stop offset="1" stopColor="#d9517e" />
      </radialGradient>
      <radialGradient id={id("wrapRight")} cx="0.7" cy="0.3" r="0.9">
        <stop offset="0" stopColor="#ffc3d6" />
        <stop offset="0.6" stopColor="#f17aa1" />
        <stop offset="1" stopColor="#d9517e" />
      </radialGradient>
      <linearGradient id={id("cup")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffc6d8" />
        <stop offset="0.4" stopColor="#f47ea5" />
        <stop offset="1" stopColor="#cf4774" />
      </linearGradient>
      <linearGradient id={id("leaf")} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#d2f3dd" />
        <stop offset="1" stopColor="#7fc59c" />
      </linearGradient>
      <linearGradient id={id("stem")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#9fd8b4" />
        <stop offset="1" stopColor="#75b993" />
      </linearGradient>
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

function RoseCore({ paint }: { paint: Paint }) {
  return (
    <>
      <path d="M100 36 C114 38 123 52 121 64 C119 78 81 78 79 64 C77 52 86 38 100 36 Z" fill={paint("core")} />
      <path d="M100 38 C92 48 90 62 96 74" fill="none" stroke="#d9517e" strokeWidth="1.6" strokeLinecap="round" opacity="0.4" />
      <path
        d="M100 46 C108 45 112 52 107 57 C102 61 95 57 97 52 C99 48 104 50 103 53"
        fill="none"
        stroke="#c94672"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.65"
      />
      <ellipse cx="90" cy="52" rx="3.5" ry="7" fill="#fff" opacity="0.45" transform="rotate(20 90 52)" />
    </>
  );
}

function Stem({ paint }: { paint: Paint }) {
  const vein = { fill: "none", stroke: "#7cc29a", strokeWidth: 1.4, strokeLinecap: "round", opacity: 0.7 } as const;
  return (
    <>
      <path d="M100 80 C96 130 106 170 99 248" fill="none" stroke={paint("stem")} strokeWidth="5.5" strokeLinecap="round" />
      <path d="M100 152 C88 140 68 140 58 150 C70 160 88 162 100 152 Z" fill={paint("leaf")} />
      <path d="M98 152 Q80 147 64 150" {...vein} />
      <path d="M101 180 C114 166 134 166 144 176 C132 186 114 188 101 180 Z" fill={paint("leaf")} />
      <path d="M103 180 Q122 174 138 176" {...vein} />
    </>
  );
}

function Ribbon({ paint }: { paint: Paint }) {
  const shine = { fill: "none", stroke: "#fff", strokeOpacity: 0.7, strokeWidth: 1.6, strokeLinecap: "round" } as const;
  return (
    <g>
      <path d="M98 216 C94 226 90 234 84 241 L92 239 L94 246 C98 236 100 227 100.5 217 Z" fill={paint("ribbonDeep")} />
      <path d="M104 216 C108 226 112 233 118 240 L110 239.5 L109 246 C105 236 103 227 102.5 217 Z" fill={paint("ribbonDeep")} />
      <path d="M97 211 C85 199 70 201 72 212 C74 223 87 221 97 214 Z" fill={paint("ribbon")} />
      <path d="M105 211 C117 199 132 201 130 212 C128 223 115 221 105 214 Z" fill={paint("ribbon")} />
      <path d="M93 209 C86 204 79 205 77 210" {...shine} />
      <path d="M109 209 C116 204 123 205 125 210" {...shine} />
      <rect x="95.5" y="207" width="11" height="10" rx="4" fill={paint("ribbonDeep")} />
    </g>
  );
}
