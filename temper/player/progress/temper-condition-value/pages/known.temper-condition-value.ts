import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const known = {
  id: "01a0e271-5ad0-7b55-af40-4c8d12e13c4c",
  type: "page-type/temper-condition-value",
  slug: "known",
  title: "Is Known",
  key: "known",
  conditionField: "temper-condition-field/known",
  displayOrder: 0,
} as const satisfies TemperConditionValue
