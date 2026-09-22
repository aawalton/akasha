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
      statement: "The constants are read from the first account holding them, by sorted name.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every account in one capture was given the same constants by the same game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture holding no constants is read as nothing rather than as an empty table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that will not parse is read as nothing rather than raising.",
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
} as const satisfies Module
