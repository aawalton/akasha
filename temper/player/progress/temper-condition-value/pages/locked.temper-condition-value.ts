import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const locked = {
  id: "01a0e271-5ad0-70c6-96b3-54ff539a360d",
  type: "page-type/temper-condition-value",
  slug: "locked",
  title: "Is Locked",
  key: "locked",
  conditionField: "temper-condition-field/locked",
  displayOrder: 0,
} as const satisfies TemperConditionValue
