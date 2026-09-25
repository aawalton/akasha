import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const windowFrame = {
  id: "01a0d8a7-e6a1-7041-b460-2a7571138d9f",
  type: "page-type/module",
  slug: "window-frame",
  definition: "the frame every Temper window is shown in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A Temper window is framed as the web's dialog is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window sits on the first surface level, with 24 of padding on every side.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The title is large, bold and in the primary text color, at the top left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window the player closes has a cross at the top right, dim until pointed at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The strip holding the title is what a caller drags the window by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a window shows sits in its body, below the title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every control the frame makes is named with Frame after the window's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A declared window names the frame's surface first among its controls, so it lies beneath them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A window laid out by offsets is told where the body starts and how wide the padding is.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The cross is the game's own art until Temper ships one in the web's look.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The title is set in the game's bold font until Temper ships Geist.",
    },
  ],
} as const satisfies Module
