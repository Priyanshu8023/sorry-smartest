import type { CSSVars } from "@/lib/svg";
import { CLOUD_PATH, CLOUD_VIEWBOX, HEART_PATH, HEART_VIEWBOX, SPARKLE_PATH, SPARKLE_VIEWBOX } from "../illustrations/paths";

const CLOUDS = [
  { className: "left-[-8%] top-[4%] w-44 sm:w-64", dur: "26s", delay: "-6s", opacity: 0.95 },
  { className: "right-[-10%] top-[18%] w-36 sm:w-56", dur: "32s", delay: "-14s", opacity: 0.85 },
  { className: "left-[-4%] bottom-[14%] w-32 sm:w-52", dur: "28s", delay: "-3s", opacity: 0.8 },
  { className: "right-[-6%] bottom-[2%] w-40 sm:w-60", dur: "36s", delay: "-20s", opacity: 0.9 },
];

const HEARTS = [
  { left: "6%", size: 14, dur: "19s", delay: "-3s", sway: "26px", spin: "30deg", color: "#f9afc9", alpha: 0.55 },
  { left: "18%", size: 10, dur: "23s", delay: "-15s", sway: "-18px", spin: "-24deg", color: "#cbb9f6", alpha: 0.5 },
  { left: "31%", size: 12, dur: "21s", delay: "-9s", sway: "20px", spin: "20deg", color: "#ffcfb8", alpha: 0.5 },
  { left: "52%", size: 9, dur: "25s", delay: "-19s", sway: "-22px", spin: "-30deg", color: "#a9d1f3", alpha: 0.55 },
  { left: "67%", size: 13, dur: "20s", delay: "-6s", sway: "24px", spin: "26deg", color: "#f9afc9", alpha: 0.5 },
  { left: "80%", size: 11, dur: "24s", delay: "-12s", sway: "-20px", spin: "-18deg", color: "#cbb9f6", alpha: 0.55 },
  { left: "92%", size: 15, dur: "22s", delay: "-17s", sway: "18px", spin: "22deg", color: "#ffcfb8", alpha: 0.45 },
];

const SPARKLES = [
  { left: "12%", top: "22%", size: 12, dur: "3.4s", delay: "-0.6s", color: "#f9afc9" },
  { left: "86%", top: "30%", size: 14, dur: "4.1s", delay: "-2.2s", color: "#cbb9f6" },
  { left: "22%", top: "72%", size: 10, dur: "3.8s", delay: "-1.4s", color: "#a9d1f3" },
  { left: "76%", top: "64%", size: 11, dur: "3.2s", delay: "-0.2s", color: "#f9afc9" },
  { left: "48%", top: "6%", size: 10, dur: "4.4s", delay: "-3s", color: "#cbb9f6" },
  { left: "93%", top: "86%", size: 12, dur: "3.6s", delay: "-1.8s", color: "#ffcfb8" },
];

/** Dreamy sky behind the story: pastel glow, drifting clouds, rising hearts and twinkles. */
export function Backdrop() {
  return (
    <div aria-hidden className="bg-dreamy pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {CLOUDS.map((cloud, i) => (
        <div
          key={i}
          className={`absolute animate-drift ${cloud.className}`}
          style={{ "--dur": cloud.dur, animationDelay: cloud.delay, opacity: cloud.opacity } as CSSVars}
        >
          <svg viewBox={CLOUD_VIEWBOX} className="h-auto w-full drop-shadow-[0_14px_18px_rgb(190_170_230/0.25)]">
            <defs>
              <linearGradient id={`backdrop-cloud-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="1" stopColor="#ece8fb" />
              </linearGradient>
            </defs>
            <path d={CLOUD_PATH} fill={`url(#backdrop-cloud-${i})`} />
          </svg>
        </div>
      ))}

      {HEARTS.map((heart, i) => (
        <span
          key={i}
          className="absolute top-full animate-rise opacity-0"
          style={
            {
              left: heart.left,
              "--dur": heart.dur,
              "--sway": heart.sway,
              "--spin": heart.spin,
              "--alpha": heart.alpha,
              animationDelay: heart.delay,
            } as CSSVars
          }
        >
          <svg viewBox={HEART_VIEWBOX} width={heart.size} height={heart.size} fill={heart.color}>
            <path d={HEART_PATH} />
          </svg>
        </span>
      ))}

      {SPARKLES.map((sparkle, i) => (
        <span
          key={i}
          className="absolute animate-twinkle"
          style={{ left: sparkle.left, top: sparkle.top, "--dur": sparkle.dur, animationDelay: sparkle.delay } as CSSVars}
        >
          <svg viewBox={SPARKLE_VIEWBOX} width={sparkle.size} height={sparkle.size} fill={sparkle.color}>
            <path d={SPARKLE_PATH} />
          </svg>
        </span>
      ))}
    </div>
  );
}
