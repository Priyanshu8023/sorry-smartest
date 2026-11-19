# A Little Sorry ❤️

A small, animated, interactive story for Smartest, made with Next.js, React, Tailwind CSS and Framer Motion.

It plays as seven short scenes: a hello, the apology, a heart to mend, a flower to bloom, an envelope to open, a funny "behind the scenes" note, and a goodbye. There's no music and no pressure to respond, and you can go back or watch it again at any time.

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
