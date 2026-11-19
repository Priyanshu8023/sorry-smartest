"use client";

import { m, AnimatePresence } from "framer-motion";
import { RotateCcw, Sparkles } from "lucide-react";
import { useState, useCallback, useRef } from "react";
import { Bunny } from "@/components/illustrations/Bunny";
import { Teddy } from "@/components/illustrations/Teddy";
import { HEART_PATH, HEART_VIEWBOX, SPARKLE_PATH, SPARKLE_VIEWBOX, PETAL_PATH, PETAL_VIEWBOX } from "@/components/illustrations/paths";
import { GhostButton, PrimaryButton } from "../Buttons";
import { SceneLayout } from "../SceneLayout";
import type { SceneProps } from "../types";

const TEASE_MESSAGES = [
  "Are you sure? 🥺",
  "Please reconsider! 😭",
  "My teddy is crying!",
  "One tiny chance? 🥹",
  "Oops, missed me!",
];

const DODGE_POSITIONS = [
  { x: 75, y: -45 },
  { x: -85, y: 35 },
  { x: 80, y: 50 },
  { x: -75, y: -40 },
  { x: 70, y: -20 },
];

/** Full-screen celebratory particles when YES is clicked */
function CelebrationParticles() {
  const particles = Array.from({ length: 28 }, (_, i) => {
    const isHeart = i % 3 === 0;
    const isSparkle = i % 3 === 1;
    const angle = (i / 28) * Math.PI * 2;
    const distance = 80 + (i % 5) * 35;
    const colors = ["#f9afc9", "#cbb9f6", "#ffcfb8", "#f08db3", "#ffd0e0", "#a9d1f3"];
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 20,
      color: colors[i % colors.length],
      isHeart,
      isSparkle,
      size: isHeart ? 16 : isSparkle ? 14 : 12,
      delay: (i % 7) * 0.08,
      duration: 1.6 + (i % 4) * 0.3,
    };
  });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-visible">
      {particles.map((p) => (
        <m.span
          key={p.id}
          className="absolute left-1/2 top-1/3"
          initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            scale: [0, 1.3, 0.9],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.22, 1, 0.36, 1],
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          <svg
            viewBox={p.isHeart ? HEART_VIEWBOX : p.isSparkle ? SPARKLE_VIEWBOX : PETAL_VIEWBOX}
            width={p.size}
            height={p.size}
            fill={p.color}
          >
            <path d={p.isHeart ? HEART_PATH : p.isSparkle ? SPARKLE_PATH : PETAL_PATH} />
          </svg>
        </m.span>
      ))}
    </div>
  );
}

export function FinalQuestionScene({ onRestart }: SceneProps) {
  const [decision, setDecision] = useState<"pending" | "accepted" | "rejected">("pending");
  const [dodgeCount, setDodgeCount] = useState(0);
  const [teaseText, setTeaseText] = useState<string | null>(null);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const isDodgingRef = useRef(false);

  const handleDodge = useCallback(() => {
    if (decision !== "pending") return;

    if (dodgeCount < TEASE_MESSAGES.length) {
      const nextDodge = dodgeCount + 1;
      setDodgeCount(nextDodge);
      setTeaseText(TEASE_MESSAGES[dodgeCount % TEASE_MESSAGES.length]);
      const nextPos = DODGE_POSITIONS[dodgeCount % DODGE_POSITIONS.length];
      setNoOffset(nextPos);
    } else {
      // After all lines used, keep button reachable for her genuine choice
      setTeaseText("I will listen to whatever you choose... 🥺");
      setNoOffset({ x: 0, y: 0 });
    }
  }, [decision, dodgeCount]);

  const handleNoClick = useCallback(() => {
    setDecision("rejected");
  }, []);

  const handleYesClick = useCallback(() => {
    setDecision("accepted");
  }, []);

  // 1. ACCEPTED (YES) STATE
  if (decision === "accepted") {
    return (
      <SceneLayout
        label="forever grateful"
        stage={
          <div className="relative">
            <CelebrationParticles />
            {/* Jumping happy teddy */}
            <m.div
              animate={{
                y: [0, -18, 0, -10, 0],
                scale: [1, 1.06, 1, 1.03, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Teddy pose="wave" className="w-[min(78cqw,16.5rem,90cqh)] drop-shadow-md" />
            </m.div>
            <m.div
              className="absolute -bottom-1 -left-3 animate-pop"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Bunny pose="cheer" className="w-16 drop-shadow-sm" />
            </m.div>
          </div>
        }
        actions={
          <div className="animate-enter [animation-delay:1.2s] mt-2">
            <GhostButton onClick={onRestart}>
              <RotateCcw aria-hidden className="size-4" />
              Replay our story 🌸
            </GhostButton>
          </div>
        }
      >
        <div className="flex flex-col items-center text-center space-y-3.5 px-2">
          {/* Main Title */}
          <m.h3
            className="font-hand text-[clamp(1.5rem,1rem+3vw,2.3rem)] font-bold text-blush-600 leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            THANK YOU FOR ACCEPTING MY SORRY! ❤️
          </m.h3>

          {/* Gradual heartfelt message */}
          <m.div
            className="space-y-2.5 max-w-[24rem]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="font-display text-[clamp(0.9rem,0.8rem+0.5vw,1rem)] leading-relaxed text-ink-soft">
              I know one YES doesn’t erase everything that happened, but it truly means the world to me.
            </p>
            <p className="font-display text-[clamp(0.9rem,0.8rem+0.5vw,1rem)] leading-relaxed text-ink-soft">
              I promise to communicate better, understand you better, and never let misunderstandings speak for me again.
            </p>
          </m.div>

          {/* Emotional climax */}
          <m.p
            className="font-hand text-[clamp(1.3rem,1rem+2vw,1.75rem)] font-bold text-blush-600 pt-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            One last time...<br />
            I’M REALLY, REALLY SORRY, SMARTEST! ❤️
          </m.p>

          {/* Signoff */}
          <m.div
            className="pt-2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <p className="font-hand text-[clamp(1.15rem,0.9rem+1.5vw,1.4rem)] text-ink">
              With lots of care,
            </p>
            <p className="font-hand text-[clamp(1.25rem,1rem+1.8vw,1.55rem)] font-bold text-blush-600">
              Your well-wisher, PK ❤️
            </p>
          </m.div>
        </div>
      </SceneLayout>
    );
  }

  // 2. REJECTED (NO CLICKED) STATE - GENTLE & RESPECTFUL
  if (decision === "rejected") {
    return (
      <SceneLayout
        label="with all my respect"
        stage={
          <div className="relative">
            <Teddy pose="shy" className="w-[min(76cqw,15.5rem,88cqh)] drop-shadow-sm" />
            <div className="absolute -bottom-1 -right-2">
              <Bunny pose="shy" className="w-14" />
            </div>
          </div>
        }
        actions={
          <div className="animate-enter [animation-delay:600ms]">
            <GhostButton onClick={onRestart}>
              <RotateCcw aria-hidden className="size-4" />
              Watch again
            </GhostButton>
          </div>
        }
      >
        <div className="max-w-[24rem] px-2 py-4 space-y-4">
          <m.p
            className="font-hand text-[clamp(1.5rem,1rem+3vw,2.1rem)] font-bold leading-snug text-ink"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            That’s okay. I respect your decision. Thank you for hearing me out. ❤️
          </m.p>
          <m.p
            className="font-display text-[clamp(0.9rem,0.8rem+0.5vw,1rem)] text-ink-soft leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            I will always wish the absolute best for you, Smartest. Take care of yourself.
          </m.p>
          <p className="font-hand text-lg font-bold text-blush-500 pt-2">
            — PK ♡
          </p>
        </div>
      </SceneLayout>
    );
  }

  // 3. PENDING (THE QUESTION) SCREEN
  return (
    <SceneLayout
      label="the last sorry"
      stage={
        <div className="relative">
          <Teddy pose="heart" className="w-[min(80cqw,16.5rem,92cqh)] animate-enter [animation-delay:100ms] drop-shadow-sm" />
          <div className="absolute -bottom-1 -right-3 animate-enter [animation-delay:350ms]">
            <Bunny pose="peek" className="w-16 drop-shadow-xs" />
          </div>
        </div>
      }
      actions={
        <div className="relative flex flex-col items-center w-full max-w-[28rem]">
          {/* Tease message bubble when NO is dodged */}
          <AnimatePresence>
            {teaseText && (
              <m.div
                key={teaseText}
                initial={{ opacity: 0, y: 6, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="mb-3 px-4 py-1.5 rounded-full bg-white/90 ring-1 ring-blush-200 shadow-[0_6px_16px_-6px_rgb(212_98_143/0.4)]"
              >
                <p className="font-hand text-base font-bold text-blush-600 flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-blush-400" />
                  {teaseText}
                </p>
              </m.div>
            )}
          </AnimatePresence>

          {/* Action Buttons: YES and Playful NO */}
          <div className="relative flex items-center justify-center gap-4 min-h-[4rem] w-full">
            {/* YES Button */}
            <PrimaryButton
              onClick={handleYesClick}
              className="px-6 py-3.5 text-[1rem] shadow-[0_14px_28px_-10px_rgb(212_98_143/0.65)] hover:scale-105"
            >
              YES, I FORGIVE YOU ❤️
            </PrimaryButton>

            {/* Playful Dodging NO Button */}
            <m.div
              animate={{ x: noOffset.x, y: noOffset.y }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              onMouseEnter={handleDodge}
              onTouchStart={(e) => {
                if (dodgeCount < TEASE_MESSAGES.length && !isDodgingRef.current) {
                  isDodgingRef.current = true;
                  e.preventDefault();
                  handleDodge();
                  setTimeout(() => {
                    isDodgingRef.current = false;
                  }, 400);
                }
              }}
            >
              <GhostButton
                onClick={handleNoClick}
                className="px-5 py-3 text-sm font-bold text-ink-soft/80 hover:text-ink border border-blush-200/80 bg-white/80 hover:bg-white"
              >
                NO 🙈
              </GhostButton>
            </m.div>
          </div>
        </div>
      }
    >
      <div className="px-2">
        <h3 className="animate-enter font-hand text-[clamp(1.65rem,1rem+3.2vw,2.4rem)] font-bold leading-tight text-ink [animation-delay:200ms] desk:text-[2.6rem]">
          Smartest, will you accept my sorry? 🥺❤️
        </h3>
        <p className="animate-enter mt-2 font-display text-[clamp(0.85rem,0.75rem+0.8vw,0.95rem)] text-ink-soft [animation-delay:350ms]">
          No pressure at all... choose with your heart.
        </p>
      </div>
    </SceneLayout>
  );
}
