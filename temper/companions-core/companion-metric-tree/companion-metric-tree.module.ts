import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionMetricTree = {
  id: "01a06152-c2cd-7151-9afb-057ef756a156",
  pageTypeSlug: "module",
  slug: "companion-metric-tree",
  definition: "the fixed grouping of companion metrics into labeled display categories",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The metric grouping is a module-level literal rather than data assembled from metric records.",
    },
    {
      invariantKind: "constraint",
      statement: "An empty role list returns the grouping without an Overall group prepended.",
    },
    {
      invariantKind: "gap",
      statement: "A role absent from ROLE_TOTAL_METRICS is dropped from the Overall group.",
    },
  ],
} as const satisfies Module
