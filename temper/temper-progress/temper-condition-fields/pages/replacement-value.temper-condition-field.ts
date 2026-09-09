import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const replacementValue = {
  id: "01a07209-6b53-7c76-ac1d-e3beb5bc0786",
  pageTypeSlug: "temper-condition-field",
  slug: "replacement-value",
  title: "Replacement Value",
  key: "replacementValue",
  description:
    "An item's replacement cost, read as zero where absent, is compared against the number or named constant stated, under `<=` by default.",
} as const satisfies TemperConditionField
