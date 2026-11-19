/** Every word of the story lives here, so the copy can be tweaked without touching components. */
export const copy = {
  continue: "Continue",
  welcome: {
    label: "hello",
    title: "Hey Smartest... 🥺",
    subtitle: "Can I have a tiny moment of your time?",
    cta: "Okay, let’s see 💗",
  },
  apology: {
    label: "the apology",
    bubble: "I messed up, didn’t I?",
    message: "I never wanted things to turn out this way. I should have communicated better.",
    sorry: "I’m genuinely sorry.",
  },
  heart: {
    label: "repair the heart",
    hint: "Tap the heart to mend it",
    message: "I know I can’t undo what happened, but I wish I could have handled things differently.",
  },
  flower: {
    label: "a little bouquet",
    hint: "A little bouquet for you 💐",
    tag: ["for you,", "from PK ♡"],
    message:
      "Not just any flowers... a little bouquet for someone special. 💐\n\nI wish I could express everything through these flowers, but for now, this is my little way of saying I'm sorry.",
  },
  wish: {
    label: "a small wish",
    hint: "Tap the envelope",
    message:
      "I don’t expect everything to become normal overnight. I’d just love the chance to talk again, whenever you’re comfortable.",
  },
  goodbye: {
    label: "until then",
    title: "That’s all, Smartest.",
    subtitle: "Take your time. ❤️",
    signature: "Your well-wisher, PK",
    replay: "Watch again",
  },
} as const;
