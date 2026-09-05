import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const merchantValueOp = {
  id: "01a07209-6b52-7581-b013-23e4163221ab",
  pageTypeSlug: "temper-condition-field",
  slug: "merchant-value-op",
  title: "Merchant Value Comparison",
  key: "merchantValueOp",
  description:
    "The operator named here replaces the default `<=` when an item's merchant sell price is compared against `merchantValue`.",
} as const satisfies TemperConditionField
