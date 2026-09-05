import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const marketValueOp = {
  id: "01a07209-6b51-7df7-a7e0-14b4a13b61a3",
  pageTypeSlug: "temper-condition-field",
  slug: "market-value-op",
  title: "Market Value Comparison",
  key: "marketValueOp",
  description:
    "The operator named here replaces the default `<=` when an item's estimated market value is compared against `marketValue`.",
} as const satisfies TemperConditionField
