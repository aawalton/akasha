import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const allEffects = {
  id: "01a0e2b0-36fa-7891-8772-706cd08ffd9a",
  type: "page-type/temper-condition-value",
  slug: "all-effects",
  title: "all effects",
  key: "all",
  conditionField: "temper-condition-field/potion-effects-mode",
  displayOrder: 1,
} as const satisfies TemperConditionValue
