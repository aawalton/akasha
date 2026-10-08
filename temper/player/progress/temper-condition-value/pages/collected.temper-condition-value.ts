import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const collected = {
  id: "01a11bee-2aac-78c6-931f-15acd421a8b3",
  type: "page-type/temper-condition-value",
  slug: "collected",
  title: "Is Not Uncollected",
  key: "collected",
  conditionField: "temper-condition-field/uncollected",
  displayOrder: 1,
} as const satisfies TemperConditionValue
