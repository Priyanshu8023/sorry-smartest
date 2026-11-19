"use client";

import { m, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { HEART_PATH, HEART_VIEWBOX, SPARKLE_PATH, SPARKLE_VIEWBOX } from "../illustrations/paths";

const LOADING_DURATION_MS = 2200;

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), LOADING_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
          style={{
            backgroundImage:
              "radial-gradient(60% 50% at 50% 40%, #fff4f8 0%, transparent 70%), radial-gradient(50% 40% at 20% 80%, #f3eeff 0%, transparent 65%), radial-gradient(50% 40% at 80% 20%, #ffe5d4 0%, transparent 65%)",
          }}
        >
          {/* Floating sparkles behind the heart */}
          {LOADING_SPARKLES.map((s, i) => (
            <m.span
              key={i}
              className="absolute"
              style={{ left: s.left, top: s.top }}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0.3, 1, 0.3],
                rotate: [0, 180],
              }}
              transition={{
                duration: s.dur,
                delay: s.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg viewBox={SPARKLE_VIEWBOX} width={s.size} height={s.size} fill={s.color}>
                <path d={SPARKLE_PATH} />
              </svg>
            </m.span>
          ))}

          {/* Main loading heart */}
          <m.div
            className="relative"
            animate={{
              scale: [1, 1.12, 0.95, 1.08, 1],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Glow behind the heart */}
            <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgb(249_175_201/0.5),transparent_70%)] animate-glow-pulse" />
            <svg viewBox={HEART_VIEWBOX} width={64} height={64} className="relative drop-shadow-[0_8px_20px_rgb(249_175_201/0.6)]">
              <defs>
                <radialGradient id="loading-heart-fill" cx="0.35" cy="0.3" r="0.8">
                  <stop offset="0" stopColor="#ffe8f0" />
                  <stop offset="0.5" stopColor="#f9afc9" />
                  <stop offset="1" stopColor="#e57ea6" />
                </radialGradient>
              </defs>
              <path d={HEART_PATH} fill="url(#loading-heart-fill)" />
              <ellipse cx="-11" cy="-15" rx="6" ry="3.6" fill="#fff" opacity="0.6" transform="rotate(-30 -11 -15)" />
            </svg>
          </m.div>

          {/* Loading text */}
          <m.p
            className="mt-6 font-hand text-xl text-blush-500 tracking-wide"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            made with love
          </m.p>

          {/* Bouncing dots */}
          <div className="mt-3 flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <m.span
                key={i}
                className="size-1.5 rounded-full bg-blush-300"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

const LOADING_SPARKLES = [
  { left: "30%", top: "35%", size: 10, color: "#f9afc9", dur: 2, delay: 0 },
  { left: "65%", top: "30%", size: 12, color: "#cbb9f6", dur: 2.4, delay: 0.4 },
  { left: "25%", top: "55%", size: 8, color: "#a9d1f3", dur: 1.8, delay: 0.8 },
  { left: "70%", top: "58%", size: 10, color: "#ffcfb8", dur: 2.2, delay: 1.2 },
  { left: "45%", top: "25%", size: 9, color: "#cbb9f6", dur: 2.6, delay: 0.6 },
  { left: "55%", top: "65%", size: 11, color: "#f9afc9", dur: 2, delay: 1 },
];
