import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const canResearch = {
  id: "01a0e271-5ad0-7297-a002-23b45e69357c",
  type: "page-type/temper-condition-value",
  slug: "can-research",
  title: "Can Research",
  key: "can-research",
  conditionField: "temper-condition-field/can-research",
  displayOrder: 0,
} as const satisfies TemperConditionValue
