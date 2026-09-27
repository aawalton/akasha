import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const goldAmount = {
  id: "01a0e2ba-f250-73b7-ac0b-80825a213092",
  type: "page-type/module",
  slug: "gold-amount",
  definition: "an amount of gold as a Temper web screen words it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The gold unit is a web phrase page, filled with the rounded amount.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The amount is read from the held phrases, so a caller needs no phrase of its own.",
    },
  ],
} as const satisfies Module
