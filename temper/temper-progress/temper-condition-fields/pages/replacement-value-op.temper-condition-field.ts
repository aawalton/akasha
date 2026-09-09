import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const replacementValueOp = {
  id: "01a07209-6b53-7500-9b2f-edeb04ef31ad",
  pageTypeSlug: "temper-condition-field",
  slug: "replacement-value-op",
  title: "Replacement Value Comparison",
  key: "replacementValueOp",
  description:
    "The operator named here replaces the default `<=` when an item's replacement cost is compared against `replacementValue`.",
} as const satisfies TemperConditionField
