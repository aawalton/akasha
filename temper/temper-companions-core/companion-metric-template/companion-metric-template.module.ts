import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionMetricTemplate = {
  id: "01a06108-076d-7d54-8679-103ed9862380",
  pageTypeSlug: "module",
  slug: "companion-metric-template",
  definition:
    "the shape a companion metric is declared in, and the arithmetic its value is worked out by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A metric's value is a tree of arithmetic nodes rather than a written function.",
    },
  ],
} as const satisfies Module
