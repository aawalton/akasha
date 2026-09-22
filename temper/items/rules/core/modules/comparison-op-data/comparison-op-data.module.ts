import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const comparisonOpData = {
  id: "01a060d9-44ca-7f34-b2bb-07aab8837d17",
  type: "page-type/module",
  slug: "comparison-op-data",
  definition: "the six numeric comparisons a rule condition may use",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This code is written out from the comparison-op pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A saved rule has an operator's key.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An operator's place in this table is the order the operators are offered in.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "An operator moved to another place changes which operator an agent meets first.",
    },
  ],
} as const satisfies Module
