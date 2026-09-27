import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const cannotResearch = {
  id: "01a0e271-5ad0-73aa-abe1-edce91c45d03",
  type: "page-type/temper-condition-value",
  slug: "cannot-research",
  title: "Cannot Research",
  key: "cannot-research",
  conditionField: "temper-condition-field/can-research",
  displayOrder: 1,
} as const satisfies TemperConditionValue
