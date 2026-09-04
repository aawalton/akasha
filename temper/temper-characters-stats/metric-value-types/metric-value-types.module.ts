import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const metricValueTypes = {
  id: "01a0612f-aae8-7133-973b-994591ee77fc",
  pageTypeSlug: "module",
  slug: "metric-value-types",
  definition:
    "the four kinds of value a character stat carries, each with the way it is written out",
  code: "ts",
} as const satisfies Module
