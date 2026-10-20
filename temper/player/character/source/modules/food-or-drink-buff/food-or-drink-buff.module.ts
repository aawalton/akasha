import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const foodOrDrinkBuff = {
  id: "01a15a0d-a0a6-7404-92b4-2cfbff7ff688",
  type: "page-type/module",
  slug: "food-or-drink-buff",
  definition: "the effects a food or drink's buff text names, read into temper's effects",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a stat temper models is read, and only at an amount above zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sentence naming no stat temper models leaves the buff partially supported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A buff naming no stat temper models is unsupported and states no effect.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sentence saying a buff scales with level names no effect.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Buff text rounds a duration to a tenth of an hour.",
    },
  ],
  createdAt: "2026-10-20T16:03:24.966Z",
  updatedAt: "2026-10-20T16:03:24.966Z",
} as const satisfies Module
