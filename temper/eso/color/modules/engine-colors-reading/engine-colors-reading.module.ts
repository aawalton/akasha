import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const engineColorsReading = {
  id: "01a0d3f7-2292-71b2-8198-e3913423cd8a",
  type: "page-type/module",
  slug: "engine-colors-reading",
  definition: "the reading taking the engine's interface colors out of a capture",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The colors are read from the interface color catalog's table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A table holding no colors is read as no type rather than refused here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry missing a number it needs is passed over rather than guessed at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every type and field is sorted here, so what is written turns only where the game did.",
    },
  ],
  createdAt: "2026-09-24T15:09:43.954Z",
  updatedAt: "2026-10-19T17:45:15.363Z",
} as const satisfies Module
