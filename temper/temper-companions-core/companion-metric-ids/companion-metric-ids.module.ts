import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionMetricIds = {
  id: "01a06108-076c-7e9e-8095-bc59ce08217a",
  pageTypeSlug: "module",
  slug: "companion-metric-ids",
  definition: "every quantity a companion build is measured by, named as one type",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This list imports nothing.",
    },
  ],
} as const satisfies Module
