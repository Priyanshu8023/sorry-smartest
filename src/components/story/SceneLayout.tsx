import type { ReactNode } from "react";

type SceneLayoutProps = {
  label: string;
  stage: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
};

/*
 * Upright: label, stage, words and actions stack in one column.
 * Phone turned sideways: the stage takes the left half, everything else sits centred on the right.
 */
export function SceneLayout({ label, stage, children, actions }: SceneLayoutProps) {
  return (
    <div className="flex flex-1 flex-col items-center text-center landscape-phone:grid landscape-phone:grid-cols-2 landscape-phone:grid-rows-[1fr_auto_auto_auto_1fr] landscape-phone:justify-items-center landscape-phone:gap-x-6 landscape-phone:[grid-template-areas:'stage_.'_'stage_label'_'stage_text'_'stage_actions'_'stage_.']">
      <h2
        tabIndex={-1}
        data-scene-heading
        className="animate-enter font-hand text-[clamp(1.25rem,1rem+1.6vw,1.5rem)] font-semibold leading-tight tracking-wide text-blush-600 outline-none landscape-phone:[grid-area:label]"
      >
        <span aria-hidden className="mr-2 text-blush-300 animate-bounce-soft inline-block">
          ✿
        </span>
        {label}
        <span aria-hidden className="ml-2 text-blush-300 animate-bounce-soft inline-block [animation-delay:0.5s]">
          ✿
        </span>
      </h2>

      {/* A size container: illustrations scale (cqw/cqh) to whatever room is left on this screen. */}
      <div className="relative flex min-h-[9rem] w-full flex-1 items-center justify-center py-2 [container-type:size] desk:py-4 landscape-phone:self-stretch landscape-phone:py-1 landscape-phone:[grid-area:stage]">
        {/* Layered glows for depth */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 aspect-square w-[min(92cqw,20rem,100cqh)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.85),rgb(255_230_239/0.5)_45%,transparent_70%)]"
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 aspect-square w-[min(70cqw,16rem,80cqh)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_240_245/0.5),transparent_60%)] animate-glow-pulse"
        />
        <div className="relative flex flex-col items-center">{stage}</div>
      </div>

      {children && <div className="w-full max-w-[26rem] landscape-phone:[grid-area:text]">{children}</div>}

      <div className="mt-4 flex min-h-[3.75rem] w-full items-center justify-center short:mt-2 short:min-h-[3.25rem] landscape-phone:mt-2 landscape-phone:min-h-[3.25rem] landscape-phone:[grid-area:actions]">
        {actions}
      </div>
    </div>
  );
}
