import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionPassiveMetrics = {
  id: "01a06110-abe3-7715-9a32-c5e21285cb2e",
  pageTypeSlug: "module",
  slug: "companion-passive-metrics",
  definition: "the metrics a companion passive raises, each named for what it changes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the companion pages rather than by hand.",
    },
  ],
} as const satisfies Module
