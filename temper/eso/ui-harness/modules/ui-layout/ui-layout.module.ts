import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const uiLayout = {
  id: "01a0c9db-1ffe-72ca-a616-1a79ee6f2047",
  type: "page-type/module",
  slug: "ui-layout",
  definition: "where on the screen each control a snapshot carries sits",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A point on a control is a fraction of that control's width and height.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control with one anchor takes the width and the height the control states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A control with two anchors takes the width and the height those two anchors leave it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two anchors sharing a fraction leave that measure to what the control states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control with no anchor sits at the top left of its parent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An anchor naming a control outside the snapshot is answered with the screen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control anchored to itself through a ring is answered with the screen once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The controls come back in the order the game would paint them.",
    },
  ],
} as const satisfies Module
