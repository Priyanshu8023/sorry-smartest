import { ChevronRight } from "lucide-react";
import { Teddy } from "@/components/illustrations/Teddy";
import { copy } from "@/content/story";
import { PrimaryButton } from "../Buttons";
import { SceneLayout } from "../SceneLayout";
import type { SceneProps } from "../types";

export function CreditsScene({ onNext }: SceneProps) {
  const { label, message, notesTitle, notes, cta } = copy.credits;

  return (
    <SceneLayout
      label={label}
      stage={<Teddy pose="coder" className="w-[min(72cqw,15rem,94cqh)] animate-enter [animation-delay:100ms]" />}
      actions={
        <div className="animate-enter [animation-delay:650ms]">
          <PrimaryButton onClick={onNext}>
            {cta}
            <ChevronRight aria-hidden className="size-5" />
          </PrimaryButton>
        </div>
      }
    >
      <p className="animate-enter font-display text-[clamp(0.95rem,0.8rem+0.9vw,1.05rem)] font-medium leading-relaxed text-ink-soft [animation-delay:250ms] desk:text-lg short:leading-snug landscape-phone:text-[0.9rem]">
        {message}
      </p>
      <aside className="animate-enter relative mx-auto mt-4 w-fit max-w-[calc(100%-1.25rem)] -rotate-1 rounded-2xl border border-dashed border-lilac-300 bg-lilac-100/80 px-5 py-3 text-left text-sm text-ink-soft shadow-[0_8px_20px_-10px_rgb(150_120_200/0.3)] [animation-delay:450ms] short:mt-3 short:py-2 landscape-phone:mt-2">
        {/* Decorative corner tape */}
        <span
          aria-hidden
          className="absolute -left-2 -top-2 h-4 w-7 rotate-[-8deg] rounded-sm bg-blush-200/70 shadow-sm [background-image:repeating-linear-gradient(45deg,transparent_0_3px,rgb(255_255_255/0.4)_3px_6px)]"
        />
        <p className="mb-1 font-display text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-blush-600">{notesTitle}</p>
        <ul className="space-y-0.5">
          {notes.map((note) => (
            <li key={note.label}>
              <span className="font-bold text-ink">{note.label}:</span> {note.value}
            </li>
          ))}
        </ul>
        <span
          aria-hidden
          className="absolute -right-5 -top-5 grid size-12 rotate-12 place-items-center rounded-full border-2 border-dashed border-blush-300 bg-blush-100 font-hand text-base font-bold leading-none text-blush-600 shadow-[0_4px_12px_-4px_rgb(212_98_143/0.3)]"
        >
          PK ✓
        </span>
      </aside>
    </SceneLayout>
  );
}
