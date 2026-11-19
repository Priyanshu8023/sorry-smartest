"use client";

import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m, type Variants } from "framer-motion";
import { useCallback, useRef, useState } from "react";
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

export function Story() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [revealed, setRevealed] = useState<ReadonlySet<SceneId>>(() => new Set());
  const sceneRef = useRef<HTMLDivElement>(null);
  const hasNavigated = useRef(false);

  const { id: sceneId, Component: SceneView } = SCENES[index];

  const reveal = useCallback(() => {
    setRevealed((current) => (current.has(sceneId) ? current : new Set(current).add(sceneId)));
  }, [sceneId]);

  const goTo = (target: number, towards: 1 | -1) => {
    hasNavigated.current = true;
    setDirection(towards);
    setIndex(Math.min(Math.max(target, 0), SCENES.length - 1));
    if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restart = () => {
    setRevealed(new Set());
    goTo(0, -1);
  };

  // Move focus to the new scene's heading so keyboard and screen-reader users land on it.
  const focusHeading = (definition: unknown) => {
    if (definition !== "center" || !hasNavigated.current) return;
    sceneRef.current?.querySelector<HTMLElement>("[data-scene-heading]")?.focus({ preventScroll: true });
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="glass-card relative flex h-safe-screen min-h-fit w-full max-w-[31rem] flex-col rounded-[2rem] px-4 pb-5 pt-4 short:rounded-[1.75rem] short:pb-3 short:pt-3 landscape-phone:max-w-[54rem] landscape-phone:rounded-[1.5rem] landscape-phone:px-5 landscape-phone:pb-3 landscape-phone:pt-2 desk:max-h-[46rem] desk:px-8 desk:pb-8 desk:pt-6">
          <span
            aria-hidden
            className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3 rounded-[3px] bg-blush-200/80 shadow-sm [background-image:repeating-linear-gradient(45deg,transparent_0_6px,rgb(255_255_255/0.45)_6px_12px)]"
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
                revealed={revealed.has(sceneId)}
                onReveal={reveal}
                onNext={() => goTo(index + 1, 1)}
                onRestart={restart}
              />
            </m.div>
          </AnimatePresence>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
