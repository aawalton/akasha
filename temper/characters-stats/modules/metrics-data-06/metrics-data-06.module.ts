import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const metricsData06 = {
  id: "01a06131-abb3-7491-b341-991cb1c40a69",
  type: "module",
  slug: "metrics-data-06",
  definition: "character stats ha-frost-staff through ha-restore-rest-staff",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The stats are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
