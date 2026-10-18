import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const surfaceBackdrop = {
  id: "01a0ca1b-9819-771f-8b2f-507f18be812b",
  type: "page-type/module",
  slug: "surface-backdrop",
  definition: "the backdrop filling a game control, in the game's art for the level it sits at",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A window's background is a surface level rather than art the window states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control sits one level above whatever that control sits on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window, at the first two levels, takes the art of the game's default backdrop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A panel or field, at any higher level, takes the art of the game's inset backdrop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What Temper shows over play sits on black at half opacity, with no edge.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A caller needing its own name, anchors or layer makes the backdrop and has this paint it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A window's backdrop lies beneath every field and panel painted inside that window.",
    },
  ],
  createdAt: "2026-09-22T17:13:21.177Z",
  updatedAt: "2026-10-18T17:34:18.543Z",
} as const satisfies Module
