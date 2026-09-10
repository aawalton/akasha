import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionMetricEffect = {
  id: "01a06108-076a-732c-a08f-c97be5fbfaf7",
  pageTypeSlug: "module",
  slug: "companion-metric-effect",
  definition: "the change one source makes to one companion metric",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An effect names one metric and the way that effect's value is read.",
    },
  ],
} as const satisfies Module
