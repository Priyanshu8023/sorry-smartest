"use client";

import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m, type Variants } from "framer-motion";
import { useCallback, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { LoadingScreen } from "../ambient/LoadingScreen";
import { SCENES, type SceneId } from "./scenes";
import { StoryHeader } from "./StoryHeader";

const page: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 48, scale: 0.98 }),
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -48,
    scale: 0.98,
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  }),
};

/** Roughly the page-turn time; taps anywhere during it are ignored so quick double taps don't skip a scene. */
const SCENE_SETTLE_MS = 650;

/** Taps on these keep their own behaviour instead of moving the story along. */
const OWN_CLICK_TARGETS = "a, button, input, select, textarea, label, [role='button']";

type StoryProps = {
  backdrop: ReactNode;
};

export function Story({ backdrop }: StoryProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [revealed, setRevealed] = useState<ReadonlySet<SceneId>>(() => new Set());
  const sceneRef = useRef<HTMLDivElement>(null);
  const hasNavigated = useRef(false);
  const tapsAllowedAt = useRef(0);

  const { id: sceneId, Component: SceneView, momentMs } = SCENES[index];
  const isLastScene = index === SCENES.length - 1;
  const isRevealed = revealed.has(sceneId);

  const reveal = useCallback(() => {
    if (isRevealed) return;
    tapsAllowedAt.current = performance.now() + (momentMs ?? 0);
    setRevealed((current) => new Set(current).add(sceneId));
  }, [isRevealed, momentMs, sceneId]);

  const goTo = (target: number, towards: 1 | -1) => {
    hasNavigated.current = true;
    tapsAllowedAt.current = performance.now() + SCENE_SETTLE_MS;
    setDirection(towards);
    setIndex(Math.min(Math.max(target, 0), SCENES.length - 1));
    if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restart = () => {
    setRevealed(new Set());
    goTo(0, -1);
  };

  // A tap anywhere plays the scene's moment if it hasn't happened yet, otherwise turns the page.
  const handleTapAnywhere = (event: MouseEvent<HTMLElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (event.target instanceof Element && event.target.closest(OWN_CLICK_TARGETS)) return;
    if (window.getSelection()?.toString()) return;
    if (performance.now() < tapsAllowedAt.current) return;

    if (momentMs !== undefined && !isRevealed) reveal();
    else if (!isLastScene) goTo(index + 1, 1);
  };

  // Move focus to the new scene's heading so keyboard and screen-reader users land on it.
  const focusHeading = (definition: unknown) => {
    if (definition !== "center" || !hasNavigated.current) return;
    sceneRef.current?.querySelector<HTMLElement>("[data-scene-heading]")?.focus({ preventScroll: true });
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <LoadingScreen />
        <main
          onClick={handleTapAnywhere}
          className="safe-pad relative isolate flex min-h-svh items-center justify-center overflow-clip [--pad-x:0.75rem] [--pad-y:0.75rem] short:[--pad-y:0.5rem] landscape-phone:[--pad-y:0.5rem] desk:[--pad-x:1.5rem] desk:[--pad-y:2rem]"
        >
          {backdrop}
          <h1 className="sr-only">A Little Sorry</h1>

          <m.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 2.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card relative flex h-safe-screen min-h-fit w-full max-w-[31rem] flex-col rounded-[2rem] px-4 pb-5 pt-4 short:rounded-[1.75rem] short:pb-3 short:pt-3 landscape-phone:max-w-[54rem] landscape-phone:rounded-[1.5rem] landscape-phone:px-5 landscape-phone:pb-3 landscape-phone:pt-2 desk:max-h-[46rem] desk:px-8 desk:pb-8 desk:pt-6"
          >
            {/* Decorative washi tape */}
            <span
              aria-hidden
              className="absolute -top-2 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3 rounded-[3px] bg-blush-200/80 shadow-sm [background-image:repeating-linear-gradient(45deg,transparent_0_6px,rgb(255_255_255/0.45)_6px_12px)]"
            />
            {/* Second washi tape for cuteness */}
            <span
              aria-hidden
              className="absolute -top-1.5 left-1/2 ml-14 h-5 w-16 -translate-x-1/2 rotate-2 rounded-[3px] bg-lilac-200/60 shadow-sm [background-image:repeating-linear-gradient(-45deg,transparent_0_5px,rgb(255_255_255/0.4)_5px_10px)]"
            />

            {/* Subtle inner glow at top */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-[2rem] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgb(255_228_240/0.4),transparent)]"
            />

            <StoryHeader index={index} total={SCENES.length} onBack={() => goTo(index - 1, -1)} />

            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <m.div
                key={sceneId}
                ref={sceneRef}
                custom={direction}
                variants={page}
                initial="enter"
                animate="center"
                exit="exit"
                onAnimationComplete={focusHeading}
                className="flex flex-1 flex-col pt-3 short:pt-1.5 landscape-phone:pt-1"
              >
                <SceneView
                  revealed={isRevealed}
                  onReveal={reveal}
                  onNext={() => goTo(index + 1, 1)}
                  onRestart={restart}
                />
              </m.div>
            </AnimatePresence>
          </m.div>
        </main>
      </MotionConfig>
    </LazyMotion>
  );
}
