import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/cn";

type StoryHeaderProps = {
  index: number;
  total: number;
  onBack: () => void;
};

export function StoryHeader({ index, total, onBack }: StoryHeaderProps) {
  const canGoBack = index > 0;

  return (
    <header className="flex items-center justify-between">
      <button
        type="button"
        onClick={onBack}
        disabled={!canGoBack}
        aria-label="Previous part"
        className={cn(
          "grid size-11 cursor-pointer place-items-center rounded-full bg-white/70 text-ink-soft ring-1 ring-blush-100 transition-all duration-300 hover:bg-white hover:shadow-[0_4px_12px_-4px_rgb(212_98_143/0.3)] hover:ring-blush-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blush-300/70 short:size-10 landscape-phone:size-9",
          !canGoBack && "invisible",
        )}
      >
        <ChevronLeft aria-hidden className="size-5" />
      </button>

      <p className="sr-only">
        Part {index + 1} of {total}
      </p>
      <div aria-hidden className="flex items-center gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={cn(
              "h-2 rounded-full transition-all duration-500",
              i === index ? "w-7 bg-gradient-to-r from-blush-400 to-lilac-400 shadow-[0_2px_8px_-2px_rgb(240_141_179/0.5)]" : "w-2",
              i < index && "bg-blush-300",
              i > index && "bg-lilac-200",
            )}
          />
        ))}
      </div>

      <span aria-hidden className="size-11 short:size-10 landscape-phone:size-9" />
    </header>
  );
}
