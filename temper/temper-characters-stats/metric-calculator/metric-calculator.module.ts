import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const metricCalculator = {
  id: "01a06271-abd0-7258-9fc4-ca306f191976",
  pageTypeSlug: "module",
  slug: "metric-calculator",
  definition: "every metric a build reaches on one bar, calculated in dependency order",
  code: "ts",
} as const satisfies Module
