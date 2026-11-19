"use client";

import { m, type HTMLMotionProps } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { copy } from "@/content/story";
import { cn } from "@/lib/cn";

const focusRing = "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blush-300/70";

export function PrimaryButton({ className, ...props }: HTMLMotionProps<"button">) {
  return (
    <m.button
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 rounded-full bg-linear-to-r from-blush-200 via-[#ffdbe8] to-lilac-200 px-7 py-3.5 text-[1.05rem] font-bold text-ink ring-1 ring-white/80",
        "shadow-[0_12px_28px_-12px_rgb(212_98_143/0.6),inset_0_1px_0_rgb(255_255_255/0.9)] transition-shadow hover:shadow-[0_18px_34px_-12px_rgb(212_98_143/0.7),inset_0_1px_0_rgb(255_255_255/0.9)]",
        focusRing,
        className,
      )}
      {...props}
    />
  );
}

export function GhostButton({ className, ...props }: HTMLMotionProps<"button">) {
  return (
    <m.button
      type="button"
      whileTap={{ scale: 0.96 }}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/60 px-5 py-2.5 text-sm font-semibold text-ink-soft ring-1 ring-blush-200 transition-colors hover:bg-white/90",
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
