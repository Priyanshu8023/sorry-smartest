export type SceneProps = {
  /** Whether this scene's moment (tap, reveal) already happened; survives going back and forth. */
  revealed: boolean;
  onReveal: () => void;
  onNext: () => void;
  onRestart: () => void;
};
