# A Little Sorry ❤️

A small, animated, interactive story for Smartest, made with Next.js, React, Tailwind CSS and Framer Motion.

It plays as seven short scenes: a hello, the apology, a heart to mend, a rose to bloom, an envelope to open, a funny "behind the scenes" note, and a goodbye. There's no music and no pressure to respond, and you can go back or watch it again at any time.

Tap anywhere to move along. On a scene with a little moment (the apology, the heart, the rose, the envelope), the first tap plays that moment and the next one turns the page, so nothing gets skipped by accident.

It adapts to any phone held either way up (from 280px-wide foldables to large phones; turned sideways, scenes switch to two columns), as well as tablets and desktops.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Production build:

```bash
npm run build
npm start
```

## Where things live

- `src/content/story.ts`: every line of text in the story. Change the words here.
- `src/components/story/`: the story flow (navigation, progress, scene layout, buttons) and one file per scene in `scenes/`.
- `src/components/illustrations/`: hand-built SVG/CSS illustrations (teddy poses, mendable heart, a blooming rose with a gift tag, envelope).
- `src/components/ambient/Backdrop.tsx`: the dreamy background (clouds, rising hearts, twinkles).
- `src/app/globals.css`: palette, fonts and the lightweight CSS animations.

Animations respect the "reduce motion" accessibility setting.
