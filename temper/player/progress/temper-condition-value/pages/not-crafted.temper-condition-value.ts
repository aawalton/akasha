import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const notCrafted = {
  id: "01a0e271-5ad0-738f-b198-8b5e8e14d231",
  type: "page-type/temper-condition-value",
  slug: "not-crafted",
  title: "Is Not Crafted",
  key: "not-crafted",
  conditionField: "temper-condition-field/crafted",
  displayOrder: 1,
} as const satisfies TemperConditionValue
