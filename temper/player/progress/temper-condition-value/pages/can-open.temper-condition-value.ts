import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const canOpen = {
  id: "01a0e271-5ad0-78f5-92d1-1754f837a94d",
  type: "page-type/temper-condition-value",
  slug: "can-open",
  title: "Can Open",
  key: "can-open",
  conditionField: "temper-condition-field/can-open",
  displayOrder: 0,
} as const satisfies TemperConditionValue
