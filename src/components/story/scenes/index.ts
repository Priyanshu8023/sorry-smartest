import type { ComponentType } from "react";
import type { SceneProps } from "../types";
import { ApologyScene } from "./ApologyScene";
import { CreditsScene } from "./CreditsScene";
import { FlowerScene } from "./FlowerScene";
import { GoodbyeScene } from "./GoodbyeScene";
import { HeartScene } from "./HeartScene";
import { WelcomeScene } from "./WelcomeScene";
import { WishScene } from "./WishScene";

export const SCENES = [
  { id: "welcome", Component: WelcomeScene },
  { id: "apology", Component: ApologyScene },
  { id: "heart", Component: HeartScene },
  { id: "flower", Component: FlowerScene },
  { id: "wish", Component: WishScene },
  { id: "credits", Component: CreditsScene },
  { id: "goodbye", Component: GoodbyeScene },
] as const satisfies ReadonlyArray<{ id: string; Component: ComponentType<SceneProps> }>;

export type SceneId = (typeof SCENES)[number]["id"];
