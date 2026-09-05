import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const merchantValue = {
  id: "01a07209-6b52-7464-a508-0f1d30c57d14",
  pageTypeSlug: "temper-condition-field",
  slug: "merchant-value",
  title: "Merchant Value",
  key: "merchantValue",
  description:
    "An item's merchant sell price, read as zero where absent, is compared against the number or named constant stated, under `<=` by default.",
} as const satisfies TemperConditionField
