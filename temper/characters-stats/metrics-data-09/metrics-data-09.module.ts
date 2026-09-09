import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const metricsData09 = {
  id: "01a06131-abb4-7f53-a545-eaf53fac53c5",
  pageTypeSlug: "module",
  slug: "metrics-data-09",
  definition: "character stats la-flame-staff through la-shock-spell-damage",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The stats are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
