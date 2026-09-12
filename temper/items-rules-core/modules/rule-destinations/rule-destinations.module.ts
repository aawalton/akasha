import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const ruleDestinations = {
  id: "01a06100-3bf9-7a3d-a409-5e876219979c",
  type: "module",
  slug: "rule-destinations",
  definition: "where each rule sends what it matches, gathered as one map from rule to destination",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule sending its items nowhere is absent from this map.",
    },
  ],
} as const satisfies Module
