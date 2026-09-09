import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const stockThreshold = {
  id: "01a07209-6b53-7b82-a04a-06279f6e58f0",
  pageTypeSlug: "temper-condition-field",
  slug: "stock-threshold",
  title: "Stock Threshold",
  key: "stockThreshold",
  description:
    "The per-character unit count `allStocked` compares stock against is named here, defaulting to 200 where a rule sets none.",
} as const satisfies TemperConditionField
