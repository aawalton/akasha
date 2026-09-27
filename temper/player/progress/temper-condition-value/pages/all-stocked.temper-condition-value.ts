import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const allStocked = {
  id: "01a0e271-5acf-7d1f-a247-a3127a4f1ca7",
  type: "page-type/temper-condition-value",
  slug: "all-stocked",
  title: "All Stocked",
  key: "all-stocked",
  conditionField: "temper-condition-field/all-stocked",
  displayOrder: 0,
} as const satisfies TemperConditionValue
