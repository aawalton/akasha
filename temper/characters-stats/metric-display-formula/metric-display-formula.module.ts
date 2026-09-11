import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const metricDisplayFormula = {
  id: "01a06133-c630-7f37-86b1-d0b53f0db395",
  pageTypeSlug: "module",
  type: "module",
  slug: "metric-display-formula",
  definition:
    "a character stat's formula written out as display nodes, each operand with its number",
  code: "ts",
} as const satisfies Module
