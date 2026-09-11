import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const comparisonOpData = {
  id: "01a060d9-44ca-7f34-b2bb-07aab8837d17",
  type: "module",
  slug: "comparison-op-data",
  definition: "the six numeric comparisons a rule condition may be written with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the comparison-op pages rather than by hand.",
    },
    {
      invariantKind: "departure",
      statement: "A saved rule has an operator's key.",
    },
    {
      invariantKind: "constraint",
      statement: "An operator's place in this table is the order the operators are offered in.",
    },
    {
      invariantKind: "gap",
      statement: "An operator moved to another place changes which operator an agent meets first.",
    },
  ],
} as const satisfies Module
