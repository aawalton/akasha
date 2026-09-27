import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const crafted = {
  id: "01a0e271-5ad0-70e7-acf2-a13cb2da13c1",
  type: "page-type/temper-condition-value",
  slug: "crafted",
  title: "Is Crafted",
  key: "crafted",
  conditionField: "temper-condition-field/crafted",
  displayOrder: 0,
} as const satisfies TemperConditionValue
