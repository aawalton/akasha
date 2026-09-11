import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const metricsData02 = {
  id: "01a06131-abb0-7969-b531-c138a9e6ad26",
  type: "module",
  slug: "metrics-data-02",
  definition: "character stats break-free-cost through damage-done-disease",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The stats are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
