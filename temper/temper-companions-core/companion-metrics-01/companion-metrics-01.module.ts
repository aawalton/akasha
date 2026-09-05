import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionMetrics01 = {
  id: "01a06152-c2cc-727d-a09e-2e6be6f2e87e",
  pageTypeSlug: "module",
  slug: "companion-metrics-01",
  definition:
    "the second fifteen companion metric declarations, in the order the metrics table gathers them",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A run holds a contiguous stretch of the companion metrics table.",
    },
  ],
} as const satisfies Module
