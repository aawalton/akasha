import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const canUnlock = {
  id: "01a0e271-5ad0-7e44-8fc2-3fa21dccad2d",
  type: "page-type/temper-condition-value",
  slug: "can-unlock",
  title: "Can Unlock",
  key: "can-unlock",
  conditionField: "temper-condition-field/can-unlock",
  displayOrder: 0,
} as const satisfies TemperConditionValue
