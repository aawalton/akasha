import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const stolen = {
  id: "01a0e271-5ad1-7277-9619-ffeed0b7eab6",
  type: "page-type/temper-condition-value",
  slug: "stolen",
  title: "Is Stolen",
  key: "stolen",
  conditionField: "temper-condition-field/stolen",
  displayOrder: 0,
} as const satisfies TemperConditionValue
