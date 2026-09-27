import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shoppingOptimizerTypes = {
  id: "01a063a1-8cc1-7009-a217-d47dd30f6b03",
  type: "page-type/module",
  slug: "shopping-optimizer-types",
  definition: "a shopping route optimisation's shape",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A search fault names its phrase page and never carries a server's words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The optimise route answers a fault as one of the reason codes held here.",
    },
  ],
} as const satisfies Module
