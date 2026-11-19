import { Teddy } from "@/components/illustrations/Teddy";
import { copy } from "@/content/story";
import { PrimaryButton } from "../Buttons";
import { SceneLayout } from "../SceneLayout";
import type { SceneProps } from "../types";

export function WelcomeScene({ onNext }: SceneProps) {
  const { label, title, subtitle, cta } = copy.welcome;

  return (
    <SceneLayout
      label={label}
      stage={<Teddy pose="heart" className="w-[min(74cqw,17rem,94cqh)] animate-enter [animation-delay:100ms]" />}
      actions={
        <div className="animate-enter [animation-delay:600ms]">
          <PrimaryButton onClick={onNext}>{cta}</PrimaryButton>
        </div>
      }
    >
      <p className="animate-enter font-hand text-[clamp(1.75rem,calc((100vw_-_4.75rem)/7),2.6rem)] font-bold leading-none text-ink [animation-delay:250ms] desk:text-5xl">
        {title}
      </p>
      <p className="animate-enter mt-3 text-[clamp(0.95rem,0.8rem+1vw,1.05rem)] text-ink-soft [animation-delay:400ms] short:mt-2 desk:text-lg">
        {subtitle}
      </p>
    </SceneLayout>
  );
}
