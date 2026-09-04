import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const metricsData07 = {
  id: "01a06131-abb3-714c-9bd1-ae338762c5ba",
  pageTypeSlug: "module",
  slug: "metrics-data-07",
  definition: "character stats ha-restore-shock-staff through healing-done-dot",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The stats are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
