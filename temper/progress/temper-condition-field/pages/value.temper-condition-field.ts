import type { TemperConditionField } from "akasha/temper/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const value = {
  id: "01a07209-6b53-7b81-b228-d512eb706d55",
  type: "page-type/temper-condition-field",
  slug: "value",
  title: "Value",
  key: "value",
  description:
    "The greatest of an item's market value, merchant value and replacement value is compared against the number or named constant stated, under `<=` by default.",
} as const satisfies TemperConditionField
