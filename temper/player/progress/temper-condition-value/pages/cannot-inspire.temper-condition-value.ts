import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const cannotInspire = {
  id: "01a0e271-5ad0-7e3c-865a-3628fc644a1b",
  type: "page-type/temper-condition-value",
  slug: "cannot-inspire",
  title: "Cannot Inspire",
  key: "cannot-inspire",
  conditionField: "temper-condition-field/can-inspire",
  displayOrder: 1,
} as const satisfies TemperConditionValue
