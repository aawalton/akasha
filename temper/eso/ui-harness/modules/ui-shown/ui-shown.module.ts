import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const uiShown = {
  id: "01a0da0a-b61c-700e-b41b-a5009238b89e",
  type: "page-type/module",
  slug: "ui-shown",
  definition: "the controls a picture shows, in the order the game draws them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A hidden control and everything under that control are left out.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game fades a control by its own alpha times that of every control above it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control faded to nothing and everything under it are left out.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game cuts what a scroll area holds at the edges of that area.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control lying wholly beyond the scroll areas holding it is left out.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The game draws a window's controls by tier, then layer, then level, whatever holds them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Within a window, controls are drawn in the game's order, and in tree order at a tie.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control given no tier, layer or level takes its parent's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window given no layer is on the controls layer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The windows on the screen are drawn one whole window after another.",
    },
  ],
} as const satisfies Module
