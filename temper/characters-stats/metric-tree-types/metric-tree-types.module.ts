import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const metricTreeTypes = {
  id: "01a0612f-aae8-700e-bf91-a084dd4e9f2a",
  type: "module",
  slug: "metric-tree-types",
  definition: "the node kinds a character stat display tree has, with a guard for each kind",
  code: "ts",
} as const satisfies Module
