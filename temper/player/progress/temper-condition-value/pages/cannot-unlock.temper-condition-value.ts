import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const cannotUnlock = {
  id: "01a0e271-5ad0-7221-8d8d-600f88dd77db",
  type: "page-type/temper-condition-value",
  slug: "cannot-unlock",
  title: "Cannot Unlock",
  key: "cannot-unlock",
  conditionField: "temper-condition-field/can-unlock",
  displayOrder: 1,
} as const satisfies TemperConditionValue
