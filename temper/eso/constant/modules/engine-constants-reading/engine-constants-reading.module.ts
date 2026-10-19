import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const engineConstantsReading = {
  id: "01a0cac8-225a-75ff-8997-f26ac342831d",
  type: "page-type/module",
  slug: "engine-constants-reading",
  definition: "the reading taking the engine's constants out of a capture",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The constants are read from the engine globals catalog's landed table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field that table lacks is read as empty rather than raising.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A constant whose value is of the wrong kind is passed over rather than coerced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every name is sorted here, so what the reading writes turns only where the game did.",
    },
  ],
  createdAt: "2026-09-22T20:21:48.762Z",
  updatedAt: "2026-10-19T17:45:26.995Z",
} as const satisfies Module
