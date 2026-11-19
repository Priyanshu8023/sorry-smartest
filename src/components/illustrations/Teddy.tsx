"use client";

import type { CSSProperties } from "react";
import { pivot, useSvgIds, type CSSVars, type Paint } from "@/lib/svg";
import { HEART_PATH } from "./paths";

export type TeddyPose = "heart" | "shy" | "coder" | "wave";

const LABELS: Record<TeddyPose, string> = {
  heart: "A teddy bear sitting on a little cloud, holding a pink heart",
  shy: "A teddy bear looking down, feeling sorry",
  coder: "A teddy bear in glasses typing on a laptop next to a cup of coffee",
  wave: "A teddy bear on a little cloud, waving goodbye",
};

const INK = "#3d2a31";
const MOUTH = "#6e463c";
const BLUSH = "#f59ab7";

type TeddyProps = {
  pose: TeddyPose;
  className?: string;
  style?: CSSProperties;
};

export function Teddy({ pose, className, style }: TeddyProps) {
  const { id, paint } = useSvgIds();
  const onCloud = pose === "heart" || pose === "wave";

  return (
    <svg viewBox="0 0 240 250" role="img" aria-label={LABELS[pose]} className={className} style={style}>
      <TeddyDefs id={id} />
      {!onCloud && <ellipse cx="120" cy="237" rx="76" ry="10" fill={paint("shadow")} />}

      <g className={onCloud ? "animate-float" : undefined}>
        <g className="animate-breathe" style={pivot(120, 232)}>
          <ellipse cx="120" cy="180" rx="57" ry="52" fill={paint("fur")} />
          <ellipse cx="120" cy="189" rx="34" ry="31" fill={paint("cream")} />
          <ellipse cx="120" cy="158" rx="46" ry="12" fill={paint("occlusion")} />
        </g>

        {onCloud && <CloudSeat paint={paint} />}
        {pose !== "coder" && <Feet paint={paint} />}

        <g className="animate-breathe" style={pivot(120, 232)}>
          {pose === "heart" && <HoldingHeart paint={paint} />}
          {pose === "shy" && <FidgetingPaws paint={paint} />}
          {pose === "wave" && <RestingArm paint={paint} />}
          <g transform={pose === "shy" ? "rotate(-6 120 156)" : undefined}>
            <Head pose={pose} paint={paint} />
          </g>
          {pose === "coder" && <Laptop paint={paint} />}
          {pose === "wave" && <WavingArm paint={paint} />}
        </g>

        {pose === "coder" && <Coffee paint={paint} />}
        {pose === "coder" && <FloatingCode />}
      </g>
    </svg>
  );
}

function TeddyDefs({ id }: { id: (name: string) => string }) {
  return (
    <defs>
      <radialGradient id={id("fur")} cx="0.38" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#ffead5" />
        <stop offset="0.55" stopColor="#efc7a0" />
        <stop offset="1" stopColor="#d6a078" />
      </radialGradient>
      <radialGradient id={id("furDeep")} cx="0.4" cy="0.28" r="0.85">
        <stop offset="0" stopColor="#f6d6b4" />
        <stop offset="1" stopColor="#cc946a" />
      </radialGradient>
      <radialGradient id={id("cream")} cx="0.45" cy="0.35" r="0.75">
        <stop offset="0" stopColor="#fffcf7" />
        <stop offset="1" stopColor="#f6dfc8" />
      </radialGradient>
      <radialGradient id={id("pink")} cx="0.4" cy="0.35" r="0.75">
        <stop offset="0" stopColor="#ffdbe5" />
        <stop offset="1" stopColor="#f0a3bc" />
      </radialGradient>
      <radialGradient id={id("nose")} cx="0.4" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#8a5c50" />
        <stop offset="1" stopColor="#4a2f2a" />
      </radialGradient>
      <radialGradient id={id("heart")} cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#ffe7ef" />
        <stop offset="0.55" stopColor="#f9a8c4" />
        <stop offset="1" stopColor="#e57ea6" />
      </radialGradient>
      <radialGradient id={id("shadow")}>
        <stop offset="0" stopColor="#b98db8" stopOpacity="0.38" />
        <stop offset="1" stopColor="#b98db8" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={id("occlusion")}>
        <stop offset="0" stopColor="#a86f4f" stopOpacity="0.32" />
        <stop offset="1" stopColor="#a86f4f" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={id("cloud")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#e7e2fa" />
      </linearGradient>
      <linearGradient id={id("lid")} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f4f0fd" />
        <stop offset="1" stopColor="#d3c9ee" />
      </linearGradient>
      <linearGradient id={id("base")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#e2dbf5" />
        <stop offset="1" stopColor="#b9add9" />
      </linearGradient>
      <linearGradient id={id("mug")} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#e3f1ff" />
        <stop offset="1" stopColor="#a9cff0" />
      </linearGradient>
    </defs>
  );
}

type PartProps = { paint: Paint };

function Arm({ paint, cx, cy, angle }: PartProps & { cx: number; cy: number; angle: number }) {
  return <ellipse cx={cx} cy={cy} rx="13.5" ry="26" fill={paint("furDeep")} transform={`rotate(${angle} ${cx} ${cy})`} />;
}

function Paw({ paint, cx, cy, r = 13 }: PartProps & { cx: number; cy: number; r?: number }) {
  return <circle cx={cx} cy={cy} r={r} fill={paint("fur")} />;
}

function CloudSeat({ paint }: PartProps) {
  return (
    <path
      d="M48 246 C30 246 24 230 36 222 C32 206 52 196 66 204 C74 192 96 190 106 200 C114 190 134 190 142 200 C152 190 176 194 178 208 C194 204 210 216 204 230 C216 236 210 248 194 248 Z"
      fill={paint("cloud")}
    />
  );
}

function Feet({ paint }: PartProps) {
  return (
    <>
      {[84, 156].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy="216" rx="25" ry="17" fill={paint("furDeep")} />
          <ellipse cx={x} cy="219" rx="12.5" ry="8.5" fill={paint("pink")} />
          <circle cx={x - 11} cy="207.5" r="3.6" fill={paint("pink")} />
          <circle cx={x} cy="204" r="3.6" fill={paint("pink")} />
          <circle cx={x + 11} cy="207.5" r="3.6" fill={paint("pink")} />
        </g>
      ))}
    </>
  );
}

function HoldingHeart({ paint }: PartProps) {
  return (
    <>
      <g className="animate-heartbeat" style={pivot(120, 184)}>
        <path d={HEART_PATH} transform="translate(120 189) scale(1.15)" fill={paint("heart")} />
        <ellipse cx="104" cy="168" rx="7" ry="4.2" fill="#fff" opacity="0.7" transform="rotate(-35 104 168)" />
      </g>
      <Arm paint={paint} cx={85} cy={175} angle={-50} />
      <Arm paint={paint} cx={155} cy={175} angle={50} />
      <Paw paint={paint} cx={98} cy={198} />
      <Paw paint={paint} cx={142} cy={198} />
    </>
  );
}

function FidgetingPaws({ paint }: PartProps) {
  return (
    <>
      <Arm paint={paint} cx={90} cy={176} angle={-60} />
      <Arm paint={paint} cx={150} cy={176} angle={60} />
      <g className="animate-fidget" style={{ "--fx": "2.5px" } as CSSVars}>
        <Paw paint={paint} cx={109} cy={191} r={12} />
      </g>
      <g className="animate-fidget" style={{ "--fx": "-2.5px" } as CSSVars}>
        <Paw paint={paint} cx={131} cy={191} r={12} />
      </g>
    </>
  );
}

function Laptop({ paint }: PartProps) {
  return (
    <>
      <g className="animate-type">
        <Paw paint={paint} cx={92} cy={150} r={12} />
      </g>
      <g className="animate-type" style={{ animationDelay: "-0.27s" }}>
        <Paw paint={paint} cx={148} cy={150} r={12} />
      </g>
      <rect x="62" y="156" width="116" height="72" rx="10" fill={paint("lid")} />
      <rect x="63.5" y="157.5" width="113" height="69" rx="8.5" fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="1.5" />
      <path d={HEART_PATH} transform="translate(120 194) scale(0.38)" fill="#f7a9c4" />
      <path
        d="M50 228 H190 Q194 228 192 232 L190.5 235 Q189 238 185 238 H55 Q51 238 49.5 235 L48 232 Q46 228 50 228 Z"
        fill={paint("base")}
      />
    </>
  );
}

function Coffee({ paint }: PartProps) {
  return (
    <g>
      <path d="M216 214 h2.5 a7 7 0 0 1 0 14 H216" fill="none" stroke="#a9cff0" strokeWidth="4" strokeLinecap="round" />
      <rect x="190" y="208" width="27" height="29" rx="8" fill={paint("mug")} />
      <ellipse cx="203.5" cy="210.5" rx="11.5" ry="3" fill="#c99c84" />
      <path d={HEART_PATH} transform="translate(203.5 225) scale(0.2)" fill="#fff" opacity="0.9" />
      <path
        className="animate-steam"
        d="M198 203 q-4 -5 0 -10 q4 -5 0 -10"
        fill="none"
        stroke="#cbb9f6"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        className="animate-steam"
        style={{ animationDelay: "-1.3s" }}
        d="M209 203 q-4 -5 0 -10 q4 -5 0 -10"
        fill="none"
        stroke="#f9afc9"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </g>
  );
}

const CODE_BITS = [
  { text: "</>", x: 14, y: 150, color: "#a98fe6", delay: "0s" },
  { text: "{ }", x: 198, y: 170, color: "#7fb6e6", delay: "-1.2s" },
  { text: "♥", x: 28, y: 98, color: "#f08db3", delay: "-2.4s" },
];

function FloatingCode() {
  return (
    <g className="font-sans" fontSize="14" fontWeight="800">
      {CODE_BITS.map((bit) => (
        <text
          key={bit.text}
          x={bit.x}
          y={bit.y}
          fill={bit.color}
          className="animate-code"
          style={{ animationDelay: bit.delay }}
        >
          {bit.text}
        </text>
      ))}
    </g>
  );
}

function RestingArm({ paint }: PartProps) {
  return (
    <>
      <Arm paint={paint} cx={84} cy={176} angle={-35} />
      <path d={HEART_PATH} transform="translate(118 193) scale(0.6)" fill={paint("heart")} />
      <Paw paint={paint} cx={100} cy={199} r={12.5} />
    </>
  );
}

function WavingArm({ paint }: PartProps) {
  return (
    <g className="animate-wave" style={pivot(167, 151)}>
      <Arm paint={paint} cx={181} cy={128} angle={30} />
      <circle cx="194" cy="104" r="14.5" fill={paint("fur")} />
      <ellipse cx="194" cy="107.5" rx="6.5" ry="5.5" fill={paint("pink")} />
      <circle cx="186.5" cy="99" r="2.5" fill={paint("pink")} />
      <circle cx="194" cy="96" r="2.5" fill={paint("pink")} />
      <circle cx="201.5" cy="99" r="2.5" fill={paint("pink")} />
    </g>
  );
}

function Head({ pose, paint }: { pose: TeddyPose; paint: Paint }) {
  return (
    <g className="animate-head" style={pivot(120, 156)}>
      <circle cx="68" cy="54" r="23" fill={paint("fur")} />
      <circle cx="70" cy="56" r="12.5" fill={paint("pink")} />
      <circle cx="172" cy="54" r="23" fill={paint("fur")} />
      <circle cx="170" cy="56" r="12.5" fill={paint("pink")} />
      <ellipse cx="120" cy="100" rx="66" ry="57" fill={paint("fur")} />
      <ellipse cx="98" cy="66" rx="25" ry="11" fill="#fff" opacity="0.22" transform="rotate(-20 98 66)" />
      <ellipse cx="120" cy="123" rx="28" ry="19.5" fill={paint("cream")} />
      <Face pose={pose} paint={paint} />
    </g>
  );
}

const lineStyle = {
  stroke: MOUTH,
  strokeWidth: 2.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  fill: "none",
} as const;

function Face({ pose, paint }: { pose: TeddyPose; paint: Paint }) {
  const cheeks = (
    <g fill={BLUSH} opacity={pose === "wave" ? 0.6 : 0.45}>
      <ellipse cx="80" cy="124" rx="12" ry="7" />
      <ellipse cx="160" cy="124" rx="12" ry="7" />
    </g>
  );
  const nose = (
    <>
      <path d="M110 114 Q120 108 130 114 Q130 121.5 120 124.5 Q110 121.5 110 114 Z" fill={paint("nose")} />
      <ellipse cx="116.5" cy="113.5" rx="3.6" ry="1.8" fill="#fff" opacity="0.6" />
    </>
  );

  switch (pose) {
    case "wave":
      return (
        <>
          {cheeks}
          <path d="M86 102 Q94 92 102 102 M138 102 Q146 92 154 102" stroke={INK} strokeWidth="3.6" strokeLinecap="round" fill="none" />
          {nose}
          <path d="M111 128 Q120 131 129 128 Q120 141 111 128 Z" fill="#8a4452" />
          <ellipse cx="120" cy="134" rx="4.2" ry="2.4" fill="#f48fb1" />
        </>
      );
    case "shy":
      return (
        <>
          {cheeks}
          <path d="M83 86 L101 80 M157 86 L139 80" {...lineStyle} strokeWidth={3.2} />
          <Eyes y={104} />
          {nose}
          <path d="M120 124.5 V127.5 M112.5 133 Q120 127.5 127.5 133" {...lineStyle} />
          <SweatDrop />
        </>
      );
    case "coder":
      return (
        <>
          {cheeks}
          <Eyes y={102} />
          <Glasses />
          {nose}
          <path d="M120 124.5 V128 M113 129.5 Q120 135 127 129.5" {...lineStyle} />
          <SweatDrop />
        </>
      );
    default:
      return (
        <>
          {cheeks}
          <Eyes y={100} />
          {nose}
          <path d="M120 124.5 V128.5 M111.5 129.5 Q115.8 134.5 120 128.5 Q124.2 134.5 128.5 129.5" {...lineStyle} />
        </>
      );
  }
}

function Eyes({ y }: { y: number }) {
  return (
    <g className="animate-blink" style={pivot(120, y)}>
      <ellipse cx="94" cy={y} rx="7" ry="8" fill={INK} />
      <ellipse cx="146" cy={y} rx="7" ry="8" fill={INK} />
      <circle cx="96.6" cy={y - 3} r="2.6" fill="#fff" />
      <circle cx="148.6" cy={y - 3} r="2.6" fill="#fff" />
      <circle cx="92.2" cy={y + 3.4} r="1.2" fill="#fff" opacity="0.8" />
      <circle cx="144.2" cy={y + 3.4} r="1.2" fill="#fff" opacity="0.8" />
    </g>
  );
}

function Glasses() {
  const frame = "#8f7acf";
  return (
    <g>
      <g fill="#fff" fillOpacity="0.16" stroke={frame} strokeWidth="3.2">
        <circle cx="94" cy="102" r="16" />
        <circle cx="146" cy="102" r="16" />
      </g>
      <path
        d="M110 100 Q120 94 130 100 M78 99 L60 93 M162 99 L180 93"
        stroke={frame}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M85 95 l6 -4 M137 95 l6 -4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" opacity="0.85" />
    </g>
  );
}

function SweatDrop() {
  return (
    <g className="animate-drip">
      <path d="M182 80 C186 86 188 90 188 93 A6 6 0 0 1 176 93 C176 90 178 86 182 80 Z" fill="#bfe0fa" />
      <ellipse cx="180" cy="92" rx="1.6" ry="2.4" fill="#fff" opacity="0.85" />
    </g>
  );
}
