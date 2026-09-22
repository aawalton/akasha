import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const surfaceBackdrop = {
  id: "01a0ca1b-9819-771f-8b2f-507f18be812b",
  type: "page-type/module",
  slug: "surface-backdrop",
  definition: "the backdrop filling a game control, in the grey one design surface level names",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A window's background is a surface level rather than a color the window states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control sits one level above whatever that control sits on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A surface is opaque, and none of the game shows through it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A caller needing its own name, anchors or layer makes the backdrop and has this color it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No edge is drawn here.",
    },
  ],
} as const satisfies Module
