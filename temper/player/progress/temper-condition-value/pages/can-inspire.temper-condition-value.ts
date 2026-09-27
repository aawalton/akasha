import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const canInspire = {
  id: "01a0e271-5ad0-7342-8bbc-2d069617a19f",
  type: "page-type/temper-condition-value",
  slug: "can-inspire",
  title: "Can Inspire",
  key: "can-inspire",
  conditionField: "temper-condition-field/can-inspire",
  displayOrder: 0,
} as const satisfies TemperConditionValue
