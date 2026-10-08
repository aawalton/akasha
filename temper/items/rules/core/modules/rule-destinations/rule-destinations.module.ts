import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleDestinations = {
  id: "01a06100-3bf9-7a3d-a409-5e876219979c",
  type: "page-type/module",
  slug: "rule-destinations",
  definition: "where each rule sends what it matches, held as one map from rule to destination",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule sending its items nowhere is absent from this map.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.441Z",
  updatedAt: "2026-09-22T14:23:56.000Z",
} as const satisfies Module
