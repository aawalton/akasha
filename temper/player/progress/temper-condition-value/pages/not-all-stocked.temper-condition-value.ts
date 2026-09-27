import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const notAllStocked = {
  id: "01a0e271-5ad0-7cdf-bfc0-8c98d7b144eb",
  type: "page-type/temper-condition-value",
  slug: "not-all-stocked",
  title: "Not All Stocked",
  key: "not-all-stocked",
  conditionField: "temper-condition-field/all-stocked",
  displayOrder: 1,
} as const satisfies TemperConditionValue
