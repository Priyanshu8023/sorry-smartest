import type { ComponentType } from "react";
import type { SceneProps } from "../types";
import { ApologyScene } from "./ApologyScene";
import { FlowerScene } from "./FlowerScene";
import { GoodbyeScene } from "./GoodbyeScene";
import { HeartScene } from "./HeartScene";
import { WelcomeScene } from "./WelcomeScene";
import { WishScene } from "./WishScene";

export type SceneId = "welcome" | "apology" | "heart" | "flower" | "wish" | "goodbye";

type SceneEntry = {
  id: SceneId;
  Component: ComponentType<SceneProps>;
  /**
   * Scenes with a moment (the apology reveal, mending, blooming, opening) play it on the first tap
   * anywhere; this is how long (ms) the moment gets before another tap anywhere moves on.
   */
  momentMs?: number;
};

export const SCENES: readonly SceneEntry[] = [
  { id: "welcome", Component: WelcomeScene },
  { id: "apology", Component: ApologyScene, momentMs: 900 },
  { id: "heart", Component: HeartScene, momentMs: 1300 },
  { id: "flower", Component: FlowerScene, momentMs: 1500 },
  { id: "wish", Component: WishScene, momentMs: 2000 },
  { id: "goodbye", Component: GoodbyeScene },
];
