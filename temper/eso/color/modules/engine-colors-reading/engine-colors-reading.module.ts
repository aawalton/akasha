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
      statement: "The colors are read from the first account holding them, by sorted name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture holding no colors is read as nothing rather than as an empty table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that will not parse is read as nothing rather than raising.",
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
} as const satisfies Module
