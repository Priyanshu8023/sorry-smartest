"use client";

import { m, type HTMLMotionProps } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useCallback, useState, type ReactNode } from "react";
import { copy } from "@/content/story";
import { cn } from "@/lib/cn";
import { HEART_PATH, HEART_VIEWBOX } from "../illustrations/paths";

const focusRing = "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blush-300/70";

type PrimaryButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  children?: ReactNode;
};

/** Tiny hearts that float upward when a button is clicked */
function ClickHearts({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-visible">
      {[
        { x: -16, delay: 0, color: "#f9afc9", size: 10 },
        { x: 8, delay: 0.1, color: "#cbb9f6", size: 8 },
        { x: 20, delay: 0.2, color: "#ffcfb8", size: 9 },
        { x: -6, delay: 0.15, color: "#f9afc9", size: 7 },
      ].map((heart, i) => (
        <m.span
          key={i}
          className="absolute left-1/2 top-0"
          initial={{ opacity: 0, y: 0, x: heart.x, scale: 0.3 }}
          animate={{ opacity: [0, 1, 0], y: -50, scale: [0.3, 1, 0.6] }}
          transition={{ duration: 0.9, delay: heart.delay, ease: "easeOut" }}
        >
          <svg viewBox={HEART_VIEWBOX} width={heart.size} height={heart.size} fill={heart.color}>
            <path d={HEART_PATH} />
          </svg>
        </m.span>
      ))}
    </div>
  );
}

export function PrimaryButton({ className, onClick, children, ...props }: PrimaryButtonProps) {
  const [showHearts, setShowHearts] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 1200);
      onClick?.(e as Parameters<NonNullable<typeof onClick>>[0]);
    },
    [onClick],
  );

  return (
    <m.button
      type="button"
      whileHover={{ y: -3, scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative inline-flex cursor-pointer items-center gap-2 rounded-full bg-linear-to-r from-blush-200 via-[#ffdbe8] to-lilac-200 px-7 py-3.5 text-[1.05rem] font-bold text-ink ring-1 ring-white/80",
        "shadow-[0_12px_28px_-12px_rgb(212_98_143/0.6),inset_0_1px_0_rgb(255_255_255/0.9)] transition-all duration-300 hover:shadow-[0_18px_34px_-12px_rgb(212_98_143/0.7),inset_0_1px_0_rgb(255_255_255/0.9)]",
        "before:absolute before:inset-0 before:rounded-full before:bg-[linear-gradient(135deg,rgb(255_255_255/0.4),transparent_50%)] before:opacity-0 before:transition-opacity hover:before:opacity-100",
        focusRing,
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <ClickHearts active={showHearts} />
      {children}
    </m.button>
  );
}

export function GhostButton({ className, ...props }: HTMLMotionProps<"button">) {
  return (
    <m.button
      type="button"
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/60 px-5 py-2.5 text-sm font-semibold text-ink-soft ring-1 ring-blush-200 transition-all duration-300 hover:bg-white/90 hover:shadow-[0_8px_20px_-10px_rgb(212_98_143/0.3)]",
        focusRing,
        className,
      )}
      {...props}
    />
  );
}

type ContinueButtonProps = {
  onClick: () => void;
  label?: string;
  /** Seconds to wait before appearing, so it shows up after the scene's moment has played. */
  delay?: number;
  /** Take focus on mount, so keyboard users aren't stranded after the tapped illustration goes away. */
  autoFocus?: boolean;
};

export function ContinueButton({ onClick, label = copy.continue, delay = 0, autoFocus }: ContinueButtonProps) {
  return (
    <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
      <PrimaryButton onClick={onClick} autoFocus={autoFocus}>
        {label}
        <ChevronRight aria-hidden className="size-5" />
      </PrimaryButton>
    </m.div>
  );
}
