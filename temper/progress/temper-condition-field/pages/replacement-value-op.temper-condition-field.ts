import type { TemperConditionField } from "akasha/temper/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const replacementValueOp = {
  id: "01a07209-6b53-7500-9b2f-edeb04ef31ad",
  type: "page-type/temper-condition-field",
  slug: "replacement-value-op",
  title: "Replacement Value Comparison",
  key: "replacementValueOp",
  description:
    "The operator named here replaces the default `<=` when an item's replacement value is compared against `replacementValue`.",
} as const satisfies TemperConditionField
