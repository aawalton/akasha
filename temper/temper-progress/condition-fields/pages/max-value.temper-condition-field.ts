import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const maxValue = {
  id: "01a07209-6b52-733e-bd26-b8536d049bb5",
  pageTypeSlug: "temper-condition-field",
  slug: "max-value",
  title: "Max Value",
  key: "maxValue",
  description:
    "An item's estimated market value must be no greater than the number stated, and this field is read only where the rule sets no `marketValue`.",
} as const satisfies TemperConditionField
