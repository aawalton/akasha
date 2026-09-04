import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const metricTreeData01 = {
  id: "01a06133-5f06-736a-899a-cc2c7e589cc2",
  pageTypeSlug: "module",
  slug: "metric-tree-data-01",
  definition: "the damage category of the character stat display tree",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the metric-tree pages rather than by hand.",
    },
  ],
} as const satisfies Module
