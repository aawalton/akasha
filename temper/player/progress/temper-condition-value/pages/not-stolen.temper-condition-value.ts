import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const notStolen = {
  id: "01a0e271-5ad0-758e-80f0-d032bc47fea5",
  type: "page-type/temper-condition-value",
  slug: "not-stolen",
  title: "Is Not Stolen",
  key: "not-stolen",
  conditionField: "temper-condition-field/stolen",
  displayOrder: 1,
} as const satisfies TemperConditionValue
