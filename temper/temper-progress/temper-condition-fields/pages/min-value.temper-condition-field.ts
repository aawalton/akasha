import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const minValue = {
  id: "01a07209-6b52-7b71-b676-74e1a6ecc1f3",
  pageTypeSlug: "temper-condition-field",
  slug: "min-value",
  title: "Min Value",
  key: "minValue",
  description:
    "An item's estimated market value must be no less than the number stated, and this field is read only where the rule sets no `marketValue`.",
} as const satisfies TemperConditionField
