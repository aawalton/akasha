import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const marketValue = {
  id: "01a07209-6b51-7fca-8a11-730a4bc2f40d",
  pageTypeSlug: "temper-condition-field",
  slug: "market-value",
  title: "Market Value",
  key: "marketValue",
  description:
    "An item's estimated market value is compared against the number or named constant stated, under `<=` by default, and this field overrides `maxValue` and `minValue` entirely.",
} as const satisfies TemperConditionField
