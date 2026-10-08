import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const uncollected = {
  id: "01a11bee-2aac-7f80-9c25-508b4a78d1c2",
  type: "page-type/temper-condition-value",
  slug: "uncollected",
  title: "Is Uncollected",
  key: "uncollected",
  conditionField: "temper-condition-field/uncollected",
  displayOrder: 0,
} as const satisfies TemperConditionValue
